import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";
import { connect } from "react-redux";
import Slider from "./Slider";
import Pagination from "./Pagination";
import Navbar from "./Navbar";
import { FormControl } from "react-bootstrap";
import "../style.css";
import { Link } from "react-router-dom";

class MarriageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchValue: "",
      filteredDataList: [],
      selectedOption: "",
      sortBy: "",
      sortDir: "",
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/profiles/profileRegistration")
      .then(res => res.json())
      .then(result => {
        console.log("result", result);
        this.setState({ data: result });
      });
  }

  searchBy(value) {
    const { data, selectedOption } = this.state;
    if (selectedOption) {
      let tableData;
      if (selectedOption.value === "age") {
        tableData =
          data &&
          data.filter(info => {
            return (
              (info[`${selectedOption.value}`] + "").indexOf(value.toString()) >
              -1
            );
          });
      } else if (selectedOption.value === "gender") {
        tableData =
          data &&
          data.filter(info => {
            return (
              info[`${selectedOption.value}`] &&
              !info[`${selectedOption.value}`]
                .toLowerCase()
                .indexOf(value.toLowerCase())
            );
          });
      } else if (selectedOption.value === "fathersName") {
        tableData =
          data &&
          data.filter(info => {
            return (
              info[`${selectedOption.value}`] &&
              info[`${selectedOption.value}`].name
                .toLowerCase()
                .includes(value.toLowerCase())
            );
          });
      } else {
        tableData =
          data &&
          data.filter(info => {
            return (
              info[`${selectedOption.value}`] &&
              info[`${selectedOption.value}`]
                .toLowerCase()
                .includes(value.toLowerCase())
            );
          });
      }
      this.setState({ filteredDataList: tableData });
    }
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  renderDropdownButton() {
    const { selectedOption } = this.state;
    return (
      <div style={{ float: "center" }}>
        <h2
          style={{
            color: "#FFFFFF",
            float: "left",
            fontSize: "1em",
            letterSpacing: "1px"
          }}
        >
          Search By :{" "}
        </h2>
        <Select
          isSearchable
          value={this.state.selectedOption}
          onChange={this.handleChange}
          menuContainerStyle={{
            width: "25%",
            marginLeft: "35%",
            marginRight: "35%"
          }}
          options={[
            { value: "name", label: "Name" },
            { value: "fathersName", label: "Fathers_Name" },
            { value: "age", label: "Age" },
            { value: "address", label: "Address" },
            { value: "phone", label: "Mobile No" },
            { value: "gender", label: "Gender" },
            { value: "occupation", label: "Occupation" }
          ]}
        />
        <br />
        {selectedOption && (
          <div className="search" style={{ float: "center" }}>
            {/* <i className="fa fa-search" /> */}
            <FormControl
              style={{ width: "300px", height: "35px", borderRadius: "5px" }}
              type="text"
              onChange={e => this.searchBy(e.target.value)}
              placeholder="Search by the field you selected..."
            />
          </div>
        )}
      </div>
    );
  }

  sortData(key) {
    var sortDir = this.state.sortDir;
    var sortBy = key;
    if (sortBy === this.state.sortBy) {
      sortDir = this.state.sortDir === "ASC" ? "DESC" : "ASC";
    } else {
      sortDir = "DESC";
    }
    var rows = this.state.data.slice();
    rows.sort((a, b) => {
      var sortVal = 0;
      if (a[sortBy] > b[sortBy]) {
        sortVal = 1;
      }
      if (a[sortBy] < b[sortBy]) {
        sortVal = -1;
      }

      if (sortDir === "DESC") {
        sortVal = sortVal * -1;
      }
      return sortVal;
    });

    this.setState({ sortBy, sortDir, data: rows });
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    const { sortBy, sortDir, pageOfItems, data, filteredDataList } = this.state;
    let sortDirArrow = "";
    if (sortDir !== null) {
      sortDirArrow = sortDir === "DESC" ? " ↓ " : " ↑ ";
    }
    return (
      <div>
        <Navbar />
        <Slider />
        <div className="main-w3layouts wrapper">
          <div className="main-agileinfo" style={{ width: "80%" }}>
            <h2 style={{ color: "#FFFFFF" }}>List of Umarried Members</h2>
            <div className="agileits-top">
              {this.renderDropdownButton()}
              <br />
              <Table bordered hover style={{ align: "center" }}>
                <thead>
                  <tr>
                    <th>{"Sr no"}</th>
                    <th onClick={() => this.sortData("name")}>
                      {"Name" + (sortBy === "name" ? sortDirArrow : "")}{" "}
                    </th>
                    <th onClick={() => this.sortData("fathersName")}>
                      {"Fathers Name" +
                        (sortBy === "fathersName" ? sortDirArrow : "")}
                    </th>
                    <th>{"Father's mobile no"}</th>
                    <th onClick={() => this.sortData("age")}>
                      {"Age" + (sortBy === "age" ? sortDirArrow : "")}
                    </th>
                    <th onClick={() => this.sortData("address")}>
                      {"Address" + (sortBy === "address" ? sortDirArrow : "")}
                    </th>
                    <th onClick={() => this.sortData("phone")}>
                      {"Mobile No" + (sortBy === "phone" ? sortDirArrow : "")}
                    </th>
                    <th onClick={() => this.sortData("gender")}>
                      {"Gender" + (sortBy === "gender" ? sortDirArrow : "")}
                    </th>
                    <th onClick={() => this.sortData("occupation")}>
                      {"Occupation" +
                        (sortBy === "occupation" ? sortDirArrow : "")}
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {pageOfItems &&
                    pageOfItems.map(
                      (row, index) =>
                        row.maritalStatus === "unmarried" && (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td> {row.name}</td>
                            <td> {row.fathersName.name}</td>
                            <td> {row.fathersName.phone}</td>
                            <td> {row.age}</td>
                            <td> {row.address} </td>
                            <td> {row.phone} </td>
                            <td> {row.gender} </td>
                            <td> {row.occupation} </td>
                            <td>
                              <Link
                                to={`/fatherDetails/${row.fathersName.name}/${
                                  row.fathersName.phone
                                }`}
                                className="link"
                              >
                                See Father's Detail...
                              </Link>
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </Table>
              <Pagination
                items={
                  filteredDataList && filteredDataList.length > 0
                    ? filteredDataList
                    : data
                }
                onChangePage={this.onChangePage}
              />
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

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(MarriageDetails);
