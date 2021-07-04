import React, { Component } from "react";
import {
  Switch,
  BrowserRouter,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//import auth
import Auth from "./components/common/router/protected/auth";
import NavBar from "./components/NavBar/NavBar";
import Loader from "./components/Loader.js";
import Login from "./views/auth/index";

import Register from "./views/auth/Register.js";
//Componentes
import Home from "./views/Home";
import HomeResponsables from "./views/responsables/HomeResponsables";
import ListaResponsables from "./views/responsables/ListaResponsables";

import HomeAmbientes from "./views/ambientes/HomeAmbientes";
import ListaAmbientes from "./views/ambientes/ListaAmbientes";
import CrearAmbiente from "./views/ambientes/crearAmbiente";
//Clases
import ViewClases from "./views/clases/ViewClases";
import HomeClases from "./views/clases/HomeClases";
import CrearClase from "./views/clases/crearClase";
import DetalleClase from "./views/clases/DetalleClase";
import HomeMaterias from "./views/materias/HomeMaterias";
import ListaMaterias from "./views/materias/ListaMaterias";
import CrearMateria from "./views/materias/CrearMateria";
import HabilitarClases from "./views/admin/HabiltarClases";

import HomeAdmin from "./views/admin/HomeAdmin";
import DatosAdmin from "./views/admin/DatosAdmin";
import ClasesAdmin from "./views/admin/HabiltarClases";
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
      // usuario: "estudiante",
      // usuario: { responsable: { id: 5 } },
      periodo: "",
      auth: false,
      user: Auth.getUser() | "25"
    };
    // this.handleAuth = this.handleAuth.bind(this);
  }

  async componentDidMount() {
    this.fetchIndex();
    var user = Auth.getUser()
    this.setState({
      auth: Auth.isAuthenticated(),
      tipo: Auth.getTipo(),
      user: user,
    });
    this.getUser(user);
  }
  async getUser(user) {
    axios
      .get(this.state.url + "/api/users/" + user)
      .then((response) => {
        var data = response.data.user
        console.log(data)
        // alert("se obtuvo usuario " + data.id)
        this.setState({ usuario: data });
      });
  }
  async fetchIndex() {
    console.log("estoy en app")
    axios.get("http://127.0.0.1:8000/api/index").then((response) => {
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

  async fuente() {
    var a = Auth.isAuthenticated();
    console.log(a);
    return a;
  }

  handleAuth = (tipo, usuario) => {
    var isAuth = Auth.isAuthenticated();

    if (!usuario) {
      usuario = "estudiante";
      console.log("undef");
    }
    console.log("estoy en Padre con ");
    console.log(usuario);
    this.setState({ auth: isAuth, tipo: tipo, usuario: usuario });
  };
  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <NavBar
            usuario={this.state.usuario}
            tipo={this.state.tipo}
            handleAmbienteSelect={this.handleAmbienteSelect}
            handleSemestreSelect={this.handleSemestreSelect}
            handlePeriodoSelect={this.handlePeriodoSelect}
            periodos={this.state.periodos}
            aulas={this.state.ambientes}
            laboratorios={this.state.ambientes}
            ambientes={this.state.ambientes}
            handleAuth={this.handleAuth}
            semestres={this.state.semestres}
          />

          <div id="public-routes">
            <Route
              exact
              path="/login"
              render={(props) => <Login handleAuth={this.handleAuth} />}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <Register {...props} responsables={this.state.responsables} />
              )}
            />

            {/* este es el general */}
            <Route
              exact
              path="/clase/view"
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
              path="/materia"
              render={(props) => (
                <HomeMaterias {...props} datos={this.state.materias} />
              )}
            />
          </div>

          {Auth.isAuthenticated() && this.state.tipo !== "docente" ? (
            <div name="rutas">
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
                    fetch={this.fetchIndex}
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


              <Route
                exact
                path="/clase/crear"
                render={(props) => (
                  <CrearClase
                    {...props}
                    index={this.state.index}

                  />
                )}
              />
              <Route
                exact
                path="/clase/habilitar"
                render={(props) => (
                  <HabilitarClases
                    {...props}
                    index={this.state.index}
                    clases={this.state.index.clases}

                  />
                )}
              />
              <Route
                exact
                path="/clase/detalle"
                render={(props) => <DetalleClase />}
              />
              <Route
                exact
                path="/materia/lista"
                render={(props) => (
                  <ListaMaterias {...props} index={this.state.index} datos={this.state.materias} />
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
                  <ClasesAdmin {...props} clases={this.state.index.clases} />
                )}
              />
            </div>
          ) : (

            <div className="container" id="print">
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
              <Redirect
                to={{
                  pathname: "/",
                  // search: "?utm=your+face",
                  state: { referrer: "currentLocation" },
                }}
              />
            </div>

          )}
          {this.state.tipo == "docente" &&
            <div name="rutas_doc">
              <Route
                exact
                path="/clase/crear"
                render={(props) => (
                  <CrearClase
                    {...props}
                    usuario={this.state.usuario}
                    index={this.state.index}

                  />
                )}
              />
            </div>
          }
        </BrowserRouter>

        <div className="footer">
          (c) Sistema de horarios de Ingenieria Electrónica
        </div>
      </div >
    );
  }
}

export default App;
