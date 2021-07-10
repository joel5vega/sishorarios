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

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://127.0.0.1:8000",
      logged: false,
      key: "home",
      titulo: "Sistema de Horarios",
      imagen: mainlogo,
      colorbtn: "btn btn-danger my-2 my-sm-0 ",
      // usuario: { responsable: { id: 5 } }
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
          expand="sm"
          // style={{ backgroundColor: this.state.background }}
          style={{ backgroundColor: "white " }}
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
              className="nav justify-content-end ml-auto"
            >
              <Navbar.Brand>
                {tipo == "administrativo" && (
                  <NavLink to="/admin/">Admin</NavLink>
                )}
                {tipo == "docente" && (
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
                    {usuario.responsable.ap_paterno}
                  </Nav.Link>
                )}
              </Navbar.Brand>
            </Nav>

            <Nav className="nav justify-content-end ml-auto">
              {!tipo ? (
                <Nav.Link
                  eventKey="login"
                  as={NavLink}
                  to="/login/"
                  activeStyle={NavActive}
                >
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link
                  eventKey="login"
                  as={NavLink}
                  to="/home/"
                  activeStyle={NavActive}
                  onClick={this.logout}
                >
                  Salir
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
