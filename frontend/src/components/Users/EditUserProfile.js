import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import Slider from "../Slider";
import { fakeAuth } from "../../App";
import Navbar from "../Navbar";
import "../../style.css";

class EditUserProfile extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      loginUsers: [],
      // user: {
      //   name: "",
      //   fullName: "",
      //   email: "",
      //   phone: ""
      // },
      name: "",
      fullName: "",
      email: "",
      phone: "",
      redirectToReferrer: false
    };
  }

  handleInputChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };

  componentDidMount() {
    fetch("http://localhost:8000/api/users/login")
      .then(res => res.json())
      .then(result => {
        console.log("result", result);
        this.setState({ loginUsers: result }, () => this.matchLoginUser());
      });
  }

  matchLoginUser() {
    let loginuser = this.state.loginUsers.filter(
      user => user._id === this.props.user.id
    );
    if (loginuser) {
      this.setState({
        name: loginuser[0].name,
        fullName: loginuser[0].fullName,
        email: loginuser[0].email,
        phone: loginuser[0].phone,
        password: loginuser[0].password
      });
    }
    // this.setState({ user: loginuser[0] });
  }

  handleSubmit = e => {
    e.preventDefault();
    var body = {
      name: this.state.name,
      fullName: this.state.fullName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    };
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
    axios
      .put(
        "http://localhost:8000/api/users/editUser/" + this.props.user.id,
        body
      )
      .then(res => {
        console.log("res", res);
        if (res.data.errors) {
          this.setState({ errors: res.data.errors });
        } else {
          alert("Your login info is successfully updated");
          this.props.history.push("/dashboard");
        }
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Navbar />
        <Slider />
        <div className="main-w3layouts wrapper">
          <div className="main-agileinfo">
            <h2 style={{ color: "#FFFFFF" }}>Update your Login Info...</h2>
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
                      errors.fullName && errors.fullName.length > 0
                        ? "error"
                        : ""
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
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
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
                <br />
                <Button className="submit" type="submit">
                  UPDATE
                </Button>
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
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(EditUserProfile));
