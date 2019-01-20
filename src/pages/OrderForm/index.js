import React, { Component } from "react";
import { setIn } from "immutable-setter";
import styled from "styled-components";

import { Page, Code } from "src/components/Container";
import FormButton from "src/components/Form/FormButton";
import FormInput from "src/components/Form/FormInput";
import Sides from "./Sides";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

class OrderForm extends Component {
  state = {
    form: {
      appetizer: "",
      sides: []
    }
  };

  handleOnFormChange = (field, value) => {
    let nextState = setIn(this.state, ["form", field], value);
    this.setState(nextState);
  };

  render() {
    let { form } = this.state;

    return (
      <Page style={{ maxWidth: 720, margin: "auto" }}>
        <Form>
          <FormInput
            field="appetizer"
            value={form.appetizer}
            onChange={this.handleOnFormChange}
          />
          <Sides
            field="sides"
            value={form.sides}
            onChange={this.handleOnFormChange}
          />
          <FormButton label="Order" />
        </Form>
        <Code>{JSON.stringify(this.state, null, 2)}</Code>
      </Page>
    );
  }
}

export default OrderForm;
