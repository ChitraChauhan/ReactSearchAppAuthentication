import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerProfile } from "../../actions/authentication";
import Slider from "../Slider";
import classnames from "classnames";
import Navbar from "../Navbar";
import "../../style.css";
import { fakeAuth } from "../../App";

class ProfileRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      address: "",
      phone: "",
      gender: "",
      occupation: "",
      maritalStatus: "",
      fathers_Name: "",
      fathersPhone: "",
      errors: {},
      redirectToReferrer: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  resetState() {
    this.setState({
      name: "",
      fathers_Name: "",
      fathersPhone: "",
      age: "",
      address: "",
      phone: "",
      gender: "",
      occupation: "",
      maritalStatus: ""
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const profile = {
      name: this.props.user.fullName,
      fathersName: {
        name: this.state.fathers_Name,
        phone: this.state.fathersPhone
      },
      age: this.state.age,
      address: this.state.address,
      phone: this.state.phone,
      gender: this.state.gender,
      occupation: this.state.occupation,
      maritalStatus: this.state.maritalStatus
    };
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
    this.props.registerProfile(profile, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.authProfile.isAuthenticated) {
    //   //   this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { user } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Navbar />
        <Slider />
        <div className="main-w3layouts wrapper">
          <div className="scroll">
            <div className="main-agileinfo">
              <h2 style={{ color: "#FFFFFF" }}>
                Register your Profile Here...
              </h2>
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
                      Name:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      readOnly={true}
                      name="name"
                      value={user.fullName}
                      type="text"
                      placeholder="Please Enter LastName and FirstName Here..."
                      onChange={this.handleChange}
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
                        paddingRight: "330px",
                        paddingTop: "5px",
                        color: "#FFFFFF"
                      }}
                    >
                      Father's Name:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="fathers_Name"
                      value={this.state.fathers_Name}
                      type="text"
                      placeholder="Please Enter Lastname and FirstName of your Father Here..."
                      onChange={this.handleChange}
                      // className={classnames("form-control form-control-lg", {
                      //   "is-invalid": errors.fathersName && errors.fathersName.name
                      // })}
                    />
                    {/* {errors.fathersName &&
                errors.fathersName.name && (
                  <div className="invalid-feedback">
                    {errors.fathersName.name}
                  </div>
                )} */}
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel
                      style={{
                        paddingRight: "330px",
                        paddingTop: "5px",
                        color: "#FFFFFF"
                      }}
                    >
                      Father's Mobile No:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="fathersPhone"
                      value={this.state.fathersPhone}
                      type="number"
                      placeholder="Please Enter mobile no Here..."
                      onChange={this.handleChange}
                      // className={classnames("form-control form-control-lg", {
                      //   "is-invalid": errors.fathersName && errors.fathersName.phone
                      // })}
                    />
                    {/* {errors.fathersName &&
                errors.fathersName.phone && (
                  <div className="invalid-feedback">
                    {errors.fathersName.phone}
                  </div>
                )} */}
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel
                      style={{
                        paddingRight: "330px",
                        paddingTop: "5px",
                        color: "#FFFFFF"
                      }}
                    >
                      Age:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="age"
                      value={this.state.age}
                      type="number"
                      placeholder="Please Enter age Here..."
                      onChange={this.handleChange}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.age
                      })}
                    />
                    {errors.age && (
                      <div className="invalid-feedback">{errors.age}</div>
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
                      Address:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="address"
                      value={this.state.address}
                      type="text"
                      placeholder="Please Enter address Here..."
                      onChange={this.handleChange}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.address
                      })}
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
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
                      Mobile No:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="phone"
                      value={this.state.phone}
                      type="number"
                      placeholder="Please Enter mobile no Here..."
                      onChange={this.handleChange}
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
                      Gender:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="gender"
                      value={this.state.gender}
                      placeholder="Please Enter Gender Here..."
                      onChange={this.handleChange}
                      componentClass="select"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.gender
                      })}
                    >
                      <option value="">select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </FormControl>
                    {errors.gender && (
                      <div className="invalid-feedback">{errors.gender}</div>
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
                      Occupation:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="occupation"
                      value={this.state.occupation}
                      type="text"
                      placeholder="Please Enter occupation Here..."
                      onChange={this.handleChange}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.occupation
                      })}
                    />
                    {errors.occupation && (
                      <div className="invalid-feedback">
                        {errors.occupation}
                      </div>
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
                      Marital Status:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="maritalStatus"
                      value={this.state.maritalStatus}
                      placeholder="Please Enter Marital Status Here..."
                      onChange={this.handleChange}
                      componentClass="select"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.maritalStatus
                      })}
                    >
                      <option value="">select</option>
                      <option value="married">Married</option>
                      <option value="unmarried">Unmarried</option>
                      <option value="divorce">Divorce</option>
                    </FormControl>
                    {errors.maritalStatus && (
                      <div className="invalid-feedback">
                        {errors.maritalStatus}
                      </div>
                    )}
                  </FormGroup>

                  <br />

                  <Button type="submit" className="submit">
                    REGISTER
                  </Button>
                  <Button className="submit" onClick={() => this.resetState()}>
                    RESET
                  </Button>
                </form>
              </div>
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

ProfileRegistration.propTypes = {
  registerProfile: PropTypes.func.isRequired,
  authProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authProfile: state.authProfile,
  errors: state.profileErrors,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { registerProfile }
)(withRouter(ProfileRegistration));
