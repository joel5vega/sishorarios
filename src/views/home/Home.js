import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../fontawesome";
import "../../css/home.css";
import ListaSemestres from "../semestres/ListaSemestres";
import TarjetaAmbiente from "../../components/TarjetaAmbiente";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://sishorarios.azurewebsites.net/public/api/",
      // url : "http://localhost:8000/api/",
      usuario: "",
      datos: this.props.semestres,
      fuente: "",
    };
  }
  componentDidMount() { }

  onClick = (e) => {
    //elaboramos la fuente de consulta
    var fuente =
      this.state.url + "clases/semestre/" + e.semestre + "?mencion=" + e.mencion_id;
    console.log(fuente);
    this.setState({ fuente: fuente });
  };
  render() {
    return (
      <div>
        <h2>
          {/* Bienvenido al Sistema de Administración de horarios */}
          {this.state.usuario}
        </h2>
        <div className="row flex">
          <div className="col">
            <div className="tarjetas-titulo">Ver horarios por Ambientes</div>
            <div className="tarjetas">
              {this.props.ambientes.length > 0
                ? this.props.ambientes.map((item) => {
                  return (
                    <div key={item.id}>
                      <NavLink
                        to={{
                          pathname: "/clase/view",
                          state: {
                            fuente:
                              this.state.url +
                              "clases/ambiente/" +
                              item.id,
                            titulo: "" + item.nombre,
                          },
                        }}
                      >
                        <TarjetaAmbiente
                          nombre={item.nombre}
                          tipo={item.tipo}
                          capacidad={item.capacidad}
                          color={
                            item.tipo === "laboratorio"
                              ? "#006600"
                              : item.tipo === "auditorio"
                                ? "#ffa500"
                                : "#0066CC"
                          }
                        />
                      </NavLink>
                    </div>
                  );
                })
                : "No existen registros de ambientes ocupados en este momento"}
            </div>
          </div>

          <div className="col">
            <ListaSemestres semestres={this.props.semestres} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
