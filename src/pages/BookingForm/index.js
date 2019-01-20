import React, { Component } from "react";
import { setIn } from "immutable-setter";
import styled from "styled-components";

import BookingContext, { initialState } from "./BookingContext";
import { postForm, FORM_STATUS } from "src/actions/form";
import { validate } from "./utils";

import { Page, Code } from "src/components/Container";
import FormButton from "src/components/Form/FormButton";
import Input from "./Input";
import DateTime from "./DateTime";
import Notification from "./Notification";

const Form = styled.div`
  display: flex;
  flex-direction: column;
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

  handleOnSubmit = () => {
    let { errors, isValid } = validate(this.state.form);

    if (isValid) {
      let nextState = this.state;
      nextState = setIn(nextState, ["form", "errors"], errors);
      nextState = setIn(nextState, ["form", "status"], FORM_STATUS.POSTING);
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
      let nextState = this.state;
      nextState = setIn(nextState, ["form", "errors"], errors);
      nextState = setIn(nextState, ["form", "status"], FORM_STATUS.ERROR);
      this.setState(nextState);
    }
  };

  render() {
    return (
      <Page style={{ maxWidth: 720, margin: "auto" }}>
        <BookingContext.Provider value={this.state}>
          <Form>
            <Notification id="book" />
            <Input field="reason" />
            <DateTime field={["startTime"]} />
            <DateTime field={["endTime"]} />
            <FormButton id="book" label="Book" onClick={this.handleOnSubmit} />
          </Form>
        </BookingContext.Provider>
        <Code>{JSON.stringify(this.state, null, 2)}</Code>
      </Page>
    );
  }
}

export default BookingForm;
