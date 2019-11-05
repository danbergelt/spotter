import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export const generateWeek = num => {

  const start = moment().add(num, 'weeks').startOf("week");
  const end = moment().add(num, 'weeks').endOf("week");
  const range = moment.range(start, end);

  const days = [];

  for (let day of range.by("day")) {
    days.push(day);
  }

  return days;
};

export const dashHead = num => {
  return moment().add(num, 'weeks')
    .startOf("week")
    .format("MMMM YYYY");
};
