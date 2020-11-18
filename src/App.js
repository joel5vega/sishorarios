import React, { Component, useState } from "react";
import { BrowserRouter, Route, NavLink, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendario from "./components/Calendario";
import NavBar from "./components/NavBar";
import Lista from "./components/Lista";
import Home from "./views/Home";
import Ambientes from "./views/ambientes/ambientes";
import Materias from "./views/materias";

import Clases from "./views/clases";
import CrearClase from "./views/crearClase";
import Responsables from "./views/responsables/Responsables";

//Contexto
import ContextProvider from "./containers/ContextProvider";
//Componentes
import HomeResponsables from "./views/responsables/HomeResponsables";
import ListaResponsables from "./views/responsables/ListaResponsables";
import HomeAmbientes from "./views/ambientes/HomeAmbientes";
import ListaAmbientes from "./views/ambientes/ListaAmbientes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      url: "http://127.0.0.1:8000",
      index: {},

      fuente: "http://127.0.0.1:8000/clases/show",
      selectedPeriodo: "",
      selectedTitle: "Home",
      periodo: "",
    };
  }

  async componentDidMount() {
    //this.fetchData();
    // this.getPeriodo()
    this.fetchResponsables();
    this.fetchAmbientes();
  }

  async fetchData() {
    let urlResponsables = "http://127.0.0.1:8000/index/responsables";
    const data = await fetch(urlResponsables).then((value) => value.json());
    this.setState({ responsables: data.responsables });
  }
  async fetchResponsables() {
    let urlResponsables = "http://127.0.0.1:8000/index/responsables";
    const data = await fetch(urlResponsables).then((value) => value.json());
    this.setState({ responsables: data.responsables });
  }

  async fetchAmbientes() {
    let urlAmbientes = "http://127.0.0.1:8000/index/ambientes";
    const data = await fetch(urlAmbientes).then((value) => value.json());
    this.setState({ ambientes: data.ambientes });
  }

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
    };
    const NavActive = {
      color: "red",
    };

    return (
      <div className="App">
        <div className="container">
          <NavBar
            handleAmbienteSelect={this.handleAmbienteSelect}
            handleSemestreSelect={this.handleSemestreSelect}
            handlePeriodoSelect={this.handlePeriodoSelect}
          />
        </div>

        <div className="container">
          <BrowserRouter>
            {/* NavBar */}
            <div className="container">
              <nav style={navStyles}>
                <NavLink exact to="/responsable/" activeStyle={NavActive}>
                  Responsable Home
                </NavLink>
                <NavLink exact to="/responsable/lista" activeStyle={NavActive}>
                  Responsable Lista
                </NavLink>
                <NavLink exact to="/ambientes/" activeStyle={NavActive}>
                  Ambientes
                </NavLink>
                <NavLink exact to="/ambiente/" activeStyle={NavActive}>
                  Ambiente Home
                </NavLink>
                <NavLink exact to="/ambiente/lista" activeStyle={NavActive}>
                  Ambiente Lista
                </NavLink>
              </nav>
            </div>
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
            {/* homepage */}
            {/* <Route  path="/">
              <Redirect to="/clase" />
            </Route> */}
            {/* Responsables */}

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

            <Route path="/crear/clase" component={CrearClase} />
            <Route path="/ambientes" component={Ambientes} />
            <Route path="/materia" component={Materias} />
            <Route path="/lista" component={Lista} />

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
          </BrowserRouter>
        </div>
        <div>(c) Sistema de horarios de Ingenieria Electrónica</div>
      </div>
    );
  }
}

export default App;
