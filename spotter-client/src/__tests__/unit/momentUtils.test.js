import Moment from "moment";
import { extendMoment } from "moment-range";
import { generateWeek, dashHead } from "../../utils/momentUtils";

const moment = extendMoment(Moment);

describe("moment utils", () => {
  test("generate week", () => {
    expect(generateWeek(0)[0].format("MMM DD")).toEqual(
      moment()
        .startOf("week")
        .format("MMM DD")
    );
    expect(generateWeek(0)[6].format("MMM DD")).toEqual(
      moment()
        .endOf("week")
        .format("MMM DD")
    );
    expect(generateWeek(-1)[0].format("MMM DD")).toEqual(
      moment()
        .add(-1, "weeks")
        .startOf("week")
        .format("MMM DD")
    );
    expect(generateWeek(-1)[6].format("MMM DD")).toEqual(
      moment()
        .add(-1, "weeks")
        .endOf("week")
        .format("MMM DD")
    );
    expect(generateWeek(1)[0].format("MMM DD")).toEqual(
      moment()
        .add(1, "weeks")
        .startOf("week")
        .format("MMM DD")
    );
    expect(generateWeek(1)[6].format("MMM DD")).toEqual(
      moment()
        .add(1, "weeks")
        .endOf("week")
        .format("MMM DD")
    );
  });

  test("dashHead", () => {
    expect(dashHead(0)).toMatch(moment().startOf('day').format("MMMM"))
    expect(dashHead(-4)).toMatch(moment().add(-4, 'weeks').format("MMMM"))
    expect(dashHead(4)).toMatch(moment().add(4, 'weeks').format("MMMM"))
  })
});
