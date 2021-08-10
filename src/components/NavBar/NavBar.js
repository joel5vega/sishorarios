import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavbarBrand, NavDropdown } from "react-bootstrap";
import mainlogo from "../../images/logo-UMSA.png";
import AuthService from "../../services/AuthService";
import auth from "../common/router/protected/auth";
import Estudiante from "./NavEstudiante.js";
import NavAdministrativo from "./NavAdministrativo.js";
import NavDocente from "./NavDocente.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://127.0.0.1:8000/api",
      logged: false,
      key: "home",
      titulo: "Sistema de Horarios",
      imagen: mainlogo,
      colorbtn: "btn btn-danger my-2 my-sm-0 ",
      usuario: { responsable: { id: 0 } }
    };
    this.handleSelect = this.handleSelect.bind(this);
  }


  componentDidMount() {
    var tipo = this.props.tipo;
    if (tipo != "estudiante") {
      this.setState({ tipo: tipo, logged: true });
    }
    if (this.props.usuario) {
      this.setState({ usuario: this.props.usuario })

    }
    else {
      this.getUser("21")
    }
  }

  async getUser(id) {

    const url = this.state.url + "/users/" + id;
    try {
      this.setState({ loading: true });
      axios.get(url).then((response) => {
        var data = response.data;
        this.setState({ usuarios: data });
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, loading: false });
    }
    console.log("DDD")
  }
  background() {
    switch (this.props.tipo) {
      case "estudiante": {
        this.setState({ background: "#40826d" });
      }
      case "docente": {
        this.setState({ background: "cyan" });
      }
      case "administrativo": {
        this.setState({ background: "white" });
      }
    }
  }
  //Para ver elemento seleccionado
  handleSelect(key) {
    this.setState({
      key: key,
    });
    console.log(`selected ${key}`);
  }

  titulo() {
    return this.state.titulo;
  }

  handleChange = (e) => {
    var name = e.target.name;

    console.log(name);
  };

  logout = () => {
    console.log("NavBar logout");
    auth.logout();
    AuthService.handleLogout();
    this.props.handleAuth();
    this.setState({ tipo: "estudiante", logged: false });
    window.location.reload(false)
  };
  render() {
    const NavActive = {
      color: "#40826d ",
    };

    const { tipo, ambientes, semestres, usuario } = this.props;
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          // style={{ backgroundColor: this.state.background }}
          style={{ backgroundColor: "white" }}
          // variant="dark"
          fixed="top"
        >
          <Navbar.Brand as={NavLink} exact to="/" activeStyle={NavActive}>
            Horarios ETN
          </Navbar.Brand>
          <Navbar.Text>{this.props.titulo}</Navbar.Text>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {tipo === "administrativo" ? (
              <div>
                <NavAdministrativo />
              </div>
            ) : tipo === "docente" ? (
              <div>
                <NavDocente usuario={usuario} />
              </div>
            ) : (
              <Estudiante semestres={semestres} ambientes={ambientes} />
            )}
            <Nav
              onSelect={this.handleSelect}
            >




              {tipo == "administrativo" && (
                <div className="icon ">
                  <FontAwesomeIcon icon={faUser} />
                  <NavLink to="/admin/">Admin</NavLink>
                </div>
              )}

              {tipo == "docente" && (
                <div className="icon justify-content-end ">
                  <FontAwesomeIcon icon={faUser} />

                  <Nav.Link
                    as={NavLink}
                    eventKey="mishorarios"
                    to={{
                      pathname: "/clase/view",

                      state: {
                        fuente:
                          "http://localhost:8000/api/clases/responsable/" +
                          usuario.responsable.id +
                          "?periodo=4",
                        titulo:
                          "Horarios de " +
                          usuario.responsable.titulo +
                          " " +
                          usuario.responsable.ap_paterno,
                      },

                    }}
                  >
                    Horarios: {usuario.responsable.ap_paterno}
                  </Nav.Link>
                </div>
              )}

            </Nav>

            <Nav className="nav justify-content-end ml-auto">
              {!tipo ? (
                <div className="icon">
                  <FontAwesomeIcon icon={faSignInAlt} />

                  <Nav.Link
                    eventKey="login"
                    as={NavLink}
                    to="/login/"
                    activeStyle={NavActive}
                  >
                    Login
                  </Nav.Link>
                </div>
              ) : (
                <div className="icon">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <Nav.Link
                    eventKey="login"
                    as={NavLink}
                    to="/home/"
                    activeStyle={NavActive}
                    onClick={this.logout}
                  >
                    Salir
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div >
    );
  }
}
export default NavBar;
