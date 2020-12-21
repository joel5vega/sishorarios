import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../fontawesome";
import "../css/home.css";
import Tarjeta from "../components/Tarjeta";

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
  };
  render() {
    const datos = this.props.semestres;

    return (
      <div className="container">
        <h2>Bienvenido {this.state.usuario}</h2>
        {this.props.semestres.length > 0 && (
          <div>
            <h3>Ver horarios por Semestre</h3>
            <NavLink
              to={{
                pathname: "/clase/",
                state: {
                  fuente: this.state.fuente,
                },
              }}
            >
              Tyler McGinnis
            </NavLink>
            <div className="d-flex flex-wrap">
              {this.props.semestres.map((item) => {
                return (
                  <div
                    key={item.id}
                    value={item.id}
                    className="p-2"
                    onClick={() => {
                      this.onClick(item);
                    }}
                  >
                    <NavLink
                      to={{
                        pathname: "/clase/",
                        state: {
                          fuente:
                            "http://localhost:8000/api/clases/semestre/" +
                            item.semestre +
                            "?mencion=" +
                            item.mencion_id,
                        },
                      }}
                    >
                      <Tarjeta
                        titulo={item.semestre}
                        subtitulo={item.mencion}
                        detalle={item.nombre}
                        accion={this.onClick}
                        // enlace={
                        //   "/clase?semestre" +
                        //   item.semestre +
                        //   "&mencion=" +
                        //   item.mencion
                        // }
                      />
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
