import React, { Component } from "react";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";

import axios from "axios";
export default class HomeAmbientes extends Component {
  constructor(args) {
    super(args);
    this.state = {
      loading: true,
      url: "http://127.0.0.1:8000",
      libres: [],
      ocupados: [],
      showLib: true,
      showOcu: true,
      show: true,
    };
  }
  componentDidMount() {
    this.getAmbientes();
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize = () => {
    this.setState({ width: window.innerWidth });

    if (window.innerWidth > 361) {
      this.setState({ show: false, showLib: true, showOcu: true });
      console.log(this.state.width);
    }
  };

  showHandler = () => {
    this.setState((prevState) => ({
      showOcu: !prevState.showOcu,
      showLib: !prevState.showLib,
    }));
  };
  async getAmbientes() {
    axios.get(this.state.url + "/api/now?index=ambientes").then((response) => {
      this.setState({
        ocupados: response.data.ocupados,
        libres: response.data.libres,
        loading: false,
        width: window.innerWidth,
      });
    });
  }

  render() {
    const columna = {
      columnCount: 2,
      columnGap: "3em",
      columnRule: "1px solid #bbb",
      // columnWidth: "400px",
    };
    const categoria = {
      border: "1px solid #bbb",
      borderStyle: "solid",
      borderRadius: "5px",
    };
    var { libres, ocupados, showLib, showOcu, show } = this.state;
    return (
      <div>
        <div className="row">
          {ocupados.length > 0 && (
            <div className="col">
              <div className="row no-gutter">
                <div className="col-auto">
                  <h5>Ambientes Ocupados</h5>
                </div>
                {show && (
                  <div className="col-auto">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      name="showOcu"
                      onClick={this.showHandler}
                    >
                      Ver {showOcu ? "Menos" : "Mas"}
                    </button>
                  </div>
                )}
              </div>

              {showOcu && (
                <div className="d-flex flex-wrap">
                  {ocupados.map((item) => {
                    return (
                      <div key={item.id} className="p-2">
                        <TarjetaAmbiente
                          nombre={item.nombre}
                          tipo={item.tipo}
                          detalle={item.capacidad}
                          color={
                            item.tipo === "laboratorio"
                              ? "#006600"
                              : item.tipo === "auditorio"
                              ? "#ffa500"
                              : "#0066CC"
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {libres.length > 0 && (
            <div className="col">
              <div className="row no-gutter">
                <div className="col-auto">
                  <h5>Ambientes Libres</h5>
                </div>
                {show && (
                  <div className="col-auto">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      name="showOcu"
                      onClick={this.showHandler}
                    >
                      Ver {showLib ? "Menos" : "Mas"}
                    </button>
                  </div>
                )}
              </div>
              {showLib && (
                <div className="d-flex flex-wrap">
                  {libres.map((item) => (
                    <div key={item.id} className="p-2">
                      <TarjetaAmbiente
                        nombre={item.nombre}
                        tipo={item.tipo}
                        detalle={item.capacidad}
                        color={
                          item.tipo === "laboratorio"
                            ? "#006600"
                            : item.tipo === "auditorio"
                            ? "#ffa500"
                            : "#0066CC"
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
