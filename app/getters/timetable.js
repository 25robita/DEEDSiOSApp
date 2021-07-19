import { fetchHTMLResource } from './get'

function getTimetable() {
    return new Promise((resolve, reject) => {
        fetchHTMLResource("/timetable")
            .then(d => {
                // console.log(d)
                var getTimetableHeaderName = (th) => th.childNodes[0].textContent.trim()

                var data = {}
                var times = []
                var timeNames = []
                var timetable = d.querySelector(".timetable")

                timetable.querySelectorAll("tbody th").forEach((el, index) => {
                    var n = getTimetableHeaderName(el)
                    data[n] = Array(7)
                    if (!times.includes(n)) {
                        times.push(n)
                        timeNames.push([n, el.querySelector("time.meta").innerText.replace("&ndash;", "–")])
                    }
                })
                timetable.querySelectorAll(".timetable-subject")
                    // .filter(el => el.innerText.trim())
                    .forEach(el => {
                        var td = el.parentNode.parentNode
                        var tr = td.parentNode
                        var trChildren = tr.childNodes.filter(i =>
                            i.tagName == "TD" || i.tagName == "TH"
                        )
                        var periodName = trChildren[0].childNodes[0].textContent.trim()

                        var dayNumber = trChildren.indexOf(td) - 1
                        if (el.innerText.trim()) {
                            var classData = el.childNodes.filter(i => i.textContent.trim())
                            classData[1] = classData[1].childNodes.filter(i => i.textContent.trim())
                            classData = classData.flat()

                            data[
                                periodName
                            ][
                                dayNumber
                            ] = {
                                code: classData[1].textContent.trim().replace(/[\(\)]/g, ''),
                                color: el.attributes.style.split(": ")[1].slice(0, -1),
                                name: classData[0].textContent.trim(),
                                location: classData[2].textContent.trim(),
                                isLinked: classData[0].nodeType !== 3,
                                period: periodName,
                                time: timeNames.filter(i => i[0] == periodName)[0][1],
                                empty: false
                            }
                        }
                        else {
                            data[
                                periodName
                            ][
                                dayNumber
                            ] = {
                                code: 0, // used for checking if next period is same class
                                empty: true,
                                period: periodName,
                                time: timeNames.filter(i => i[0] == periodName)[0][1]
                            }
                        }
                    })
                data = Object.values(data)
                // console.log(data)
                data = data.map((_, colIndex) => data.map(row => row[colIndex]));

                resolve(data)
            }, reject)
    })
}

function getNowOnwards() {
    return new Promise((resolve, reject) => {
        function isCurrentTime(timeString, now) {
            var times = timeString.split("–")
            var isStart = true

            // is less than end
            var timeEnd = times[1]
            var endHours,
                endMinutes,
                endAPM
            [timeEnd, endHours, endMinutes, endAPM] = timeEnd.matchAll(/(\d+):(\d+)([ap])/g).next().value
            endHours = (endHours - - (((endAPM == "p" && endHours != 12) || (endAPM == "a" && endHours == 12)) ? 12 : 0)) % 24
            return isStart && (
                (now.getHours() < endHours) ||
                (
                    (now.getHours() == endHours) &&
                    (now.getMinutes() <= endMinutes)
                )
            )
        }

        getTimetable().then(timetable => {
            var now = new Date()
            var today = timetable[(now.getDay() + 6) % 7]
            console.log(now.toTimeString())
            var thisAndNextPeriods = today.filter(i => i && i.time && isCurrentTime(i.time, now))
            var condensed = [{ code: -1 }] // not undefined
            for (var period of thisAndNextPeriods) {
                var lastPeriod = condensed[condensed.length - 1]
                if (period.code == lastPeriod.code) {
                    lastPeriod.period = (lastPeriod.period.startsWith("Lunch"))
                        ? "Lunch"
                        : (
                            (lastPeriod.period.split(" ")[0] == period.period.split(" ")[0])
                                ? lastPeriod.period + " & " + period.period.split(" ")[1]
                                : lastPeriod.period + " & " + period.period
                        )
                    lastPeriod.time = `${lastPeriod.time.split("–")[0]}–${period.time.split("–")[1]}`
                    continue
                }
                condensed.push(period)
            }
            condensed = condensed.map(period => {
                if (!period.period) {
                    return period
                }
                var l = period.period.split(" & ")
                if (l.length > 2) {
                    period.period = `${l[0]} – ${l[l.length - 1]}`
                }
                return period
            })

            resolve(condensed.slice(1, condensed.length == 3 ? -1 : undefined))
        }, reject)
    })

}

export { getNowOnwards }