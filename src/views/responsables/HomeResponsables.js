import React, { Component, Contetxt } from "react";
import ContextProvider from "../../containers/ContextProvider";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";
import TarjetaMateria from "../../components/TarjetaMateria";
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
        <div className="box">
          <div className="tarjetas">
            <div className="tarjetas-titulo">Docentes</div>

            {datos.map((item) => {
              return (
                <div key={item.id}>
                  {item.puesto === "docente" && (
                    <TarjetaMateria
                      nombre={item.nombre + " " + item.ap_paterno}
                      tipo={item.puesto}
                      sigla={item.titulo}
                      size="1rem"
                      enlace={"http://localhost:3000/responsable/" + item.id}
                      color="#0066CC"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="tarjetas">
            <div className="tarjetas-titulo">Auxiliares</div>

            {datos.map((item) => {
              return (
                <div key={item.id}>
                  {item.puesto === "auxiliar" && (
                    <TarjetaMateria
                      nombre={item.nombre + " " + item.ap_paterno}
                      tipo={item.puesto}
                      sigla={item.titulo}
                      enlace={"http://localhost:3000/responsable/" + item.id}
                      color="#00CCFF"
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

HomeResponsables.contextType = ContextProvider;
