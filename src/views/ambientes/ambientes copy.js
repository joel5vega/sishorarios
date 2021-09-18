import React, { Component } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Ambientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ambientes: [],
      //url: "http://sishorarios.azurewebsites.net/public/api/",
      data: [],
      show: false,
    };
  }

  async componentDidMount() {
    this.fetchData();
  }
  async fetchData() {
    const data = await fetch(urlAmbientes).then((value) => value.json());
    this.setState({ data: data.ambientes, ambientes: data.ambientes });
  }

  render() {
    const navStyles = {
      display: "flex",
      justifyContent: "space-around",
    };
    const NavActive = {
      color: "red",
    };

    return (
      <div className="container">
        <BrowserRouter>
          <h1>Ambientes</h1>
          <nav className="container" style={navStyles}>
            <NavLink exact to="/ambiente/" activeStyle={NavActive}>
              Home
            </NavLink>
            <NavLink exact to="/ambiente/lista" activeStyle={NavActive}>
              Lista
            </NavLink>
          </nav>

          <Route
            path="/ambiente/lista"
            render={(props) => (
              <ListaResponsables {...props} datos={this.state.data} />
            )}
          />
          <Route
            exact
            path="/ambiente/"
            render={(props) => (
              <HomeResponsables {...props} datos={this.state.data} />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}
