import React, { Component, useState } from "react";
import { BrowserRouter, Route, NavLink, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendario from "./components/Calendario";
import NavBar from "./components/NavBar";
import Lista from "./components/Lista";
import Home from "./views/Home";
import Ambientes from "./views/ambientes/ambientes";
import Materias from "./views/materias/materias";

import Clases from "./views/clases";
import CrearClase from "./views/crearClase";
import Responsables from "./views/responsables/Responsables";

//Contexto
import ContextProvider from "./containers/ContextProvider";
//Componentes
import HomeResponsables from "./views/responsables/HomeResponsables";
import ListaResponsables from "./views/responsables/ListaResponsables";
import HorariosResponsables from "./views/responsables/HorariosResponsables";
import HomeAmbientes from "./views/ambientes/HomeAmbientes";
import ListaAmbientes from "./views/ambientes/ListaAmbientes";
import WindowProvider from "./containers/WindowProvider";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://127.0.0.1:8000",
      index: {},
      loading: true,
      fuente: "http://127.0.0.1:8000/clases/show",
      selectedPeriodo: "",
      selectedTitle: "Home",
      periodo: "",
    };
  }

  async componentDidMount() {
    this.fetchData();
    // this.getPeriodo()
    //this.fetchResponsables();
    //this.fetchAmbientes();
  }
  ////
  async fetchData() {
    let url = this.state.url;
    var urlPeriodos = url + "/index?index=periodos";
    var urlAmbientes = url + "/index?index=ambientes";
    // var urlAmbientes = url + "/index/ambientes?tipo=aula";
    var urlSemestres = url + "/index?index=semestres";
    var urlMenciones = url + "/index?index=menciones";
    var urlResponsables = url + "/index?index=responsables";
    Promise.all([
      fetch(urlAmbientes).then((value) => value.json()),
      fetch(urlResponsables).then((value) => value.json()),
      fetch(urlPeriodos).then((value) => value.json()),
      fetch(urlSemestres).then((value) => value.json()),
    ])
      .then((allResponses) => {
        //const materias = allResponses[4];
        const ambientes = allResponses[0];
        const responsables = allResponses[1];
        const periodos = allResponses[2];
        const semestres = allResponses[3];
        this.setState({
          periodos: periodos.periodos,
          ambientes: ambientes.ambientes,
          responsables: responsables.responsables,
          semestres: semestres.semestres,
          menciones: semestres.menciones,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ////

  async getPeriodo() {
    const urlPeriodo = this.state.url + "/index?index=periodos";

    const data = await fetch(urlPeriodo).then((value) => value.json());
    // console.log(data)
    var periodo = data.periodo[0].id;
    var periodo_nombre = data.periodo[0].nombre;
    const fuentePeriodo = this.state.url + "/index?periodo=" + periodo;
    this.setState({
      selectedPeriodo: periodo,
      periodo: periodo_nombre,
      fuente: fuentePeriodo,
    });
    // this.fuente()
  }

  handlePeriodoSelect = (periodo) => {
    // console.log(evento)
    const fuentePeriodo = this.state.url + "/index?periodo=" + periodo.id;
    this.setState({
      selectedPeriodo: periodo.id,
      fuente: fuentePeriodo,
      periodo: periodo.nombre,
    });
    // this.fuente()
  };

  handleAmbienteSelect = (evento) => {
    console.log(evento);
    var nuevaFuente =
      "http://127.0.0.1:8000/ambientes/" +
      evento.id +
      "?periodo=" +
      this.state.selectedPeriodo;
    let title = "Ambiente:  " + evento.nombre;
    this.setState({ fuente: nuevaFuente, selectedTitle: title });
  };

  handleSemestreSelect = (evento) => {
    console.log(evento);
    if (evento != "undefined") {
      if (evento.value < 7) {
        var nuevaFuente =
          "http://127.0.0.1:8000/semestres/" +
          evento.value +
          "?periodo=" +
          this.state.selectedPeriodo;
        this.setState({ fuente: nuevaFuente });
      } else {
        var fuenteDatos =
          "http://127.0.0.1:8000/semestres/" +
          evento.value +
          "?periodo=" +
          this.state.selectedPeriodo +
          "&mencion=" +
          evento.mencion;
        this.setState({ fuente: fuenteDatos });
      }
      this.setState({ selectedTitle: evento.nombre });
    }
    // console.log("fuente es : " + this.state.fuente)
    // this.fuente()
  };

  fuente() {
    return this.state.fuente;
  }

  render() {
    const navStyles = {
      display: "flex",
      justifyContent: "space-around",
      border: "2px",
      margin: "5px",
      color: "green",
    };
    const NavActive = {
      color: "red",
    };
    if (this.state.loading) {
      return <h1>Cargando</h1>;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <NavBar
              handleAmbienteSelect={this.handleAmbienteSelect}
              handleSemestreSelect={this.handleSemestreSelect}
              handlePeriodoSelect={this.handlePeriodoSelect}
            />
          </div>

          <div className="container">
            <nav style={navStyles}>
              <NavLink
                exact
                to="/responsable/"
                style={navStyles}
                activeStyle={NavActive}
              >
                Responsable Home
              </NavLink>
              <NavLink
                exact
                to="/responsable/lista"
                style={navStyles}
                activeStyle={NavActive}
              >
                Responsable Lista
              </NavLink>
              <NavLink
                exact
                to="/responsable/horario"
                style={navStyles}
                activeStyle={NavActive}
              >
                Horarios responsable
              </NavLink>

              <NavLink
                exact
                to="/ambiente/"
                className="p-2"
                style={navStyles}
                activeStyle={NavActive}
              >
                Ambiente Home
              </NavLink>
              <NavLink
                exact
                to="/ambiente/lista"
                className="p-2"
                style={navStyles}
                activeStyle={NavActive}
              >
                Ambiente Lista
              </NavLink>
            </nav>
            <nav style={navStyles}>
              <NavLink
                exact
                to="/materia"
                className="p-2"
                style={navStyles}
                activeStyle={NavActive}
              >
                Materia
              </NavLink>
              <NavLink
                exact
                to="/materia/"
                className="p-2"
                style={navStyles}
                activeStyle={NavActive}
              >
                Lista Materias
              </NavLink>
              <NavLink
                exact
                to="/clases/"
                className="p-2"
                style={navStyles}
                activeStyle={NavActive}
              >
                Clases
              </NavLink>
            </nav>
          </div>
          <div className="container">
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  fuente={this.fuente()}
                  periodo={this.state.periodo}
                  titulo={this.state.selectedTitle}
                />
              )}
            />

            <Route
              exact
              path="/responsable"
              render={(props) => (
                <HomeResponsables {...props} datos={this.state.responsables} />
              )}
            />
            <Route
              exact
              path="/responsable/lista"
              render={(props) => (
                <ListaResponsables {...props} datos={this.state.responsables} />
              )}
            />
            <Route
              exact
              path="/responsable/horario"
              render={(props) => (
                <HorariosResponsables
                  {...props}
                  datos={this.state.responsables}
                />
              )}
            />

            <Route
              exact
              path="/ambiente"
              render={(props) => (
                <HomeAmbientes {...props} datos={this.state.ambientes} />
              )}
            />
            <Route
              exact
              path="/ambiente/lista"
              render={(props) => (
                <ListaAmbientes {...props} datos={this.state.ambientes} />
              )}
            />
            <WindowProvider>
              <Route path="/clases" component={Clases} />
              <Route path="/ambientes" component={Ambientes} />
              <Route path="/materia" component={Materias} />
              <Route exact path="/" component={Clases} />
              <Route
                path="/clase"
                render={(props) => (
                  <Clases
                    {...props}
                    fuente={this.fuente()}
                    periodo={this.state.periodo}
                    titulo={this.state.selectedTitle}
                  />
                )}
              />
            </WindowProvider>
          </div>
        </BrowserRouter>

        <div>(c) Sistema de horarios de Ingenieria Electrónica</div>
      </div>
    );
  }
}

export default App;
