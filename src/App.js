import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import configureStore from "src/store";

import Layout from "src/components/Layout";
import Main from "src/pages/Main";
import OrderForm from "src/pages/OrderForm";
import BookingForm from "src/pages/BookingForm";
import List from "src/pages/List";
import ConsentForm from "src/pages/ConsentForm";
import Typography from "src/pages/Typography";

let store = configureStore();

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Route path="/" exact component={Main} />
            <Route path="/order" component={OrderForm} />
            <Route path="/booking" component={BookingForm} />
            <Route path="/list" component={List} />
            <Route path="/consent" component={ConsentForm} />
            <Route path="/typo" component={Typography} />
          </Layout>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
