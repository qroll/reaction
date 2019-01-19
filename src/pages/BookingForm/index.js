import React, { Component } from "react";
import { setIn } from "immutable-setter";
import styled from "styled-components";

import BookingContext, { initialState } from "./BookingContext";

import { Page, Code } from "src/components/Container";
import FormButton from "src/components/Form/FormButton";
import FormInput from "src/components/Form/FormInput";
import DateTime from "./DateTime";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 720px;
`;

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

  validate = form => {
    const errors = {};
    let isValid = true;
    const { reason, startTime, endTime } = form;
    if (!reason) {
      errors.reason = "Required";
      isValid = false;
    }

    return { isValid, errors };
  };

  render() {
    let { form } = this.state;
    let { values } = form;
    return (
      <Page>
        <BookingContext.Provider value={this.state}>
          <Form>
            <FormInput
              field="reason"
              value={values.reason}
              onChange={this.handleOnFormChange}
            />
            <DateTime field={["startTime"]} />
            <DateTime field={["endTime"]} />
            <FormButton label="Book" />
          </Form>
        </BookingContext.Provider>
        <Code>{JSON.stringify(this.state, null, 2)}</Code>
      </Page>
    );
  }
}

export default BookingForm;
