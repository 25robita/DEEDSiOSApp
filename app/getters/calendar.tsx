import { getItemAsync } from "expo-secure-store";
import { fetchJSONResource } from "./get";

interface Event {
  title: string;
  data: any;
  isFirst: boolean;
}

function getCalendar() {
  return new Promise((resolve, reject) => {
    getItemAsync("userMeta").then((t: any) => {
      var userId: string = JSON.parse(t).schoolboxUser.id;
      var startToday: any = new Date();
      startToday.setHours(0);
      startToday.setMinutes(0);
      startToday.setSeconds(0);
      startToday.setMilliseconds(0);
      var startTodayN = Math.floor((startToday - 0) / 1000);
      const url = `/calendar/ajax/full?start=${startTodayN}&end=${
        startTodayN + 60 * 60 * 24 * 2
      }&userId=${userId}`;
      fetchJSONResource(url, {}).then(
        (calendar: any) => {
          var days = [startToday.getDate(), startToday.getDate() + 1];
          var day1Events: Event[] = [];
          var day2Events: Event[] = [];
          // new Date(json[3].start).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })
          for (var eventData of calendar) {
            (new Date(eventData.start.split(" ")[0]).getDate() == days[0]
              ? day1Events
              : day2Events
            ).push(eventData);
          }
          var sectionListData = [
            day1Events.length
              ? {
                  title: startToday.toLocaleDateString(undefined, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }),
                  data: day1Events,
                  isFirst: true,
                }
              : null,
            day2Events.length
              ? {
                  title: (startToday.setDate(days[1]),
                  startToday).toLocaleDateString(undefined, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }),
                  data: day2Events,
                  isFirst: false,
                }
              : null,
          ];
          resolve(sectionListData);
        },
        (_) => {
          reject();
        }
      );
    });
  });
}

export default getCalendar;
