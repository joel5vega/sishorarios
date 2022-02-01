import React, { Component } from "react";
// import ContextProvider from "../../containers/ContextProvider";
import TarjetaMateria from "../../components/TarjetaMateria";
import { NavLink } from "react-router-dom";
import UrlService from "../../services/UrlService";
export default class HomeResponsables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: UrlService.apiUrl(),
    }
  }
  componentDidMount() {

  }
  render() {
    let { datos } = this.props;
    return (
      <div>
        <div className="">
          <div className="">
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
                              this.state.url + "clases/responsable/" +
                              item.id,
                            titulo: " " + item.titulo + item.nombre,
                          },
                        }}
                      >
                        <TarjetaMateria
                          tipo={item.nombre + " " + item.ap_paterno}
                          nombre={item.puesto}
                          avatar={item.titulo}
                          size="1rem"
                          enlace={this.state.url + "responsable/" + item.id}
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
                      enlace={this.state.url+"responsable/" + item.id}
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