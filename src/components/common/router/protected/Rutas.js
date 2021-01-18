import React, { Component } from "react";
import auth from "./components/common/router/protected/auth";
import Login from "./views/auth/index";
import { Route } from "react-router-dom";

//Rutas
//////////////////////
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

//////////////////////
export default class Rutas extends Component {
  render() {
    return (
      <div>
        if(auth.isAuthenticated())
        {
          <div name="rutas">
            <Route exact path="/login" render={(props) => <Login />} />
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
              path="/responsable/crear"
              render={(props) => (
                <CrearResponsable {...props} datos={this.state.responsables} />
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
        }
        else(
        <Login />) )
      </div>
    );
  }
}
