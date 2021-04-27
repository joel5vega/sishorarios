import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
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
      backgroundColor: "black",
      key: "home",
      titulo: "Sistema de Horarios",
      periodo: "",

      periodos: [],
      ambientes: [],
      aulas: [],
      laboratorios: [],

      imagen: mainlogo,
      colorbtn: "btn btn-danger my-2 my-sm-0 ",

      selectedSemestre: "",
      selectedAmbiente: "",
      selectedPeriodo: "",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {}
  //Para ver elemento seleccionado
  handleSelect(key) {
    this.setState({
      key: key,
    });
    alert(`selected ${key}`);
  }
  /*
  handleAmbienteChange = (item) => {
    this.setState({
      titulo: item.nombre,
      selectedAmbiente: item.id,
      selectedSemestre: "",
    });
  };
  handleSemestreChange = (item) => {
    this.setState({
      titulo: item.nombre,
      selectedSemestre: item.id,
      selectedAmbiente: "",
    });
  };

  handlePeriodoChange = (item) => {
    this.setState({
      selectedPeriodo: item.id,
      periodo: item.nombre,
      titulo: "Todo",
      selectedAmbiente: "",
      selectedSemestre: "",
    });
  };
  */
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
  };
  render() {
    const NavActive = {
      color: "blue",
    };

    const { tipo, ambientes, usuario, semestres } = this.props;
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="sm"
          bg="light"
          variant="light"
          fixed="top"
        >
          <Navbar.Brand as={NavLink} exact to="/" activeStyle={NavActive}>
            Sistema de horarios
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
                {/* <Nav>
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
                    Mis horarios
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/clase/crear"
                    eventKey="crearClase"
                  >
                    Crear Clase
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/materia/"
                    eventKey="curricula"
                  >
                    Malla curricular
                  </Nav.Link>
                  </Nav> */}
              </div> 
            ) : (
              <Estudiante semestres={semestres} ambientes={ambientes} />
            )}
            <Nav onSelect={this.handleSelect}>
              {tipo == "administrativo" && (
                <div>
                  <NavLink to="/admin/">Admin</NavLink>
                </div>
              )}
            </Nav>
            <Nav className="justify-content-end">
              {this.props.tipo === "estudiante" ? (
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
