import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, HashRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Button, FormControl, NavDropdown, Form } from "react-bootstrap";
// import "../css/estiloNavbar.css";
import mainlogo from "../images/logo-UMSA.png";
import AuthService from "../services/AuthService";
import auth from "../components/common/router/protected/auth";

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
    const { handleSelect } = this.props;
  }
  componentDidMount() {}
  //Para ver elemento seleccionado
  handleSelect(key) {
    this.setState({
      key: key,
    });
    alert(`selected ${key}`);
  }
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
    const navStyles = {
      // display: "flex",
      // justifyContent: "space-around",
      // border: "2px",
      // margin: "2px",
      // color: "aqua",
    };
    const NavActive = {
      color: "lime",
    };
    const styles = {
      containerStyle: {
        backgroundColor: this.state.backgroundColor,
      },
    };
    const { containerStyle } = styles;
    const {
      handlePeriodoSelect,
      handleAmbienteSelect,
      handleSemestreSelect,
      usuario,
      ambientes,
    } = this.props;
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="sm"
          bg="dark"
          variant="dark"
          fixed="top"
        >
          <Navbar.Brand as={NavLink} exact to="/" activeStyle={NavActive}>
            Sistema de horarios
          </Navbar.Brand>
          <Navbar.Text>{this.props.titulo}</Navbar.Text>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {usuario === "administrativo" ? (
              <Nav className="mr-auto">
                <NavDropdown title="Clases" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    eventKey="clase"
                    as={NavLink}
                    exact
                    to="/clase/"
                  >
                    Buscar
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="claseView"
                    as={NavLink}
                    exact
                    to="/clase/view"
                  >
                    Ver Clase
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    eventKey="claseCrear"
                    as={NavLink}
                    exact
                    to="/clase/crear"
                  >
                    Crear
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Ambientes" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    eventKey="ambiente"
                    as={NavLink}
                    exact
                    to="/ambiente/"
                  >
                    Uso de ambientes
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey="ambienteLista"
                    as={NavLink}
                    exact
                    to="/ambiente/lista"
                  >
                    Listado de ambientes
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Responsables" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/responsable/"
                    eventKey="allResponsables"
                  >
                    Docentes y Auxiliares
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/responsable/lista"
                    eventKey="listaResponsable"
                  >
                    Lista de Responsables
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to={{
                      pathname: "/clase/lista",
                      state: {
                        selectedBuscar: "responsable",
                      },
                    }}
                    eventKey="horarioResponsable"
                  >
                    Horario de los Responsables
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Materias" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/materia/"
                    eventKey="curricula"
                  >
                    Malla curricular
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/materia/lista"
                    eventKey="listaMateria"
                  >
                    Lista de Materias
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : usuario === "docente" ? (
              <Nav>
                <Nav.Link as={NavLink} exact to="/materia/" eventKey="materia">
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
                <NavDropdown title="Semestres" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/admin/"
                    eventKey="semestre"
                  >
                    Primer Semestre
                  </NavDropdown.Item>
                  <NavDropdown.Item>Segundo Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Tercer Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Cuarto Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Quinto Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Sexto Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Septimo Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Septimo Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Septimo Semestre Telecomunicaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item>Octavo Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Octavo Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Octavo Semestre Telecomunicaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item>Noveno Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Noveno Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Noveno Semestre Telecomunicaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item>Decimo Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Decimo Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Decimo Semestre Telecomunicaciones
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Ambientes" id="collasible-nav-dropdown">
                  {ambientes.map((item) => (
                    <NavDropdown.Item key={item.id}>
                      {item.nombre}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <NavDropdown title="Semestres" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/admin/"
                    activeStyle={NavActive}
                  >
                    Primer Semestre
                  </NavDropdown.Item>
                  <NavDropdown.Item>Segundo Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Tercer Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Cuarto Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Quinto Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Sexto Semestre</NavDropdown.Item>
                  <NavDropdown.Item>Septimo Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Septimo Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Septimo Semestre Telecomunicaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item>Octavo Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Octavo Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Octavo Semestre Telecomunicaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item>Noveno Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Noveno Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Noveno Semestre Telecomunicaciones
                  </NavDropdown.Item>
                  <NavDropdown.Item>Decimo Semestre Control</NavDropdown.Item>
                  <NavDropdown.Item>Decimo Semestre Sistemas</NavDropdown.Item>
                  <NavDropdown.Item>
                    Decimo Semestre Telecomunicaciones
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Ambientes" id="collasible-nav-dropdown">
                  {ambientes.map((item) => (
                    <NavDropdown.Item key={item.id}>
                      {item.nombre}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Nav.Link
                  as={NavLink}
                  exact
                  to="/materia/"
                  activeStyle={NavActive}
                >
                  Malla curricular
                </Nav.Link>
              </Nav>
            )}
            <Nav onSelect={this.handleSelect}>
              {usuario === "administrativo" && (
                <NavDropdown title="Admin" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/admin/"
                    activeStyle={NavActive}
                  >
                    Datos
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/admin/datos"
                    activeStyle={NavActive}
                  >
                    Usuarios
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    exact
                    to="/admin/clases"
                    activeStyle={NavActive}
                  >
                    Habilitar Clase
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Nav className="justify-content-end">
              <Nav.Link
                eventKey="login"
                as={NavLink}
                to="/login/"
                activeStyle={NavActive}
              >
                {usuario}
              </Nav.Link>
              <Nav.Link
                eventKey="login"
                as={NavLink}
                to="/home/"
                activeStyle={NavActive}
              >
                <p onClick={this.logout}>Salir</p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
