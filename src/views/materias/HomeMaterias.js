import React, { Component } from "react";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";
import MateriasSemestre from "./MateriasSemestre";

export default class HomeMaterias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      ancho: "7rem",
      alto: "10rem",
    };
  }

  render() {
    var { datos } = this.props;
    var { ancho, alto } = this.state;
    return (
      <div>
        <div className="box">
          <MateriasSemestre
            datos={datos}
            semestre='1'
            titulo="Primer Semestre"
          />
          <div className="col">
            <h3>Segundo Semestre</h3>
            <div>
              {datos.map((item) => {
                return (
                  <div key={item.id} className="tarjetas">
                    {item.semestre === "2" && (
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="box">
          <div className="col">
            <h3>Tercer Semestre</h3>
            <div className="tarjeta">
              {datos.map((item) => {
                return (
                  <div key={item.id} className="p-2">
                    {item.semestre === "3" && (
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-auto">
            <h3>Cuarto Semestre</h3>
            <div className="tarjeta">
              {datos.map((item) => {
                return (
                  <div key={item.id} className="p-2">
                    {item.semestre === "" && (
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="box">
          <div className="col">
            <h1>5</h1>
          </div>

          <div className="box">
            <h1>6</h1>
          </div>
        </div>
        <div className="box">
          <h1>7d</h1>
          <div className="col">
            <h2>Control</h2>
          </div>

          <div className="col">
            <h2>Sistemas</h2>
          </div>
          <div className="col">
            <h2>Telecomunicaciones</h2>
          </div>
        </div>
      </div>
    );
  }
}
