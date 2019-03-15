import React from "react";

import { FORM_STATUS } from "src/actions/form";

const defaultValue = {
  values: {
    reason: "",
    cupcake: "Whatever",
    startTime: {
      date: "",
      time: ""
    },
    endTime: {
      date: "",
      time: ""
    }
  },
  status: FORM_STATUS.UNPOSTED,
  errors: {}
};

export const initialState = defaultValue;

const BookingContext = React.createContext(defaultValue);

export default BookingContext;
