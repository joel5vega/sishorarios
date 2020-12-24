import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../fontawesome";
import "../css/home.css";
import ListaSemestres from "../views/semestres/ListaSemestres";
import TarjetaAmbiente from "../components/TarjetaAmbiente";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      datos: this.props.semestres,
      fuente: "",
    };
  }
  componentDidMount() {}

  onClick = (e) => {
    //elaboramos la fuente de consulta
    const url = "http://localhost:8000/";
    var fuente =
      url + "api/clases/semestre/" + e.semestre + "?mencion=" + e.mencion_id;
    console.log(fuente);
    this.setState({ fuente: fuente });

    // agregar esto
    /*
    onClick={() => {
      this.onClick(item);
    }}
    */
  };
  render() {
    const datos = this.props.semestres;

    return (
      <div>
        <h2>
          Bienvenido al Sistema de Administración de horarios
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
                            pathname: "/clase/lista",
                            state: {
                              fuente:
                                "http://localhost:8000/api/clases/ambiente/" +
                                item.id,

                              titulo:"Horarios en "+item.nombre,
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
