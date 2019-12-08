import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

// Used for generating days of week in dashboard

export const generateWeek = num => {
  const start = moment()
    .add(num, "weeks")
    .startOf("week");
  const end = moment()
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

export const dashHead = num => {
  return moment()
    .add(num, "weeks")
    .startOf("week")
    .format("MMMM YYYY");
};

// Used for generating days of month in dashboard

export const generateMonth = num => {
  const start = moment()
    .add(num, "months")
    .startOf("month");
  const end = moment()
    .add(num, "months")
    .endOf("month");
  const range = moment.range(start, end);

  const days = [];

  for (let day of range.by("day")) {
    days.push(day);
  }

  return days;
};

// Used to set header of monthly dashboard view

export const monthDashHead = num => {
  return moment()
    .add(num, "months")
    .startOf("month")
    .format("MMMM YYYY");
};
