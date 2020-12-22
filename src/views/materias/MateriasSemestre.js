import React, { Component } from "react";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";

export default class MateriasSemestre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      ancho: "7rem",
      alto: "10rem",
    };
  }

  render() {
    var { datos, semestre, titulo } = this.props;
    var { ancho, alto } = this.state;
    return (
      <div className="col">
        materias semestre
        <h3>{titulo}</h3>
        <div className="tarjetas">
          {this.props.datos.map((item) => {
            return (
              <div key={item.id}>
                {item.semestre == semestre && (
                  <div className="tarjeta">
                    <TarjetaAmbiente
                      tipo={item.nombre}
                      nombre={item.sigla}
                      detalle={item.tipo}
                      ancho={ancho}
                      alto={alto}
                      color={
                        item.tipo === "laboratorio" ? "#006600" : "#0066CC"
                      }
                      enlace={"http://localhost:3000/responsable/" + item.id}
                    />
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
