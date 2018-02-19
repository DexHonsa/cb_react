import React from "react";
import ReactDOM from "react-dom";
//import { Router, Route } from 'react-router';
//import { browserHistory, IndexRoute } from 'react-router';
import { Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./rootreducer";
import PropTypes from "prop-types";
import setAuthoizationToken from "./utils/set_authorization_token";
import jwtDecode from "jwt-decode";
import { setCurrentUser } from "./actions/auth_actions";
import App from "./App.js";
import Home from "./components/home.js";
import Login from "./components/login/login.js";
import Dashboard from "./components/dashboard/dashboard.js";
import MyPortfolios from "./components/my_portfolios/my_portfolios.js";
import Property from "./components/property/property.js";
import NewProperty from "./components/property/new_property";
import Applications from "./components/applications/applications.js";
import ModelHomes from "./components/model_homes/model_homes";
import Templates from "./components/templates/templates";
import FAQ from "./components/dashboard/faq.js";
import Portfolio from "./components/my_portfolios/portfolio.js";
import history from "./actions/history";

import "./css/bootstrap.min.css";
import "./css/product.css";
import "./css/animate.css";
import "./css/css.css";
import "./css/font-awesome.min.css";

const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthoizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/product" component={App} />
        <Route exact path="/product/dashboard/" component={Dashboard} />
        <Route exact path="/product/dashboard/faq" component={FAQ} />
        <Route exact path="/product/my-portfolios" component={MyPortfolios} />
        <Route exact path="/product/templates" component={Templates} />
        <Route
          exact
          path="/product/my-portfolios/:portfolioId"
          component={Portfolio}
        />
        <Route exact path="/product/applications" component={Applications} />
        <Route exact path="/product/model_homes" component={ModelHomes} />
        <Route
          exact
          path="/product/my-portfolios/:portfolioId/:id"
          component={NewProperty}
        />
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

ReactDOM.render(
  <Root store={store} />,

  document.querySelector("#root")
);
