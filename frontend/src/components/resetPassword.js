import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { resetPassword } from "../actions/authentication";
import { fakeAuth } from "../App";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import "../style.css";

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      newPassword: "",
      errors: {},
      redirectToReferrer: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      newPassword: this.state.newPassword
    };
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
    this.props.resetPassword(user, this.props.history);
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
          <h2 style={{ color: "#FFFFFF" }}>Reset Password</h2>
          <div className="agileits-top">
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel
                  style={{
                    paddingRight: "330px",
                    paddingTop: "5px",
                    color: "#FFFFFF"
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
                    paddingTop: "5px",
                    color: "#FFFFFF"
                  }}
                >
                  Old Password:{" "}
                </ControlLabel>
                <FormControl
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
                  required={true}
                  name="password"
                  value={this.state.password}
                  type="password"
                  placeholder="Please Enter Password Here..."
                  onChange={this.handleInputChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </FormGroup>

              <FormGroup>
                <ControlLabel
                  style={{
                    paddingRight: "330px",
                    paddingTop: "5px",
                    color: "#FFFFFF"
                  }}
                >
                  New Password:{" "}
                </ControlLabel>
                <FormControl
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.newPassword
                  })}
                  required={true}
                  name="newPassword"
                  value={this.state.newPassword}
                  type="password"
                  placeholder="Please Enter Password Here..."
                  onChange={this.handleInputChange}
                />
                {errors.newPassword && (
                  <div className="invalid-feedback">{errors.newPassword}</div>
                )}
              </FormGroup>
              <Button type="submit" className="submit">
                RESET PASSWORD
              </Button>
              <p>
                <a href="/login"> Go Back To Login Page...</a>
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

Reset.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(Reset);
