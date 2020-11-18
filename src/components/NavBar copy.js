import React, { Component } from "react";
import { BrowserRouter, Route, NavLink, HashRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Button, FormControl, NavDropdown, Form } from "react-bootstrap";
import "../css/estiloNavbar.css";
import mainlogo from "../images/logo-UMSA.png";
import Responsables from "../views/responsables/homeResponsables";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  //fetch data
  async componentDidMount() {
    const url = "http://127.0.0.1:8000/index?index=ambientes";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ ambientes: data.ambientes });
    // console.log(data)
    this.fetchData();
    // this.getPeriodo()
  }
  async getPeriodo() {
    const urlPeriodo = this.state.url + "/index?index=periodos";
    const data = await fetch(urlPeriodo).then((value) => value.json());
    this.setState({
      periodos: data.periodos,
      periodo: data.periodo[0].nombre,
      selectedPeriodo: data.periodo[0].id,
    });
  }
  //fetch responsables
  async fetchData() {
    const url = this.state.url;

    const urlPeriodos = url + "/index?index=periodos";
    const urlAmbientes = url + "/index/ambientes";
    const urlAulas = url + "/index/ambientes?tipo=aula";
    const urlLaboratorios = url + "/index/ambientes?tipo=laboratorio";
    const urlResponsables = url + "/index/responsables";
    Promise.all([
      fetch(urlPeriodos).then((value) => value.json()),
      fetch(urlAmbientes).then((value) => value.json()),
      fetch(urlAulas).then((value) => value.json()),
      fetch(urlLaboratorios).then((value) => value.json()),
      fetch(urlResponsables).then((value) => value.json()),
    ])
      .then((allResponses) => {
        const periodos = allResponses[0];
        const ambientes = allResponses[1];
        const aulas = allResponses[2];
        const laboratorios = allResponses[3];
        const responsables = allResponses[4];
        this.setState({
          periodos: periodos.periodos,
          periodo: periodos.periodo[0].nombre,
          selectedPeriodo: periodos.periodo[0].id,
          ambientes: ambientes.ambientes,
          aulas: aulas.ambientes,
          laboratorios: laboratorios.ambientes,
          responsables: responsables.responsables,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
    const NavActive = {
      color: "red",
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
        <BrowserRouter>
          <Navbar
            collapseOnSelect
            expand="xxl"
            bg="dark"
            variant="dark"
            fixed="top"
            height="80px"
          >
            <Nav>
              <Navbar.Brand href="/">
                <img
                  src={this.state.imagen}
                  id="logo_header"
                  height="50px"
                  alt="logo-UMSA"
                />
              </Navbar.Brand>
            </Nav>
            <Nav>
              <Navbar.Text className="header">{this.state.titulo}</Navbar.Text>
            </Nav>
            <Nav>
              <NavLink exact to="/responsable/" activeStyle={NavActive}>
                Responsable
              </NavLink>
            </Nav>

            <Route
              exact
              path="/responsable/"
              render={(props) => (
                <Responsables {...props} tipo="responsable" />
              )}
            />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="r-auto" href="/">
                {/* <NavDropdown title="Periodo" id="collasible-nav-dropdown">
                                <Navbar.Toggle >
                                    {this.state.periodos.map((item) =>
                                        <NavDropdown.Item
                                            key={item.id} value={item.id}
                                            onClick={() => {
                                                this.handlePeriodoChange(item)
                                                handlePeriodoSelect(item)
                                            }}>
                                            {item.nombre}
                                        </NavDropdown.Item>)}
                                </Navbar.Toggle>
                            </NavDropdown>
                            <NavDropdown title="Ambiente" id="collasible-nav-dropdown">
                                <Navbar.Toggle >
                                    {this.state.aulas.map((item) =>
                                        <NavDropdown.Item
                                            key={item.id} value={item.id}
                                            onClick={() => {
                                                this.handleAmbienteChange(item)
                                                handleAmbienteSelect(item)
                                            }}>
                                            {item.nombre}
                                        </NavDropdown.Item>)}
                                    <NavDropdown.Divider />
                                    {this.state.laboratorios.map((item) =>
                                        <NavDropdown.Item key={item.id} value={item.id}
                                            onClick={(e) => {
                                                this.handleAmbienteChange(item)
                                                handleAmbienteSelect(item)
                                            }}>
                                            {item.nombre}
                                        </NavDropdown.Item>)}
                                </Navbar.Toggle>
                            </NavDropdown>


                            <NavDropdown children title="Semestre" id="collasible-nav-dropdown">
                                <Navbar.Toggle>

                                    {this.state.semestres.map((semestre) =>
                                        <NavDropdown.Item key={semestre.id} value={semestre.value}
                                            onClick={(e) => {
                                                this.handleSemestreChange(semestre)
                                                handleSemestreSelect(semestre)
                                            }
                                            }

                                        >
                                            {semestre.nombre}
                                        </NavDropdown.Item>)}

                                </Navbar.Toggle>
                            </NavDropdown>  */}

                {/* <Nav.Link href="/clase/crear">Crear Nueva Clase</Nav.Link> */}
                <Nav.Link
                  href="/clase"
                  name="Clase"
                  onClick={this.handleChange}
                >
                  Clases
                </Nav.Link>
                <Nav.Link href="/materia" name="Materia">
                  Materia
                </Nav.Link>
                <Nav.Link href="/responsable" name="Responsable">
                  Responsable
                </Nav.Link>
                <Nav.Link href="/ambiente" name="Ambientes">
                  Ambientes
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </BrowserRouter>
      </div>
    );
  }
}
export default NavBar;
