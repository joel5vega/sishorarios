import React, { Component } from "react";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";

export default class AmbientesLibres extends Component {
  constructor(args) {
    super(args);
    this.state = {
      loading: true,
      libres: [],
      ocupados: [],
    };
  }

  render() {
    return (
      <div>
        <div className="tarjetas">
          <div className="tarjetas-titulo">Aulas</div>
          {this.props.datos.map((item) => (
            <div key={item.id}>
              {item.tipo === "aula" && (
                <TarjetaAmbiente
                  nombre={item.nombre}
                  tipo={item.tipo}
                  capacidad={item.capacidad}
                  color="var(--color-second-2)"
                />
              )}
            </div>
          ))}
          <div className="tarjetas-titulo">Laboratorios</div>
          {this.props.datos.map((item) => (
            <div key={item.id}>
              {item.tipo === "laboratorio" && (
                <TarjetaAmbiente
                  nombre={item.nombre}
                  tipo={item.tipo}
                  capacidad={item.capacidad}
                  color="var(--color-second-1)"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
