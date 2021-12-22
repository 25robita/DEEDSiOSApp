import { getItemAsync } from "expo-secure-store";
import { fetchJSONResource } from "./get";

interface Event {
    title: string;
    data: any;
    isFirst: boolean;
}

function getCalendar(start?: Date, elapsed = 60 * 60 * 24 * 2, sectionize = true, startOffset = 0): Promise<any[] | any[][]> { // startoffset only for unset start
    return new Promise((resolve, reject) => {
        getItemAsync("userMeta").then((t: any) => {
            console.log(startOffset)
            var userId: string = JSON.parse(t).schoolboxUser.id;
            var startToday: any = new Date();
            startToday.setHours(0);
            startToday.setMinutes(0);
            startToday.setSeconds(0);
            startToday.setMilliseconds(0);
            var startTodayN = Math.floor((startToday - 0) / 1000);
            console.log("getting calendar")
            const url = `/calendar/ajax/full?start=${Math.floor(Number(start) / 1000) || (startTodayN + startOffset)}&end=${(Math.floor(Number(start) / 1000) || (startTodayN + startOffset)) + elapsed}&userId=${userId}`;
            console.log(url)
            fetchJSONResource(url, {}).then(
                (calendar: any) => {
                    console.log("obtained calendar")
                    if (sectionize) {
                        var days: number[] = [];
                        var dayMonths: number[] = [];
                        var daysEvents: Event[][] = [];

                        for (let i = 0; i < (elapsed / (60 * 60 * 24)); i++) {
                            console.log(i)
                            console.log(start)
                            var date = new Date(Number(start ?? startToday) + 60 * 60 * 24 * 1000 * i);
                            days.push(date.getDate())
                            dayMonths.push(date.getMonth())
                            daysEvents.push([])
                        }
                        // new Date(json[3].start).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })

                        let daysEventsObject: Record<string, Event[]> = {}

                        for (var eventData of calendar) {
                            // console.log(days);
                            // var date = new Date(eventData.start.split(" ")[0]).getDate();
                            // console.log(date);
                            // var dayIndex = days.indexOf(date)
                            // console.log("calendar.tsx:37 says:", dayIndex);
                            // daysEvents[dayIndex].push(eventData)
                            if (daysEventsObject[eventData.start.split(" ")[0]]) {
                                daysEventsObject[eventData.start.split(" ")[0]].push(eventData);
                            } else {
                                daysEventsObject[eventData.start.split(" ")[0]] = [eventData]
                            }
                        }
                        var sectionListData = Object.entries(daysEventsObject).map(([dateString, dayEvents], index) => (
                            dayEvents.length
                                ? {
                                    title: new Date(dateString).toLocaleDateString(undefined, {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    }),
                                    data: dayEvents,
                                    isFirst: index == 0,
                                }
                                : null
                        ))
                        // var sectionListData = daysEvents.map((dayEvents, index) =>
                        // dayEvents.length
                        //     ? {
                        //         title: (startToday.setDate(days[index]), startToday.setMonth(dayMonths[index]),
                        //             startToday).toLocaleDateString(undefined, {
                        //                 weekday: "long",
                        //                 day: "numeric",
                        //                 month: "long",
                        //             }),
                        //         data: dayEvents,
                        //         isFirst: index == 0,
                        //     }
                        //     : null
                        // )
                        return resolve(sectionListData.filter(i => i));
                    } else resolve(calendar)
                },
                reject
            );
        });
    });
}

export default getCalendar;
