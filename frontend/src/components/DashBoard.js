import React, { Component } from "react";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "./Slider";
import Navbar from "./Navbar";
import "../style.css"

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: true,
      isPaneOpenLeft: false,
      data: [],
      profile: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/profiles/profileRegistration")
      .then(res => res.json())
      .then(result => {
        console.log("result", result);
        this.setState({ data: result }, () => this.checkProfileExists());
      });
  }

  checkProfileExists() {
    let profile = this.state.data.filter(profile => {
      return profile.userId === this.props.user.id;
    });
    if (profile.length > 0) {
      this.setState({ profile: true });
    } else {
      this.setState({ profile: false });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Slider />
        <h2>Welcome {this.props.user.name} !!</h2>
        {!this.state.profile && (
          <h2 style={{ fontSize: "1em", letterSpacing: "1px" }}>
            Want to become a member??
            <Link to="/profileRegistration"> Register here...</Link>
          </h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(DashBoard);
