import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Login } from "./pages/Login/Login";
import Home from "./pages/CustomerDashboard/Home";
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import ProductView from "./pages/ProductView/ProductView";
import Cart from "./pages/Cart/Cart";
import Invoice from "./pages/Invoice/Invoice";
import checkout from "./pages/CheckOut/CheckOut";
import adminLogin from "./pages/Admin/Login/adminLogin";
import Layout from "./pages/Admin/Shared/Layout/Layout";
import UserProfile from "./pages/Admin/UserProfile/UserProfile";
import Orders from "./pages/Admin/Orders/Orders";
import CourierService from "./pages/Admin/CourierService/CourierService";
import ViewCourierService from "./pages/Admin/CourierService/viewcourierservice";
import Transaction from "./pages/Admin/Transaction/Transaction";
import Category from "./pages/Admin/Category/Category";
import reportWebVitals from "./reportWebVitals";
import endPoints from './pages/endPoints'
import 'bootstrap/dist/js/bootstrap'

import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "antd/dist/antd.css"
// import ProductView from "./pages/ProductView/ProductView";
import SecureRoute from "./SecureRoute";
import {Dashboard as Customer} from './pages/CustomerDashboard/Dashboard'
axios.defaults.withCredentials = true
function render(){
  const homeRoutes = [
    {
      path : 'Home/something',
      component : Customer
    }
  ]
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Switch>
          <SecureRoute index={true} exact path="/" component={Login} />
          <Route exact  path={endPoints.forgetPassword} render={(props)=><Login {...props} forgetPassword={true} />} />
          <SecureRoute exact path={endPoints.productsView} component={ProductView} /> 
          <SecureRoute  exact path="/Cart" component={Cart} /> 
          <SecureRoute  exact path="/Invoice" component={Invoice}/> 
          <SecureRoute  exact path="/Checkout" component={checkout}/> 
          <Route  path={endPoints.dashboard} component={Home} />
          <SecureRoute exact path={endPoints.adminLogin} component={adminLogin} /> 
          {/* <Route exact path="/AdminDashboard" component={Layout} /> */}
        </Switch>
      </Router>
      {/* admin */}
      <Router>
      <Layout/>
        <Switch>
          <SecureRoute exact path={endPoints.admin.dashboard} component={Dashboard} />
          <SecureRoute exact path={endPoints.admin.userProfile} component={UserProfile} />
          <SecureRoute exact path={endPoints.admin.orders} component={Orders} />
          <SecureRoute exact path={endPoints.admin.courierService} component={CourierService} />
          <SecureRoute exact path="/Admin/viewcourierservice" component={ViewCourierService} />
          <SecureRoute exact path={endPoints.admin.transaction} component={Transaction} />
          <SecureRoute exact path={endPoints.admin.category} component={Category} />
        </Switch>
      </Router>
      </React.StrictMode>,
    document.getElementById("root")
  );
}
render()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
