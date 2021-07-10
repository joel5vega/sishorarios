import { blue } from "@material-ui/core/colors";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TarjetaMateria from "../../components/TarjetaMateria";

export default class ListaSemestres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: this.props.semestres,
    };
  }

  render() {
    const color = { "general": "green", "control": "red", "telecom": "blue", "sistemas": "purple" }
    return (
      <div className="tarjetas">
        <div className="tarjetas-titulo">Ver horarios por Semestres</div>
        {this.props.semestres.length > 0 &&
          this.props.semestres.map((item) => {
            return (
              <div key={item.id}>
                <NavLink
                  to={{
                    pathname: "/clase/view",
                    state: {
                      fuente:
                        "http://localhost:8000/api/clases/semestre/" +
                        item.semestre +
                        "?mencion=" +
                        item.mencion_id,
                      titulo:
                        item.mencion === "general"
                          ? item.semestre + " Semestre "
                          : item.semestre +
                          " Semestre - Mencion:" +
                          item.mencion,
                    },
                  }}
                >
                  <TarjetaMateria
                    avatar={item.semestre}
                    tipo="Semestre"
                    nombre={item.mencion}
                    ancho="1rem"
                    size="0.8rem"
                    color={color[item.mencion]}
                  // accion={this.onClick}
                  />
                </NavLink>
              </div>
            );
          })}
      </div>
    );
  }
}
