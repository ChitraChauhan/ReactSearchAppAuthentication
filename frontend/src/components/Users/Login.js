import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Checkbox
} from "react-bootstrap";
import { fakeAuth } from "../../App";
import { loginUser } from "../../actions/authentication";
import "../../style.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      errors: {},
      redirectToReferrer: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ email: "chitra123@gmail.com", password: "chitra123" });
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleRememberMe() {
    this.setState({
      rememberMe: !this.state.rememberMe
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    };
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
    this.props.loginUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   // this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="main-w3layouts wrapper">
        <div className="main-agileinfo">
          <h2 style={{ color: "#FFFFFF" }}>Login Form</h2>
          <div className="agileits-top">
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel
                  style={{
                    paddingRight: "330px",
                    color: "#FFFFFF",
                    paddingTop: "5px"
                  }}
                >
                  Email:{" "}
                </ControlLabel>
                <FormControl
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  value={this.state.email}
                  type="email"
                  placeholder="Please Enter Email Here..."
                  onChange={this.handleInputChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </FormGroup>
              <FormGroup>
                <ControlLabel
                  style={{
                    paddingRight: "330px",
                    color: "#FFFFFF",
                    paddingTop: "5px"
                  }}
                >
                  Password:{" "}
                </ControlLabel>
                <FormControl
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  name="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Please Enter Password Here..."
                  onChange={this.handleInputChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </FormGroup>

              <div className="wthree-text">
                <label className="anim">
                  <Checkbox
                    value={this.state.rememberMe}
                    onChange={() => this.toggleRememberMe()}
                    className="checkbox"
                  >
                    Remember me
                  </Checkbox>
                </label>
                <div className="clear"> </div>
              </div>
              <Button type="submit" className="submit">
                SIGN IN
              </Button>
              <p>
                Not register yet?
                <a href="/register"> Register Here... </a>
                <br />
                <a href="/reset">Change Password...</a>
                <br />
                <a href="/forgot">Forgot Password?</a>
              </p>
            </form>
          </div>
        </div>
        <ul className="colorlib-bubbles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
