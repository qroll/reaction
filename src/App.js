import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import configureStore from "src/store";

import Layout from "src/components/Layout";
import Main from "src/pages/Main";
import OrderForm from "src/pages/OrderForm";

let store = configureStore();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Route path="/" exact component={Main} />
            <Route path="/form" component={OrderForm} />
          </Layout>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
