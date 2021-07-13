import React, { Component } from "react";
// import ContextProvider from "../../containers/ContextProvider";
import TarjetaMateria from "../../components/TarjetaMateria";
import { NavLink } from "react-router-dom";
export default class HomeResponsables extends Component {
  componentDidMount() { }
  render() {
    let { datos } = this.props;
    return (
      <div>
        <div className="box">
          <div className="tarjetas">
            <div className="tarjetas-titulo">Docentes</div>
            <div className="cuadricula">
              {datos.map((item) => {
                return (
                  <div key={item.id} className="cuadro">
                    {item.puesto === "docente" && (
                      <NavLink
                        to={{
                          pathname: "/clase/view",
                          state: {
                            fuente:
                              "http://localhost:8000/api/clases/responsable/" +
                              item.id,
                            titulo: "Horarios en " + item.titulo + item.nombre,
                          },
                        }}
                      >
                        <TarjetaMateria
                          tipo={item.nombre + " " + item.ap_paterno}
                          nombre={item.puesto}
                          avatar={item.titulo}
                          size="1rem"
                          enlace={"http://localhost:3000/api/responsable/" + item.id}
                          color="#0066CC"
                        />
                      </NavLink>
                    )}
                  </div>
                );
              })}

            </div>

          </div>
          <div className="tarjetas">
            <div className="tarjetas-titulo">Auxiliares</div>

            {datos.map((item) => {
              return (
                <div key={item.id}>
                  {item.puesto === "auxiliar" && (
                    <TarjetaMateria
                      nombre={item.nombre + " " + item.ap_paterno}
                      tipo={item.puesto}
                      sigla={item.titulo}
                      enlace={"http://localhost:3000/responsable/" + item.id}
                      color="#00CCFF"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}