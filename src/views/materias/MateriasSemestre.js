import React, { Component } from "react";
import TarjetaMateria from "../../components/TarjetaMateria";

export default class MateriasSemestre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      ancho: "5rem",
      // alto: "1rem",
    };
  }

  render() {
    var { datos, semestre, mencion, titulo } = this.props;
    var { ancho, alto } = this.state;
    return (
      <div> 
        <div className="tarjeta-big">
         <div className="tarjetas-titulo">{titulo}</div>
          {datos.map((item) => {
            return (
              <div key={item.id}>
                {item.semestre == semestre && (
                  <div>
                    {item.semestre < 7 ? (
                      <TarjetaMateria
                        tipo={item.nombre}
                        avatar={item.sigla}
                        nombre={item.tipo}
                        ancho={ancho}
                        alto={alto}
                        size="0.7em"
                        color={
                          item.tipo === "laboratorio" ? "#006600" : "#0066CC"
                        }
                        enlace={"http://localhost:3000/responsable/" + item.id}
                      />
                    ) : (
                      item.menciones.length &&
                      item.menciones.map((menciones) => {
                        return (
                          <div key={menciones.nombre}>
                            {menciones.nombre === mencion && (
                              <TarjetaMateria
                                nombre={item.nombre}
                                avatar={item.sigla}
                                tipo={item.tipo}
                                ancho={ancho}
                                alto={alto}
                                size="0.7em"
                                color={
                                  item.tipo === "laboratorio"
                                    ? "#006600"
                                    : "#0066CC"
                                }
                                enlace={
                                  "http://localhost:3000/responsable/" + item.id
                                }
                              />
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
