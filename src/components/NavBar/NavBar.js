import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import mainlogo from "../../images/logo-UMSA.png";
import AuthService from "../../services/AuthService";
import auth from "../common/router/protected/auth";

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
    const NavActive = {
      color: "lime",
    };
    // const styles = {
    //   containerStyle: {
    //     backgroundColor: this.state.backgroundColor,
    //   },
    // };
    const { tipo, ambientes, usuario } = this.props;
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
            {tipo === "administrativo" ? (
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
            ) : tipo === "docente" ? (
              <Nav>
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
              </Nav>
            ) : (
              <Nav>
                <NavDropdown title="Semestres" id="collasible-nav-dropdown">
                  {this.props.semestres.map((item) => {
                    return (
                      <div key={item.id}>
                        <NavDropdown.Item
                          as={NavLink}
                          eventKey="semestres"
                          to={{
                            pathname: "/clase/view",
                            state: {
                              fuente:
                                "http://localhost:8000/api/clases/semestre/" +
                                item.semestre +
                                "?mencion=" +
                                item.mencion_id,
                              titulo:
                                item.mencion === "general"
                                  ? item.semestre + " Semestre "
                                  : item.semestre +
                                    " Semestre - Mencion:" +
                                    item.mencion,
                            },
                          }}
                        >
                          {item.semestre} {item.mencion}
                        </NavDropdown.Item>
                      </div>
                    );
                  })}
                </NavDropdown>
                <NavDropdown title="Ambientes" id="collasible-nav-dropdown">
                  {ambientes.map((item) => (
                    <NavDropdown.Item
                      key={item.id}
                      eventKey="ambientes"
                      as={NavLink}
                      to={{
                        pathname: "/clase/view",
                        state: {
                          fuente:
                            "http://localhost:8000/api/clases/ambiente/" +
                            item.id,
                          titulo: "Horarios en " + item.nombre,
                        },
                      }}
                    >
                      {item.nombre}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>

                <Nav.Link
                  as={NavLink}
                  eventKey="materias"
                  exact
                  to="/materia/"
                  activeStyle={NavActive}
                >
                  Malla curricular
                </Nav.Link>
              </Nav>
            )}
            <Nav onSelect={this.handleSelect}>
              {tipo === "administrativo" && (
                <div>
                  <NavLink to="/admin/">Admin</NavLink>
                </div>
              )}
            </Nav>
            <Nav className="justify-content-end">
              {!this.props.tipo ? (
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
