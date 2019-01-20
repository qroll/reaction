import React from "react";

import FormInput from "src/components/Form/FormInput";
import BookingContext from "./BookingContext";

class DateTime extends React.Component {
  static contextType = BookingContext;

  render() {
    let { form, handleOnFormChange } = this.context;
    let { field } = this.props;
    return (
      <FormInput
        field={field}
        value={form.values[field]}
        onChange={handleOnFormChange}
      />
    );
  }
}

export default DateTime;
