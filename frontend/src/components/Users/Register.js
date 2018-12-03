import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import classnames from "classnames";
import { registerUser } from "../../actions/authentication";
import { fakeAuth } from "../../App";
import "../../style.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      password_confirm: "",
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

  resetState() {
    this.setState({
      name: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      password_confirm: ""
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      fullName: this.state.fullName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
    this.props.registerUser(user, this.props.history);
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
      <div id="content" className="main-w3layouts wrapper">
        <div className="main-agileinfo">
          <h2 style={{ color: "#FFFFFF" }}>Registration Form</h2>
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
                  Username:{" "}
                </ControlLabel>
                <FormControl
                  required={true}
                  name="name"
                  value={this.state.name}
                  type="text"
                  placeholder="Please Enter Username Here..."
                  onChange={this.handleInputChange}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </FormGroup>

              <FormGroup>
                <ControlLabel
                  style={{
                    paddingRight: "1000px",
                    paddingTop: "5px",
                    color: "#FFFFFF"
                  }}
                >
                  Name:{" "}
                </ControlLabel>
                <div
                  className={
                    errors.fullName && errors.fullName.length > 0 ? "error" : ""
                  }
                >
                  <FormControl
                    required={true}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullName
                    })}
                    name="fullName"
                    value={this.state.fullName}
                    type="text"
                    placeholder="Please Enter LastName and FirstName Here..."
                    onChange={this.handleInputChange}
                  />
                </div>
                {errors.fullName && errors.fullName.length > 0 ? (
                  <span style={{ color: "red", paddingRight: "220px" }}>
                    {errors.fullName}
                  </span>
                ) : (
                  ""
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
                  Email:{" "}
                </ControlLabel>
                <FormControl
                  name="email"
                  value={this.state.email}
                  type="email"
                  placeholder="Please Enter Email Here..."
                  onChange={this.handleInputChange}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email
                  })}
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
                  Mobile no:{" "}
                </ControlLabel>
                <FormControl
                  name="phone"
                  value={this.state.phone}
                  type="phone"
                  placeholder="Please Enter Mobile No Here..."
                  onChange={this.handleInputChange}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.phone
                  })}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
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
                  Password:{" "}
                </ControlLabel>
                <FormControl
                  required={true}
                  name="password"
                  value={this.state.password}
                  type="password"
                  placeholder="Please Enter Password Here..."
                  onChange={this.handleInputChange}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password
                  })}
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
                  Confirm Password:{" "}
                </ControlLabel>
                <FormControl
                  required={true}
                  name="password_confirm"
                  value={this.state.password_confirm}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleInputChange}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password_confirm
                  })}
                />
                {errors.password_confirm && (
                  <div className="invalid-feedback">
                    {errors.password_confirm}
                  </div>
                )}
              </FormGroup>
              <br />
              <Button type="submit" className="submit">
                SIGN UP
              </Button>
              <Button className="submit" onClick={() => this.resetState()}>
                RESET
              </Button>
              <p>
                Already registered?
                <a href="/login"> Login In Here </a>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
