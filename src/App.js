import React, { Component, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//import auth
import Auth from "./components/common/router/protected/auth";
import NavBar from "./components/NavBar";
import Rutas from "./components/common/router/protected/auth";
import Login from "./views/auth/index";
import { ProtectedRoute } from "./components/common/router/protected";
// import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
//Componentes
import Home from "./views/Home";
import HomeResponsables from "./views/responsables/HomeResponsables";
import ListaResponsables from "./views/responsables/ListaResponsables";
import HorariosResponsables from "./views/responsables/HorariosResponsables";

import HomeAmbientes from "./views/ambientes/HomeAmbientes";
import ListaAmbientes from "./views/ambientes/ListaAmbientes";
import CrearAmbiente from "./views/ambientes/crearAmbiente";
//Clases
import ViewClases from "./views/clases/ViewClases";
import HomeClases from "./views/clases/HomeClases";
import Clases from "./views/clases/BuscarClase";
import CrearClase from "./views/clases/crearClase";
import ListaClases from "./views/clases/BuscarClase";

import HomeMaterias from "./views/materias/HomeMaterias";
import ListaMaterias from "./views/materias/ListaMaterias";
import CrearMateria from "./views/materias/CrearMateria";

import HomeAdmin from "./views/admin/HomeAdmin";
import DatosAdmin from "./views/admin/DatosAdmin";
import ClasesAdmin from "./views/admin/ClasesAdmin";
import CrearResponsable from "./views/responsables/CrearResponsable";

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
      auth: false,
    };
    // this.handleAuth = this.handleAuth.bind(this);
  }

  async componentDidMount() {
    this.fetchIndex();
    this.setState({ auth: Auth.isAuthenticated() });
  }

  async fetchIndex() {
    axios.get(this.state.url + "/api/index").then((response) => {
      this.setState({
        materias: response.data.materias,
        ambientes: response.data.ambientes,
        menciones: response.data.menciones,
        semestres: response.data.semestres,
        periodos: response.data.periodos,
        periodoActual: response.data.periodoActual,
        responsables: response.data.responsables,
        clases: response.data.clases,
        index: response.data,
        loading: false,
      });
    });
  }

  ////
  /*
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
*/

  async fuente() {
    var a = Auth.isAuthenticated();
    console.log(a);
    return a;
  }

  handleAuth = (e) => {
    var isAuth = Auth.isAuthenticated();
    alert("estoy en Padre");
    console.log(e);
    this.setState({ auth: isAuth });
  };
  render() {
    if (this.state.loading) {
      return <h1>Cargando</h1>;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar
              usuario="administrativo"
              handleAmbienteSelect={this.handleAmbienteSelect}
              handleSemestreSelect={this.handleSemestreSelect}
              handlePeriodoSelect={this.handlePeriodoSelect}
              periodos={this.state.periodos}
              aulas={this.state.ambientes}
              laboratorios={this.state.ambientes}
              ambientes={this.state.ambientes}
              handleAuth={this.handleAuth}
            />
          </div>
          <Route
            exact
            path="/login"
            render={(props) => <Login handleAuth={this.handleAuth} />}
          />

          <Route
            exact
            path="/home"
            render={(props) => (
              <Home
                {...props}
                semestres={this.state.semestres}
                ambientes={this.state.ambientes}
              />
            )}
          />

          <button onClick={this.handleAuth}>auth </button>
          {this.state.auth && <h1>Joel </h1>}
          {Auth.isAuthenticated() ? (
            <div name="rutas">
              <Route
                exact
                path="/register"
                render={(props) => (
                  <Register responsables={this.state.responsables} />
                )}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    {...props}
                    semestres={this.state.semestres}
                    ambientes={this.state.ambientes}
                  />
                )}
              />

              <Route
                exact
                path="/responsable"
                render={(props) => (
                  <HomeResponsables
                    {...props}
                    datos={this.state.responsables}
                  />
                )}
              />
              <Route
                exact
                path="/responsable/lista"
                render={(props) => (
                  <ListaResponsables
                    {...props}
                    datos={this.state.responsables}
                  />
                )}
              />
              <Route
                exact
                path="/responsable/crear"
                render={(props) => (
                  <CrearResponsable
                    {...props}
                    datos={this.state.responsables}
                  />
                )}
              />
              <Route
                exact
                path="/responsable/horario"
                render={(props) => (
                  <clase {...props} datos={this.state.responsables} />
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
              <Route
                exact
                path="/ambiente/crear"
                render={(props) => (
                  <CrearAmbiente {...props} datos={this.state.ambientes} />
                )}
              />

              <Route
                exact
                path="/clase"
                render={(props) => (
                  <HomeClases
                    {...props}
                    datos={this.state.clases}
                    index={this.state.index}
                    periodoActual={this.state.periodoActual}
                    periodos={this.state.periodos}
                    ambientes={this.state.ambientes}
                    responsables={this.state.responsables}
                    semestres={this.state.semestres}
                    menciones={this.state.menciones}
                  />
                )}
              />

              {/* este es el buscador */}
              <Route
                exact
                path="/clase/lista"
                render={(props) => (
                  <ViewClases
                    {...props}
                    index={this.state.index}
                    periodoActual={this.state.periodoActual}
                    periodos={this.state.periodos}
                    ambientes={this.state.ambientes}
                    responsables={this.state.responsables}
                    semestres={this.state.semestres}
                    menciones={this.state.menciones}
                  />
                )}
              />
              <Route
                exact
                path="/clase/crear"
                render={(props) => (
                  <CrearClase
                    {...props}
                    datos={this.state.clases}
                    index={this.state.index}
                    periodoActual={this.state.periodoActual}
                    periodos={this.state.periodos}
                    ambientes={this.state.ambientes}
                    responsables={this.state.responsables}
                    semestres={this.state.semestres}
                    menciones={this.state.menciones}
                  />
                )}
              />
              <Route
                exact
                path="/materia"
                render={(props) => (
                  <HomeMaterias {...props} datos={this.state.materias} />
                )}
              />
              <Route
                exact
                path="/materia/lista"
                render={(props) => (
                  <ListaMaterias {...props} datos={this.state.materias} />
                )}
              />
              <Route
                exact
                path="/materia/crear"
                render={(props) => (
                  <CrearMateria {...props} datos={this.state.materias} />
                )}
              />
              <Route
                exact
                path="/admin"
                render={(props) => (
                  <HomeAdmin {...props} index={this.state.index} />
                )}
              />
              <Route
                exact
                path="/admin/datos"
                render={(props) => (
                  <DatosAdmin {...props} index={this.state.index} />
                )}
              />
              <Route
                exact
                path="/admin/clases"
                render={(props) => (
                  <ClasesAdmin {...props} datos={this.state.materias} />
                )}
              />
            </div>
          ) : (
            <Login handleAuth={this.handleAuth} />
          )}
        </BrowserRouter>

        <div className="footer">
          (c) Sistema de horarios de Ingenieria Electrónica
        </div>
      </div>
    );
  }
}

export default App;
