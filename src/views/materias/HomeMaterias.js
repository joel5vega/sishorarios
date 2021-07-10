import React, { Component } from "react";
import MateriasMencion from "./MateriasMencion";
import TabPanel from "../../components/Tabs";
import MateriasSemestre from "./MateriasSemestre";
export default class HomeMaterias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      ancho: "7rem",
      alto: "10rem",
      mencion: "Control",
      semestre: "7",
      titulo: "",
      semestres: [ 7, 8, 9, 10],
      general: [1, 2, 3, 4, 5, 6]
    };
  }

  render() {
    var { datos } = this.props;
    var { general,semestres } = this.state
    // var { mencion, titulo, semestre } = this.state;
    return (
      <div>
        <div >
        <MateriasMencion
              datos={datos}
              titulo={"Materias de Control "}
              mencion="Control"
              semestres={general}
            />
        </div>

        <TabPanel
          label01="Materias Mencion Control"
          label02="Materias Mencion Sistemas"
          label03="Materias Mencion Telecomunicaciones"
          item01={
            <MateriasMencion
              datos={datos}
              titulo={"Materias de Control "}
              mencion="Control"
              semestres={semestres}
            />
          }
          item02={
            <MateriasMencion
              datos={datos}
              titulo={"Materias de Sistemas "}
              mencion="Sistemas"
              semestres={semestres}
            />
          }
          item03={
            <MateriasMencion
              datos={datos}
              titulo={"Materias de Telecomunicaciones "}
              mencion="Telecom."
              semestres={semestres}
            />
          }
        />
      </div>
    );
  }
}
