import React, { Component, Contetxt } from "react";
import Lista from "../../components/Lista";
import ContextProvider from "../../containers/ContextProvider";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";
export default class HomeResponsables extends Component {
  componentDidMount() {}
  render() {
    // let data = this.context;
    let { datos } = this.props;

    console.log("----componente home responsables---");
    // console.log(data);
    console.log(datos);
    const styles = {
      container: {
        flex: 1,
        flexItems: 3,
        backgroundColor: "blue",
        alignItems: "center",
        backgroundColor: "orange",
        position: "relative",
        margin: 10,
      },
    };
    return (
      <div>
        <div className="row">
          <div className="col">
            <h3>Docentes</h3>
            <div className="d-flex flex-sm-wrap">
              {datos.map((item) => {
                return (
                  <div key={item.id} className="p-2">
                    {item.puesto === "docente" && (
                      <TarjetaAmbiente
                        nombre={
                          item.titulo +
                          " " +
                          item.nombre +
                          " " +
                          item.ap_paterno
                        }
                        tipo={item.puesto}
                        enlace={"http://localhost:3000/responsable/" + item.id}
                        color="#0066CC"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col">
            <h3>Auxiliares</h3>
            <div className="d-flex flex-sm-wrap">
              {datos.map((item) => {
                return (
                  <div key={item.id} className="p-2">
                    {item.puesto === "auxiliar" && (
                      <TarjetaAmbiente
                        nombre={
                          item.titulo +
                          " " +
                          item.nombre +
                          " " +
                          item.ap_paterno
                        }
                        tipo={item.puesto}
                        accion={item.estado}
                        color="#00CCFF"
                        enlace={"http://localhost:3000/responsable/" + item.id}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomeResponsables.contextType = ContextProvider;
