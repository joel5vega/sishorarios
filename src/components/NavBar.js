import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, HashRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Button, FormControl, NavDropdown, Form } from "react-bootstrap";
// import "../css/estiloNavbar.css";
import mainlogo from "../images/logo-UMSA.png";
import Responsables from "../views/responsables/HomeResponsables";
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
    } = this.props;
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="sm"
          bg="dark"
          variant="dark"
          fixed="top"
          activeKey="home"
        >
          <Navbar.Brand as={NavLink} exact to="/" activeStyle={NavActive}>
            Sistema de horarios
          </Navbar.Brand>
          <Navbar.Text>{this.props.titulo}</Navbar.Text>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown eventKey="claseSelect" title="Clases" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  eventKey="clase"
                  as={NavLink}
                  exact
                  to="/clase/"
                  // activeStyle={NavActive}
                >
                  Ver todas las clases
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey="claseLista"
                  as={NavLink}
                  exact
                  to="/clase/lista"
                  // activeStyle={NavActive}
                >
                  Lista de Ambientes
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  eventKey="claseCrear"
                  as={NavLink}
                  exact
                  to="/clase/crear"
                  // activeStyle={NavActive}
                >
                  Crear
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ambientes" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/ambiente/"
                  activeStyle={NavActive}
                >
                  Ambientes Ocupados
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/ambiente/lista"
                  activeStyle={NavActive}
                >
                  Lista de Ambientes
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/responsable/crear"
                  activeStyle={NavActive}
                >
                  Crear
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Responsables" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/responsable/"
                  activeStyle={NavActive}
                >
                  Docentes y Auxiliares
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/responsable/lista"
                  activeStyle={NavActive}
                >
                  Lista de Responsables
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/responsable/horario"
                  activeStyle={NavActive}
                >
                  Horario de los Responsables
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/responsable/crear"
                  activeStyle={NavActive}
                >
                  Crear
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Materias" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/materia/"
                  activeStyle={NavActive}
                >
                  Malla curricular
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/materia/lista"
                  activeStyle={NavActive}
                >
                  Lista de Materias
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/materia/crear"
                  activeStyle={NavActive}
                >
                  Crear
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav variant="tabs" activeKey="home" onSelect={this.handleSelect}>
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/admin/"
                  activeStyle={NavActive}
                >
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/admin/datos"
                  activeStyle={NavActive}
                >
                  Datos de administracion
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/admin/clases"
                  activeStyle={NavActive}
                >
                  Habilitar Clases
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={NavLink}
                  exact
                  to="/admin/crear"
                  activeStyle={NavActive}
                >
                  Crear
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link
                eventKey="login"
                as={NavLink}
                to="/login/"
                activeStyle={NavActive}
              >
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
