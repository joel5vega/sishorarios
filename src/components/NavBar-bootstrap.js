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
      navExpanded: false,

      url: "http://127.0.0.1:8000",
      backgroundColor: "black",
      titulo: "Sistema de Horarios",
      periodo: "",

      periodos: [],
      ambientes: [],
      aulas: [],
      laboratorios: [],

      imagen: mainlogo,
      colorbtn: "btn btn-danger my-2 my-sm-0 ",
      semestres: [
        { id: 1, nombre: "Primer Semestre", value: 1 },
        { id: 2, nombre: "Segundo Semestre", value: 2 },
        { id: 3, nombre: "Tercer Semestre", value: 3 },
        { id: 4, nombre: "Cuarto Semestre", value: 4 },
        { id: 5, nombre: "Quinto Semestre", value: 5 },
        { id: 6, nombre: "Sexto Semestre", value: 6 },
        {
          id: 7,
          nombre: "Septimo Semestre: Control",
          value: 7,
          mencion: "control",
        },
        {
          id: 8,
          nombre: "Septimo Semestre: Sistemas",
          value: 7,
          mencion: "sistemas",
        },
        {
          id: 9,
          nombre: "Septimo Semestre: Telecomunicaciones",
          value: 7,
          mencion: "telecomunicaciones",
        },
        {
          id: 10,
          nombre: "Octavo Semestre: Control",
          value: 8,
          mencion: "control",
        },
        {
          id: 11,
          nombre: "Octavo Semestre: Sistemas",
          value: 8,
          mencion: "sistemas",
        },
        {
          id: 12,
          nombre: "Octavo Semestre: Telecomunicaciones",
          value: 8,
          mencion: "telecomunicaciones",
        },
        {
          id: 13,
          nombre: "Noveno Semestre: Control",
          value: 9,
          mencion: "control",
        },
        {
          id: 14,
          nombre: "Noveno Semestre: Sistemas",
          value: 9,
          mencion: "sistemas",
        },
        {
          id: 15,
          nombre: "Noveno Semestre: Telecomunicaciones",
          value: 9,
          mencion: "telecomunicaciones",
        },
        {
          id: 16,
          nombre: "Decimo Semestre: Control",
          value: 10,
          mencion: "control",
        },
        {
          id: 17,
          nombre: "Decimo Semestre: Sistemas",
          value: 10,
          mencion: "sistemas",
        },
        {
          id: 18,
          nombre: "Decimo Semestre: Telecomunicaciones",
          value: 10,
          mencion: "telecomunicaciones",
        },
      ],

      selectedSemestre: "",
      selectedAmbiente: "",
      selectedPeriodo: "",
    };
    const { handleSelect } = this.props;
  }
  componentDidMount() {}

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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/responsable">Responsable</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/ambiente">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default NavBar;
