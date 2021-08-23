import { fetchHTMLResource } from "./get";

interface Period {
  code: any; // will allow string and number
  color?: string;
  location?: string;
  name?: string;
  period?: string;
  time?: string;
  empty?: boolean;
  isLinked?: boolean;
  now?: boolean;
}

function getTimetable(): Promise<Period[][]> {
  return new Promise((resolve, reject) => {
    fetchHTMLResource("/timetable").then((d: any) => {
      var getTimetableHeaderName = (th: any) =>
        th.childNodes[0].textContent.trim();

      var data: any = {};
      var times: string[] = [];
      var timeNames: string[][] = [];
      var timetable: any = d.querySelector(".timetable");

      timetable
        .querySelectorAll("tbody th")
        .forEach((el: any, index: number) => {
          var name = getTimetableHeaderName(el);
          data[name] = Array(7);
          if (!times.includes(name)) {
            times.push(name);
            timeNames.push([name, el.querySelector("time.meta").text.trim()]);
          }
        });
      timetable.querySelectorAll(".timetable-subject").forEach((el: any) => {
        var td = el.parentNode.parentNode;
        var tr = td.parentNode;
        var trChildren = tr.childNodes.filter(
          (el: any) => el.tagName == "TD" || el.tagName == "TH"
        );
        var periodName = trChildren[0].childNodes[0].textContent.trim();

        var dayNumber = trChildren.indexOf(td) - 1;
        if (el.text.trim()) {
          var classData = el.childNodes.filter((i: any) =>
            i.textContent.trim()
          );
          classData[1] = classData[1].childNodes.filter((i: any) =>
            i.textContent.trim()
          );
          classData = classData.flat();

          data[periodName][dayNumber] = {
            code: classData[1].textContent.trim().replace(/[\(\)]/g, ""),
            color: el.attributes.style.split(": ")[1].slice(0, -1),
            name: classData[0].textContent.trim(),
            location: classData[2].textContent.trim(),
            isLinked: classData[0].nodeType !== 3,
            period: periodName,
            time: timeNames.filter((i) => i[0] == periodName)[0][1],
            empty: false,
          };
        } else {
          data[periodName][dayNumber] = {
            code: "", // used for checking if next period is same class
            empty: true,
            period: periodName,
            time: timeNames.filter((i) => i[0] == periodName)[0][1],
          };
        }
      });
      data = Object.values(data);
      data = data
        .map((_: any, colIndex: number) =>
          data.map((row: any) => row[colIndex])
        )
        .filter((day: any[]) => day.reduce((a, b) => a || b, false));

      resolve(data);
    }, reject);
  });
}

function condenseTimetable(timetable: Period[]): Period[] {
  let condensed = [{ code: -1 }]; // not undefined
  for (let period of timetable) {
    if (!period) {
      condensed.push(period);
      continue;
    }
    let lastPeriod: Period = condensed[condensed.length - 1];
    if (period.code == lastPeriod.code) {
      console.log("timetable.tsx:94 says:", period, lastPeriod);
      lastPeriod.period = lastPeriod?.period?.startsWith?.("Lunch")
        ? "Lunch"
        : lastPeriod?.period?.split?.(" ")?.[0] ==
          period?.period?.split?.(" ")?.[0]
        ? lastPeriod.period + " & " + period?.period?.split?.(" ")?.[1]
        : lastPeriod.period + " & " + period.period;
      lastPeriod.time = `${lastPeriod.time?.split?.("–")?.[0]}–${
        period.time?.split("–")?.[1]
      }`;
      continue;
    }
    condensed.push(period);
  }
  console.log("timetable.tsx:107 says:", condensed);
  condensed = condensed.map((period: any) => {
    if (!period.period) {
      return period;
    }
    let l = period.period.split(" & ");
    if (l.length > 2) {
      period.period = `${l[0]} – ${l[l.length - 1]}`;
    }
    return period;
  });
  console.log("timetable.tsx:117 says:", condensed);
  return condensed.slice(1, condensed.length == 3 ? -1 : undefined);
}

function isCurrentTimeOrLater(timeString: string, now: any) {
  var times = timeString.split("–");
  var isStart = true;

  // is less than end
  var timeEnd: any = times[1];
  var endHours: number, endMinutes: number, endAPM: string;
  [timeEnd, endHours, endMinutes, endAPM] = timeEnd
    .matchAll(/(\d+):(\d+)([ap])/g)
    .next().value;
  endHours =
    (endHours -
      -((endAPM == "p" && endHours != 12) || (endAPM == "a" && endHours == 12)
        ? 12
        : 0)) %
    24;
  return (
    isStart &&
    (now.getHours() < endHours ||
      (now.getHours() == endHours && now.getMinutes() <= endMinutes))
  );
}

function getDay(day: number, now: any): Promise<Period[]> {
  return new Promise((resolve, reject) => {
    getTimetable().then((timetable: any[]) => {
      let today: Period[] = timetable[day];
      today = condenseTimetable(today);
      if (!today) {
        resolve(today);
        return;
      }
      if (now) {
        let hasHighlighted = false;
        today.map((i: any) => {
          if (hasHighlighted) {
            return i;
          }
          i.now = isCurrentTimeOrLater(i.time, now);
          if (i.now) {
            hasHighlighted = true;
          }
          return i;
        });
      }
      resolve(today);
    }, reject);
  });
}

function getDayAndFull(day: number, now: any): Promise<any[]> {
  //TODO: fix resolve to be better
  return new Promise((resolve, reject) => {
    getTimetable().then((longTimetable: Period[][]) => {
      let timetable: Period[][] = longTimetable.map((item) =>
        condenseTimetable(item)
      );
      let today = timetable[day];
      if (now) {
        let hasHighlighted = false;
        today.map((i) => {
          if (hasHighlighted) {
            return i;
          }
          i.now = isCurrentTimeOrLater(i.time || "", now);
          if (i.now) {
            hasHighlighted = true;
          }
          return i;
        });
      }
      timetable[day] = today;
      resolve([undefined, timetable, longTimetable]);
    }, reject);
  });
}

function getNowOnwards(): Promise<Period[]> {
  return new Promise((resolve, reject) => {
    let now = new Date();
    getDay((now.getDay() + 6) % 7, false).then((today) => {
      let thisAndNextPeriods = today.filter(
        (i) => i && i.time && isCurrentTimeOrLater(i.time, now)
      );
      resolve(thisAndNextPeriods);
    }, reject);
  });
}

export { getNowOnwards, getDay, getDayAndFull };
