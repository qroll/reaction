import React, { Component } from "react";
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

class Request extends Component {
  state = {};

  componentDidMount() {
    fetch("http://httpbin.org/delay/5").then(() =>
      this.setState({ completed: true })
    );
  }

  render() {
    const { completed } = this.state;
    return <Page>{completed && <div id="status">Done</div>}</Page>;
  }
}

export default Request;
