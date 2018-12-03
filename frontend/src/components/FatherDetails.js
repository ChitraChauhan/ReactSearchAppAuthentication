import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Slider from "./Slider";
import Navbar from "./Navbar";

class FatherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:8000/api/profiles/fatherDetails/" +
          this.props.match.params.name +
          "/" +
          this.props.match.params.phone
      )
      .then(res => {
        console.log("res", res);
        this.setState({ data: res.data[0] });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <Navbar />
        <Slider />
        <div className="main-w3layouts wrapper">
          <div className="main-agileinfo">
            <h2 style={{ color: "#FFFFFF" }}>Father's Detail</h2>
            <div className="agileits-top">
              <ul
                style={{ display: "block", listStyle: "none", float: "center" }}
              >
                Name:
                <li>{data && data.name}</li>
                Mobile no:
                <li>{data && data.phone}</li>
                Age:
                <li>{data && data.age}</li>
                Address:
                <li>{data && data.address}</li>
                Occupation:
                <li>{data && data.occupation}</li>
                Father's Name:
                <li>{data && data.fathersName && data.fathersName.name}</li>
                Father's Mobile no:
                <li>{data && data.fathersName && data.fathersName.phone}</li>
                Children:
                <Table bordered hover style={{ align: "center" }}>
                  <thead>
                    <tr>
                      <th>{"Sr no"}</th>
                      <th>{"Name"} </th>
                      <th>{"Age"}</th>
                      <th> {"Address"}</th>
                      <th> {"Mobile No"}</th>
                      <th> {"Gender"}</th>
                      <th> {"Occupation"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.children &&
                      data.children.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td> {row.name}</td>
                          <td> {row.age}</td>
                          <td> {row.address} </td>
                          <td> {row.phone} </td>
                          <td> {row.gender} </td>
                          <td> {row.occupation} </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </ul>
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

export default FatherDetails;
