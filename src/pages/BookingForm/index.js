import React, { Component } from "react";
import { setIn } from "immutable-setter";
import styled from "styled-components";
import moment from "moment";

import BookingContext, { initialState } from "./BookingContext";
import { postForm, FORM_STATUS } from "src/actions/form";

import { Page, Code } from "src/components/Container";
import FormButton from "src/components/Form/FormButton";
import Input from "./Input";
import DateTime from "./DateTime";
import Notification from "./Notification";

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const validate = form => {
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

class BookingForm extends Component {
  handleOnFormChange = (field, value) => {
    field = Array.isArray(field) ? field : [field];
    let nextState = setIn(this.state, ["form", "values", ...field], value);
    this.setState(nextState);
  };

  state = {
    form: initialState,
    handleOnFormChange: this.handleOnFormChange
  };

  handleOnSubmit = () => {
    let { errors, isValid } = validate(this.state.form);

    if (isValid) {
      let nextState = setIn(this.state, ["form", "errors"], errors);
      nextState = setIn(this.state, ["form", "status"], FORM_STATUS.POSTING);
      this.setState(nextState);

      postForm()
        .then(() => {
          let nextState = setIn(
            this.state,
            ["form", "status"],
            FORM_STATUS.POSTED
          );
          this.setState(nextState);
        })
        .catch(() => {
          let nextState = setIn(
            this.state,
            ["form", "status"],
            FORM_STATUS.ERROR
          );
          this.setState(nextState);
        });
    } else {
      let nextState = setIn(this.state, ["form", "errors"], errors);
      nextState = setIn(this.state, ["form", "status"], FORM_STATUS.ERROR);
      this.setState(nextState);
    }
  };

  render() {
    return (
      <Page style={{ maxWidth: 720, margin: "auto" }}>
        <BookingContext.Provider value={this.state}>
          <Form>
            <Notification />
            <Input field="reason" />
            <DateTime field={["startTime"]} />
            <DateTime field={["endTime"]} />
            <FormButton label="Book" onClick={this.handleOnSubmit} />
          </Form>
        </BookingContext.Provider>
        <Code>{JSON.stringify(this.state, null, 2)}</Code>
      </Page>
    );
  }
}

export default BookingForm;
