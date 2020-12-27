import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import RegisterForm from "./register/RegisterForm";
import Login from "./Login";
import "semantic-ui-css/semantic.min.css";
export default () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={RegisterForm} />
    </BrowserRouter>
  );
};
