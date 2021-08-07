export function stringifyArray(arr) {
    return arr.map(s => String(s || "").replace(",", "")).join(",");
}

function getClasses(timetable) { // timetable should not be small (ie. period 2&3...)
    let classesArray = []
    let classesMap = {}
    for (let classObject of timetable.flat()) {
        if (!classesMap[classObject.code + classObject.location]) {
            classesArray.push(stringifyArray([
                classObject.code,
                (classObject.color || "").replace("#", ""),
                Number(classObject.empty),
                Number(classObject.isLinked),
                classObject.location,
                classObject.name
            ]))
            classesMap[classObject.code + classObject.location] = classesArray.length - 1
        }
    }
    return [classesArray, classesMap]
}

function getTimes(timetable) {
    return timetable[0].map(cls => {
        return {
            time: cls.time,
            period: cls.period
        }
    })
}

export function minifyTimetable(timetable) {
    let classes, classesMap, times
    [classes, classesMap] = getClasses(timetable);
    times = getTimes(timetable);
    return [
        classes,
        timetable.map(day =>
            day.map(({ code, location }) =>
                classesMap[code + location]
            )
        ),
        times
    ]
}

export function decodeTimetable(classes, timetable, times) {
    classes = classes.map(cls => {
        let details = cls.split(",")
        return {
            code: details[0] || 0,
            color: details[1] ? "#" + details[1] : undefined,
            empty: Boolean(details[2]),
            isLinked: Boolean(details[3]),
            location: details[4] || undefined,
            name: details[5] || undefined,
        }
    })
    return timetable.map((day, dayIndex) =>
        day.map((cls, classIndex) => (
            cls = classes[cls],
            cls.time = times[classIndex].time,
            cls.period = times[classIndex].period,
            cls
        ))
    )
}