import React, { Component } from "react";
import MateriasMencion from "./MateriasMencion";
import Sidebar from "../../components/Sidebar";

export default class HomeMaterias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      ancho: "7rem",
      alto: "10rem",
      mencion: "Control",
      semestre: "7",
      titulo: "HOme",
      semestres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  render() {
    var { datos } = this.props;
    var { mencion, titulo, semestre } = this.state;
    return (
      <div>
        <div className="tarjetas-titulo">{titulo}</div>
        <Sidebar />
        <MateriasMencion
          datos={datos}
          titulo={"Materias de " + mencion}
          mencion={mencion}
        />
      </div>
    );
  }
}
