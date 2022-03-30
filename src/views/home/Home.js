import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../fontawesome";
import "./home.css";
import ListaSemestres from "../semestres/ListaSemestres";
import TarjetaAmbiente from "../../components/tarjetas/TarjetaAmbiente";
import UrlService from "../../services/UrlService";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: UrlService.apiUrl(),
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
      <div className="home__container">
        <div className="home__columna">
          <h2>Ver horarios por Semestres</h2>
          <ListaSemestres semestres={this.props.semestres} />
        </div>
        <hr></hr>
        <div className="home__columna">
          <h2>Ver horarios por Ambientes</h2>
          {this.props.ambientes.aula.length > 0 &&
            <div className="home__ambientes">
              <div className="ambientes">
                <h5>Aulas</h5>
                <div className="ambiente-tipo">
                  {this.props.ambientes.aula.map((item) => {
                    return (
                      <TarjetaAmbiente
                        id={item.id}
                        nombre={item.nombre}
                        tipo={item.tipo}
                        capacidad={item.capacidad}
                        color={
                          item.tipo === "laboratorio"
                            ? "var(--color-second-1)"
                            : "var(--color-second-2)"
                        }
                      />
                    );
                  })}
                </div>
              </div>
              <div className="ambientes">
                <h5>Laboratorios</h5>
                <div className="ambiente-tipo">
                  {this.props.ambientes.laboratorio.map((item) => {
                    return (
                      <TarjetaAmbiente
                        id={item.id}
                        nombre={item.nombre}
                        tipo={item.tipo}
                        capacidad={item.capacidad}
                        color={
                          item.tipo === "laboratorio"
                            ? "var(--color-second-1)"
                            : "var(--color-second-2)"
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          }

        </div>
      </div>




    );
  }
}

export default Home;
