import React, { Component } from "react";
import MateriasSemestre from "./MateriasSemestre";

export default class MateriasMencion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      semestres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  render() {
    var { semestres } = this.state;
    var { mencion, datos } = this.props;
    return (
      <div>
        {semestres.map((item) => {
          return (
            <div key={item} className="tarjeta-big">
              <MateriasSemestre
                datos={datos}
                semestre={item}
                titulo={item + " Semestre - Mención: " + mencion}
                mencion={mencion}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
