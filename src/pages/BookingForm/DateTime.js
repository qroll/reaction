import React from "react";

import FormSelect from "src/components/Form/FormSelect";
import BookingContext from "./BookingContext";

const TIME = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00"
];

const DATE = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

class DateTime extends React.Component {
  static contextType = BookingContext;

  render() {
    let { form, handleOnFormChange } = this.context;
    let { field } = this.props;
    return (
      <>
        <FormSelect
          field={[...field, "date"]}
          options={DATE}
          value={form.values[field].date}
          onChange={handleOnFormChange}
        />
        <FormSelect
          field={[...field, "time"]}
          options={TIME}
          value={form.values[field].time}
          onChange={handleOnFormChange}
        />
      </>
    );
  }
}

export default DateTime;
