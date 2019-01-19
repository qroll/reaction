import React from "react";

const defaultValue = {
  values: {
    reason: "",
    startTime: {
      date: "",
      time: ""
    },
    endTime: {
      date: "",
      time: ""
    }
  }
};

// const shape = {
//   reason: { value: "", error: false,  },
//   startTime: { value: "", error: false },
//   endTime: { value: "", error: false },
//   $topLevelError: false
// };

export const initialState = defaultValue;

const BookingContext = React.createContext(defaultValue);

export default BookingContext;
