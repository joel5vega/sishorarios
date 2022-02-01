import React, { Component } from "react";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";
import UrlService from "../../services/UrlService";

export default class AmbientesLibres extends Component {
  constructor(args) {
    super(args);
    this.state = {
      loading: true,
      url: UrlService.apiUrl(),
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
                  color="#0066CC"
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
                  color="#006600"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
