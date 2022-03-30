import React, { Component, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import DataAmbientes from "./data/DataAmbientes";
import DataSemestres from "./data/DataSemestres";
import DataMaterias from "./data/DataMaterias";
//Componentes indispensables////////

import NavBar from "./components/NavBar/NavBar";
import Loader from "./components/Loader.js";
import Home from "./views/home/Home";
// import HomeAdmin from "./views/admin/HomeAdmin";
import HomeMaterias from "./views/materias/HomeMaterias";

// servicios
import UrlService from "./services/UrlService";
import DataService from "./services/DataService";
import Auth from "./components/common/router/protected/auth";

///////////////////////////////////
/*Componentes inmediatos*/
import Login from "./views/auth/Login.js";
import Register from "./views/auth/Register.js";
///////////////////////////////////////////////////////************************************************** */
//Componentes No fundamentales////
///// Lazy loading******************************************************************************************************
const HomeAdmin = lazy(() => import("./views/admin/HomeAdmin"));
//
const HomeClases = lazy(() => import("./views/clases/HomeClases"));
// import HomeClases from "./views/clases/HomeClases";
const ViewClases = lazy(() => import("./views/clases/ViewClases"));
// import ViewClases from "./views/clases/ViewClases";
///admin
const EstadisticasResponsable = lazy(() => import("./views/admin/EstadisticasResponsables"));
const EstadisticasAmbiente = lazy(() => import("./views/admin/EstadisticasAmbiente"));
const EstadisticasAdmin = lazy(() => import("./views/admin/EstadisticasAdmin"));
const DatosAdmin = lazy(() => import("./views/admin/DatosAdmin"));
const ClasesAdmin = lazy(() => import("./views/admin/HabiltarClases"));
const CrearResponsable = lazy(() => import("./views/responsables/CrearResponsable"));
///////Clases
const CrearClase = lazy(() => import("./views/clases/crearClase"));
const DetalleClase = lazy(() => import("./views/clases/DetalleClase"));
// const HomeMaterias = lazy(() => import("./views/materias/HomeMaterias"));
const ListaMaterias = lazy(() => import("./views/materias/ListaMaterias"));
const CrearMateria = lazy(() => import("./views/materias/CrearMateria"));
const HabilitarClases = lazy(() => import("./views/admin/HabiltarClases"));
/////////////////
const HomeResponsables = lazy(() => import("./views/responsables/HomeResponsables"));
const ListaResponsables = lazy(() => import("./views/responsables/ListaResponsables"));
const HomeAmbientes = lazy(() => import("./views/ambientes/HomeAmbientes"));
const ListaAmbientes = lazy(() => import("./views/ambientes/ListaAmbientes"));
const CrearAmbiente = lazy(() => import("./views/ambientes/crearAmbiente"));
//---------------------------------------------------------------------------------------------------------------------//
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: {},
      loading: true,
      selectedPeriodo: "",
      selectedTitle: "",
      periodo: "",
      auth: false,
      user: Auth.getUser(),
      semestres: DataSemestres,

      //ordenamos los datos por mencion
      listaSemestres: DataSemestres.reduce(function (r, a) {
        r[a.mencion] = r[a.mencion] || [];
        r[a.mencion].push(a);
        return r;
      }, Object.create(null)),

      ambientes: DataAmbientes,
      //ordenamos los datos por tipo aula /lab
      listaAmbientes: DataAmbientes.reduce(function (r, a) {
        r[a.tipo] = r[a.tipo] || [];
        r[a.tipo].push(a);
        return r;
      }, Object.create(null)),
      materias: DataMaterias,
    };
  }

  async componentDidMount() {
    console.group("montaje")
    // console.log(DataSemestres)
    // console.log(DataAmbientes)
    this.fetchIndex();
    console.log(Auth.getUser())
    this.setState({
      auth: Auth.isAuthenticated(),
      tipo: Auth.getTipo(),
      user: Auth.getUser(),
      url: UrlService.apiUrl(),
      index: DataService.indexData()
    });
    console.groupEnd()
  }
  async fetchIndex() {
    console.group("inicio")
    this.getUser(Auth.getUser())
    axios.get(UrlService.apiUrl() + "index").then((response) => {
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
      console.log("descarga exitosa")
      console.groupEnd()
    });
  }

  async getUser(user) {
    console.group("User")
    var id
    if (user.id !== 1) {
      console.log("user:", user)
      id = user
      // Conseguimos datos del usuario
      axios
        .get(UrlService.apiUrl() + "users/" + id)
        .then((response) => {
          var data = response.data.user
          console.log("Usuario es", data)
          this.setState({ usuario: data });
        });
    }
    else {
      id = user | 1
      console.log("no hay user")

    }
    console.groupEnd()
  }

  async fuente() {
    var a = Auth.isAuthenticated();
    console.log(a);
    return a;
  }
  getTitulo = (titulo) => {
    console.log(titulo)
    this.setState({ selectedTitle: titulo })
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
    /* 
     if (this.state.loading) {
       return <Loader />;
     }
 */
    return (
      <div className="App">
        <BrowserRouter basename="/sishorarios">
          <div className="header">
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
              titulo={this.state.selectedTitle}
              getTitulo={this.getTitulo}
            />
          </div>
          <div className="body">
            {/* <Loader /> */}
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
                  <Suspense fallback={<Loader />}>
                    <ViewClases
                      {...props}
                      index={this.state.index}
                      periodoActual={this.state.periodoActual}
                      periodos={this.state.periodos}
                      ambientes={this.state.ambientes}
                      responsables={this.state.responsables}
                      semestres={this.state.semestres}
                      menciones={this.state.menciones}
                      getTitulo={this.getTitulo}
                    />
                  </Suspense>
                )}
              />

              <Route
                exact
                path="/materia"
                render={(props) => (
                  <Suspense fallback={<Loader />}>
                    <HomeMaterias {...props} datos={this.state.materias} />
                  </Suspense>
                )}
              />
            </div>
            {!Auth.isAuthenticated() &&
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home
                    {...props}
                    semestres={this.state.listaSemestres}
                    ambientes={this.state.listaAmbientes}
                  />
                )}
              />
            }
            {!this.state.loading &&
              <div className="load-complete">
                {Auth.isAuthenticated() && this.state.tipo !== "docente" ? (
                  <div name="rutas">
                    <Route
                      exact
                      path="/"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <HomeAdmin {...props} index={this.state.index} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/responsable"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <HomeResponsables
                            {...props}
                            datos={this.state.responsables}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/responsable/lista"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <ListaResponsables
                            {...props}
                            fetch={this.fetchIndex}
                            datos={this.state.responsables}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/responsable/crear"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <CrearResponsable
                            {...props}
                            datos={this.state.responsables}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/responsable/horario"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <clase {...props} datos={this.state.responsables} />
                        </Suspense>
                      )}
                    />

                    <Route
                      exact
                      path="/ambiente"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <HomeAmbientes {...props} datos={this.state.ambientes} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/ambiente/lista"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <ListaAmbientes {...props} datos={this.state.ambientes} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/ambiente/crear"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <CrearAmbiente {...props} datos={this.state.ambientes} />
                        </Suspense>
                      )}
                    />

                    <Route
                      exact
                      path="/clase"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
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
                        </Suspense>
                      )}
                    />


                    <Route
                      exact
                      path="/clase/crear"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <CrearClase
                            {...props}
                            usuario={this.state.usuario}
                            index={this.state.index}

                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/clase/habilitar"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <HabilitarClases
                            {...props}
                            index={this.state.index}
                            clases={this.state.index.clases}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/clase/detalle"
                      render={(props) =>
                        <Suspense fallback={<Loader />}>
                          <DetalleClase />
                        </Suspense>
                      }
                    />
                    <Route
                      exact
                      path="/materia/lista"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <ListaMaterias {...props} index={this.state.index} datos={this.state.materias} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/materia/crear"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <CrearMateria {...props} datos={this.state.materias} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/admin"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <HomeAdmin {...props} index={this.state.index} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/admin/datos"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <DatosAdmin {...props} index={this.state.index} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/admin/clases"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <ClasesAdmin {...props} clases={this.state.index.clases} />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/stats"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <EstadisticasAdmin />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/stats/ambiente"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <EstadisticasAmbiente />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/stats/responsable"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <EstadisticasResponsable />
                        </Suspense>
                      )}
                    />
                  </div>
                ) : (

                  <div id="print">

                    <Redirect
                      to={{
                        pathname: "/",
                        // search: "?utm=your+face",
                        state: { referrer: "currentLocation" },
                      }}
                    />
                  </div>

                )}
                {this.state.tipo === "docente" &&
                  <div name="rutas_doc">
                    <Route
                      exact
                      path="/clase/crear"
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <CrearClase
                            {...props}
                            usuario={this.state.usuario}
                            index={this.state.index}
                          />
                        </Suspense>
                      )}
                    />
                    <Route
                      exact
                      path="/"
                      render={(props) => (
                        <Home
                          {...props}
                          semestres={this.state.listaSemestres}
                          ambientes={this.state.listaAmbientes}
                        />
                      )}
                    />
                  </div>
                }
              </div>}



          </div>

        </BrowserRouter>

        <div className="footer">
          (c) Sistema de horarios - Desarrollado por <a href="https://joelvega.me">Joel Vega</a>
        </div>
      </div >
    );
  }
}

export default App;
