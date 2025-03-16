import dayjs from "dayjs";
import { THistoryObject } from "../interface/interface.type";

export const historyDateFormatting = (type: string, dateString: string) => {
  const historyObject: THistoryObject = {};

  // Formatting date based on condition. like week, month, year, date range. Here used day js for handling the dates.
  if (type === "week") {
    // is weeks this coding will apply
    const array = dateString.split("-");
    const [year, week] = array;

    const startDate = dayjs()
      .week(Number(week.substring(0, week.length - 2)))
      .year(Number(year))
      .startOf("week")
      .format("YYYY-MM-DD");

    const endDate = dayjs()
      .week(Number(week.substring(0, week.length - 2)))
      .year(Number(year))
      .endOf("week")
      .format("YYYY-MM-DD");

    historyObject.type = type;
    historyObject.startDate = startDate;
    historyObject.endDate = endDate;
  } else if (type === "month") {
    // is month this coding will apply

    const startDate = dayjs(dateString).startOf("month").format("YYYY-MM-DD");
    const endDate = dayjs(dateString).endOf("month").format("YYYY-MM-DD");
    historyObject.type = type;
    historyObject.startDate = startDate;
    historyObject.endDate = endDate;
  } else if (type === "year") {
    // is year this coding will apply
    const startDate = dayjs(dateString).startOf("year").format("YYYY-MM-DD");
    const endDate = dayjs(dateString).endOf("year").format("YYYY-MM-DD");
    historyObject.type = type;
    historyObject.startDate = startDate;
    historyObject.endDate = endDate;
  } else if (type === "range") {
    // is range this coding will apply
    const startDate = dayjs(dateString[0]).format("YYYY-MM-DD");
    const endDate = dayjs(dateString[1]).format("YYYY-MM-DD");
    historyObject.type = type;
    historyObject.startDate = startDate;
    historyObject.endDate = endDate;
  } else {
    // this is for single date . or individual dates
    const selectedDate = dayjs(dateString).format("YYYY-MM-DD");
    historyObject.type = type;
    historyObject.selectedDate = selectedDate;
  }

  return historyObject;
};
