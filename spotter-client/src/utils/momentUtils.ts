import * as Moment from "moment";
import { extendMoment, MomentRange } from "moment-range";

let moment: MomentRange = extendMoment(Moment);

// Used for generating days of week in dashboard

interface Params {
  (num: number): Moment.Moment[];
}

// due to the way in which the moment object is exported, I need to override the moment object with moment["default"] to satisfy type errors and import a function
// to see more on this issue, see this open issue: https://github.com/palantir/blueprint/issues/959

export const generateWeek: Params = num => {
  if ("default" in moment) {
    var momentFunc: any = moment["default"];
  }

  const start = momentFunc()
    .add(num, "weeks")
    .startOf("week");
  const end = momentFunc()
    .add(num, "weeks")
    .endOf("week");
  const range = moment.range(start, end);

  const days = [];

  for (let day of range.by("day")) {
    days.push(day);
  }

  return days;
};

// Used to set header of dashboard

export const dashHead = (num: number): string => {
  if ("default" in moment) {
    var momentFunc: any = moment["default"];
  }

  return momentFunc()
    .add(num, "weeks")
    .startOf("week")
    .format("MMMM YYYY");
};

// Used for generating days of month in dashboard

export const generateMonth = (num: number): Moment.Moment[] => {
  if ("default" in moment) {
    var momentFunc: any = moment["default"];
  }

  const start = momentFunc()
    .add(num, "months")
    .startOf("month")
    .startOf("week");
  const end = momentFunc()
    .add(num, "months")
    .endOf("month");

  let leftover = 34 - Number(end.diff(start, "days"));

  end.add(leftover, "days");

  const range = moment.range(start, end);

  const days = [];

  for (let day of range.by("day")) {
    days.push(day);
  }

  return days;
};

// Used to set header of monthly dashboard view

export const monthDashHead = (num: number): string => {
  if ("default" in moment) {
    var momentFunc: any = moment["default"];
  }

  return momentFunc()
    .add(num, "months")
    .startOf("month")
    .format("MMMM YYYY");
};
