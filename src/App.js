import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import RegisterForm from "./register/RegisterForm";
import Login from "./Login";
import ReservationTool from "./tool/ReservationTool";
import "semantic-ui-css/semantic.min.css";
import Category from "./admin/Category";
import Resource from "./admin/Resource";
import AdminMenu from "./admin/AdminMenu";
export default () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/reservationTool" component={ReservationTool} />
      <Route path="/categoryAdmin" component={Category} />
      <Route path="/resourceAdmin" component={Resource} />
      <Route path="/adminmenu" component={AdminMenu} />
    </BrowserRouter>
  );
};
