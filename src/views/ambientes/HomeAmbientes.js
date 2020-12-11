import React, { Component } from "react";
import Lista from "../../components/Lista";
import TarjetaAbiente from "../../components/TarjetaAmbiente";
export default class HomeAmbientes extends Component {
  render() {
    var { datos } = this.props;
    // console.log(this.props);

    return (
      <div>
        <h3>Laboratorios</h3>
        <div className="d-flex flex-wrap">
          {datos.map((item) => {
            return (
              <div key={item.id} className="p-2">
                {item.tipo === "laboratorio" && (
                  <TarjetaAbiente
                    nombre={item.nombre}
                    tipo={item.tipo}
                    capacidad={item.capacidad}
                    lugar={item.edificio}
                  />
                )}
              </div>
            );
          })}
        </div>
        <h3>Aulas</h3>
        <div className="d-flex flex-wrap">
          {datos.map((item) => {
            return (
              <div key={item.id} className="p-2">
                {item.tipo === "aula" && (
                  <TarjetaAbiente
                    nombre={item.nombre}
                    tipo={item.tipo}
                    capacidad={item.capacidad}
                    lugar={item.edificio}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
