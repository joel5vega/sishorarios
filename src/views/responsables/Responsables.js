import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../fontawesome";
import "../../css/nav.css";

class Responsables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //url: "http://sishorarios.azurewebsites.net/public/api/",
      data: [],
      show: false,
    };
  }
  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const data = await fetch(urlResponsables).then((value) => value.json());
    this.setState({ data: data.responsables });
    // console.log(this.state.data);
  }
  render() {
    const navStyles = {
      display: "flex",
      justifyContent: "space-around",
    };
    const NavActive = {
      color: "red",
    };
    console.log("<Responsables/>");

    return (
      <div className="container">
        <h1>Responsables</h1>

        <nav className="container" style={navStyles}>
          <NavLink exact to="/responsable/" activeStyle={NavActive}>
            Home
          </NavLink>
          <NavLink exact to="/responsable/crear" activeStyle={NavActive}>
            Crear
          </NavLink>
        </nav>
      </div>
    );
  }
}
