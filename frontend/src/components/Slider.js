import React, { Component } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaneOpen: true,
      isPaneOpenLeft: false
    };
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <div>
        <div style={{ marginLeft: "600px", float: "left" }}>
          <SlidingPane
            ariaHideApp={false}
            isOpen={this.state.isPaneOpenLeft}
            title="Menu Pane"
            from="left"
            width="240px"
            onRequestClose={() => this.setState({ isPaneOpenLeft: false })}
          >
            <div className="sidebar">
              <br />
              <Link to="/dashboard">Dashboard</Link>
              <br />
              <br />
              <Link to={`/editUser/${this.props.user.id}`}>
                Edit user credentials
              </Link>
              <br />
              <br />
              <Link to="/member">Member Details</Link>
              <br />
              <br />
              <Link to="/marriage">Unmarried Profiles</Link>
              <br />
              <br />
            </div>
          </SlidingPane>
        </div>
        <div style={{ overflow: "hidden" }}>
          <i
            className="fa fa-bars"
            style={{ left: "0px", top: "0px", marginTop: "10px" }}
            onClick={() =>
              this.setState({ isPaneOpenLeft: !this.state.isPaneOpenLeft })
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(withRouter(Slider));
