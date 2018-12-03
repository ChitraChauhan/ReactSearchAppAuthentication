import React, { Component } from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { registerProfile } from "../../actions/authentication";
import Slider from "../Slider";
import classnames from "classnames";
import Navbar from "../Navbar";
import "../../style.css";
import { fakeAuth } from "../../App";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: {
      //   name: "",
      //   fathersName: "",
      //   fathersPhone: "",
      //   age: "",
      //   address: "",
      //   phone: "",
      //   occupation: "",
      //   maritalStatus: ""
      // },
      name: "",
      fathersName: "",
      fathersPhone: "",
      age: "",
      address: "",
      phone: "",
      gender: "",
      occupation: "",
      maritalStatus: "",
      errors: {},
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:8000/api/profiles/editProfile/" +
          this.props.match.params.id
      )
      .then(res => {
        console.log("res", res);
        this.setState({ data: res.data[0] }, () => this.setData());
      });
  }

  setData() {
    const { data } = this.state;
    this.setState({
      name: data.name,
      fathersName: data.fathersName.name,
      fathersPhone: data.fathersName.phone,
      age: data.age,
      address: data.address,
      phone: data.phone,
      gender: data.gender,
      occupation: data.occupation,
      maritalStatus: data.maritalStatus
    });
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.authProfile.isAuthenticated) {
    //     this.props.history.push("/dashboard");
    // }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };

  handleSubmit = e => {
    e.preventDefault();
    var body = {
      name: this.state.name,
      fathersName: {
        name: this.state.fathersName,
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
    axios
      .put(
        "http://localhost:8000/api/profiles/editProfile/" +
          this.props.match.params.id,
        body
      )
      .then(res => {
        console.log("res", res);
        if (res.data.errors) {
          this.setState({ errors: res.data.errors });
        } else {
          alert("Your profile is successfully updated");
          this.props.history.push("/member");
        }
      });
  };

  render() {
    //error logic left only for fatherdetails
    const { errors } = this.state;
    return (
      <div>
        <Navbar />
        <Slider />
        <div className="main-w3layouts wrapper">
          <div className="scroll">
            <div className="main-agileinfo">
              <h2 style={{ color: "#FFFFFF" }}>Edit your Profile Here...</h2>
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
                      name="name"
                      readOnly={true}
                      value={this.state.name}
                      type="text"
                      placeholder="Please Enter LastName and FirstName Here..."
                      onChange={this.handleChange}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors && errors.name
                      })}
                    />
                    {errors && errors.name && (
                      <div className="invalid-feedback">
                        {errors && errors.name}
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
                      Father's Name:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      readOnly={true}
                      name="fathersName"
                      type="text"
                      // value={
                      //   this.state.data.fathersName.name
                      //     ? this.state.data.fathersName.name
                      //     : this.state.data.fathersName
                      // }
                      value={this.state.fathersName}
                      placeholder="Please Enter fathersName Here..."
                      onChange={this.handleChange}
                      // className={classnames("form-control form-control-lg", {
                      //   "is-invalid":
                      //   errors && errors.fathersName && errors.fathersName.name
                      // })}
                    />
                    {/* {errors && errors.fathersName &&
                      errors.fathersName.name && (
                        <div className="invalid-feedback">
                          {errors && errors.fathersName.name}
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
                      readOnly={true}
                      name="fathersPhone"
                      // value={
                      //   this.state.data.fathersName.phone
                      //     ? this.state.data.fathersName.phone
                      //     : this.state.data.fathersPhone
                      // }
                      value={this.state.fathersPhone}
                      type="phone"
                      placeholder="Please Enter mobile no Here..."
                      onChange={this.handleChange}
                      // className={classnames("form-control form-control-lg", {
                      //   "is-invalid":
                      //    errors && errors.fathersName && errors.fathersName.phone
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
                        "is-invalid": errors && errors.age
                      })}
                    />
                    {errors && errors.age && (
                      <div className="invalid-feedback">
                        {errors && errors.age}
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
                        "is-invalid": errors && errors.address
                      })}
                    />
                    {errors && errors.address && (
                      <div className="invalid-feedback">
                        {errors && errors.address}
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
                      Mobile No:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="phone"
                      value={this.state.phone}
                      type="phone"
                      placeholder="Please Enter mobile no Here..."
                      onChange={this.handleChange}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors && errors.phone
                      })}
                    />
                    {errors && errors.phone && (
                      <div className="invalid-feedback">
                        {errors && errors.phone}
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
                      Gender:{" "}
                    </ControlLabel>
                    <FormControl
                      required={true}
                      name="gender"
                      type="text"
                      value={this.state.gender}
                      placeholder="Please Enter Gender Here..."
                      onChange={this.handleChange}
                      componentClass="select"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors && errors.gender
                      })}
                    >
                      <option value="">select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </FormControl>
                    {errors && errors.gender && (
                      <div className="invalid-feedback">
                        {errors && errors.gender}
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
                        "is-invalid": errors && errors.occupation
                      })}
                    />
                    {errors && errors.occupation && (
                      <div className="invalid-feedback">
                        {errors && errors.occupation}
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
                      type="text"
                      name="maritalStatus"
                      value={this.state.maritalStatus}
                      placeholder="Please Enter Marital Status Here..."
                      onChange={this.handleChange}
                      componentClass="select"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors && errors.maritalStatus
                      })}
                    >
                      <option value="">select</option>
                      <option value="married">Married</option>
                      <option value="unmarried">Unmarried</option>
                      <option value="divorce">Divorce</option>
                    </FormControl>
                    {errors && errors.maritalStatus && (
                      <div className="invalid-feedback">
                        {errors && errors.maritalStatus}
                      </div>
                    )}
                  </FormGroup>

                  <br />

                  <Button type="submit" className="submit">
                    UPDATE
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

EditProfile.propTypes = {
  registerProfile: PropTypes.func.isRequired,
  authProfile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authProfile: state.authProfile
  // errors: state.profileErrors
});

export default connect(
  mapStateToProps,
  { registerProfile }
)(withRouter(EditProfile));
