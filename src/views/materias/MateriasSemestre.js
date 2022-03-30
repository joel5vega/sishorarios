import React, { Component } from "react";
import TarjetaMateria from "../../components/tarjetas/TarjetaMateria";
import UrlService from "../../services/UrlService";

export default class MateriasSemestre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      ancho: "5rem",
      url: UrlService.apiUrl(),
    };
  }

  render() {
    var { datos, semestre, mencion, titulo } = this.props;
    var { ancho, alto } = this.state;
    return (
      <div><div className="tarjetas-titulo">{titulo}</div>
        <div >
          {datos.map((item) => {
            return (
              <div key={item.id}>
                {item.semestre == semestre && (
                  <div className="pila">
                    {item.semestre < 7 ? (
                      <div className="itemInfo">
                        <TarjetaMateria
                          nombre={item.nombre}
                          sigla={item.sigla}
                          tipo={item.tipo}
                          ancho={ancho}
                          alto={alto}
                          size="0.7em"
                          color={
                            item.tipo === "laboratorio" ? "#006600" : "#0066CC"
                          }
                          enlace={this.state.url+"responsable/" + item.id}
                        />
                      </div>
                    ) : (
                      item.menciones.length &&
                      item.menciones.map((menciones) => {
                        return (
                          <div key={menciones.nombre}>
                            {menciones.nombre === mencion && (
                              <div className="itemInfo">
                              <TarjetaMateria
                                nombre={item.tipo}
                                avatar={item.sigla}
                                tipo={item.nombre}
                                ancho={ancho}
                                alto={alto}
                                size="0.7em"
                                color={
                                  item.tipo === "laboratorio"
                                    ? "#006600"
                                    : "#0066CC"
                                }
                                enlace={
                                  this.state.url+"responsable/" + item.id
                                }
                              />
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
