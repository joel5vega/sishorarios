import React, { Component } from "react";
import MateriasSemestre from "./MateriasSemestre";

export default class MateriasMencion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
    };
  }

  render() {
    var { semestres, mencion, datos } = this.props;
    return (
      <div className="tarjeta-big">
        {semestres.map((item) => {
          return (
            <div key={item} >
              <MateriasSemestre
                datos={datos}
                semestre={item}
                titulo={item + " Semestre"}
                mencion={mencion}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
