import React, { Component } from "react";
import TarjetaResponsable from "../../components/tarjetas/TarjetaResponsable";

export default class HomeResponsables extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            <h5>Docentes</h5>
            <div className="tarjetas">
              {datos.map((item) => {
                return (
                  <div key={item.id} >
                    {item.puesto === "docente" && item.puesto && (
                      <TarjetaResponsable
                        nombre={item.ap_paterno}
                        titulo={item.titulo}
                        puesto={item.puesto}
                        id={item.id}
                      />
                    )}
                  </div>
                );
              })}

            </div>

          </div>

          <h5>Auxiliares</h5>
          <div className="tarjetas">
            {datos.map((item) => {
              return (
                <div key={item.id}>
                  {item.puesto === "auxiliar" && (
                    <TarjetaResponsable
                      nombre={item.nombre + " " + item.ap_paterno}
                      puesto={item.puesto}
                      titulo={item.titulo}
                      id={item.id}
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