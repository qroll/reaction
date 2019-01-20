import { setIn } from "immutable-setter";
import moment from "moment";

export const validate = form => {
  let errors = {};
  let isValid = true;
  const { reason, startTime, endTime } = form.values;
  if (!reason) {
    errors = setIn(errors, ["reason"], "Required");
    isValid = false;
  }
  if (!startTime.date) {
    errors = setIn(errors, ["startTime", "date"], "Required");
    isValid = false;
  }
  if (!startTime.time) {
    errors = setIn(errors, ["startTime", "time"], "Required");
    isValid = false;
  }
  if (!endTime.date) {
    errors = setIn(errors, ["endTime", "date"], "Required");
    isValid = false;
  }
  if (!endTime.time) {
    errors = setIn(errors, ["endTime", "time"], "Required");
    isValid = false;
  }
  if (startTime.date && startTime.time && endTime.date && endTime.time) {
    let startMoment = moment(
      `${startTime.date} ${startTime.time}`,
      "dddd HH:mm"
    );
    let endMoment = moment(`${endTime.date} ${endTime.time}`, "dddd HH:mm");
    if (!startMoment.isBefore(endMoment)) {
      errors = setIn(
        errors,
        ["$startEndTime"],
        "Start time must be before end time"
      );
      isValid = false;
    }
  }

  return { isValid, errors };
};
