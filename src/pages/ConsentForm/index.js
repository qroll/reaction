import React, { Component } from "react";
import { setIn } from "immutable-setter";
import styled from "styled-components";
import moment from "moment";

import { postForm, FORM_STATUS } from "src/actions/form";

import { Page, Code } from "src/components/Container";
import FormButton from "src/components/Form/FormButton";
import FormInput from "src/components/Form/FormInput";
import FormDateInput from "src/components/Form/FormDateInput";
import Notification from "src/components/Notification";

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

class ConsentForm extends Component {
  state = {
    values: {
      title: "",
      content: "",
      venue: "",
      link: "",
      consentByDate: null,
      reminderDate: null
    },
    status: FORM_STATUS.UNPOSTED,
    errors: {}
  };

  handleOnFormChange = (field, value) => {
    let nextState = setIn(this.state, ["values", field], value);

    if (field === "title" || field === "content") {
      if (!value) {
        nextState = setIn(nextState, ["errors", field], "Required");
      } else {
        nextState = setIn(nextState, ["errors", field], undefined);
      }
    }

    if (field === "consentByDate") {
      if (!value) {
        nextState = setIn(nextState, ["errors", field], "Required");
      } else if (value.isBefore(moment(), "day")) {
        nextState = setIn(
          nextState,
          ["errors", field],
          "Must be today or later"
        );
      } else {
        nextState = setIn(nextState, ["errors", field], undefined);
      }
    }

    this.setState(nextState);
  };

  handleOnSubmit = () => {
    // let { errors, isValid } = validate(this.state.form);
    // if (isValid) {
    //   let nextState = this.state;
    //   nextState = setIn(nextState, ["form", "errors"], errors);
    //   nextState = setIn(nextState, ["form", "status"], FORM_STATUS.POSTING);
    //   this.setState(nextState);
    //   postForm()
    //     .then(() => {
    //       let nextState = setIn(
    //         this.state,
    //         ["form", "status"],
    //         FORM_STATUS.POSTED
    //       );
    //       this.setState(nextState);
    //     })
    //     .catch(() => {
    //       let nextState = setIn(
    //         this.state,
    //         ["form", "status"],
    //         FORM_STATUS.ERROR
    //       );
    //       this.setState(nextState);
    //     });
    // } else {
    //   let nextState = this.state;
    //   nextState = setIn(nextState, ["form", "errors"], errors);
    //   nextState = setIn(nextState, ["form", "status"], FORM_STATUS.ERROR);
    //   this.setState(nextState);
    // }
  };

  render() {
    const {
      title,
      content,
      venue,
      link,
      consentByDate,
      reminderDate
    } = this.state.values;

    const {
      title: titleError,
      content: contentError,
      link: linkError,
      consentByDate: consentByDateError,
      reminderDate: reminderDateError
    } = this.state.errors;

    return (
      <Page style={{ maxWidth: 720, margin: "auto" }}>
        <Form>
          <Notification />
          <FormInput
            onChange={this.handleOnFormChange}
            field="title"
            value={title}
            errorMessage={titleError}
          />
          <FormInput
            onChange={this.handleOnFormChange}
            field="content"
            value={content}
            errorMessage={contentError}
          />
          <FormInput
            onChange={this.handleOnFormChange}
            field="venue"
            value={venue}
          />
          <FormInput
            onChange={this.handleOnFormChange}
            field="link"
            value={link}
            errorMessage={linkError}
          />
          <FormDateInput
            onChange={this.handleOnFormChange}
            field="consentByDate"
            value={consentByDate}
            errorMessage={consentByDateError}
          />
          <FormDateInput
            onChange={this.handleOnFormChange}
            field="reminderDate"
            value={reminderDate}
            errorMessage={reminderDateError}
          />
          <FormButton label="Post" onClick={this.handleOnSubmit} />
        </Form>
        <Code>{JSON.stringify(this.state, null, 2)}</Code>
      </Page>
    );
  }
}

export default ConsentForm;
