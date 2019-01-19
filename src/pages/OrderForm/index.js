import React, { Component } from "react";
import { setIn } from "immutable-setter";
import styled from "styled-components";

import { Page } from "src/components/Container";
import FormButton from "src/components/Form/FormButton";
import FormInput from "src/components/Form/FormInput";
import Sides from "./Sides";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 720px;
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
      <Page>
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
      </Page>
    );
  }
}

export default OrderForm;
