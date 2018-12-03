import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";
import Register from "./components/Users/Register";
import Login from "./components/Users/Login";
import ProfileRegistration from "./components/Profiles/ProfileRegistration";
import MemberDetails from "./components/MemberDetails";
import MarriageDetails from "./components/MarriageDetails";
import EditProfile from "./components/Profiles/EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import DashBoard from "./components/DashBoard";
import EditUserProfile from "./components/Users/EditUserProfile";
import Forgot from "./components/Forgot";
import Reset from "./components/resetPassword";
import FatherDetails from "./components/FatherDetails";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {/* <Navbar /> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={DashBoard} />
            <PrivateRoute
              exact
              path="/editUser/:id"
              component={EditUserProfile}
            />
            <PrivateRoute
              exact
              path="/profileRegistration"
              component={ProfileRegistration}
            />
            <PrivateRoute exact path="/member" component={MemberDetails} />
            <PrivateRoute exact path="/marriage" component={MarriageDetails} />
            <PrivateRoute
              exact
              path="/editProfile/:id"
              component={EditProfile}
            />
            <PrivateRoute
              exact
              path="/fatherDetails/:name/:phone"
              component={FatherDetails}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
