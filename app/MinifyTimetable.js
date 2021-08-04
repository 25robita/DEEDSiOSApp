[
    "0,,1,,,",
    "8-0841-4,ffe0cc,0,1,A34 Mr Andrew Kingham,Form"
]

stringifyArray = (arr) =>
    arr.map(s => String(s || "").replace(",", "")).join(",")

function getClasses(timetable) { // timetable should not be small (ie. period 2&3...)
    classesArray = []
    classesMap = {}
    for (classObject of timetable.flat()) {
        classesArray.push(stringifyArray([
            classObject.code,
            classObject.color.replace("#", ""),
            Number(classObject.empty),
            Number(classObject.isLinked),
            classObject.location,
            classObject.name
        ]))
        classesMap[classObject.code + classObject.location] = classesArray.length - 1
    }
    return [classesArray, classesMap]
}

function minifyTimetable(timetable) {
    [classes, classesMap] = getClasses(timetable);
    return timetable.map(day =>
        day.map(({ code, location }) =>
            classesMap[code + location]
        )
    )
}