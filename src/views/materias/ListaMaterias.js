import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";

export default class ListaMaterias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fuente: "fuente original",
      externo: false,
    };
  }
  componentDidMount() {
    this.verificarEntrada();
  }
  verificarEntrada() {
    var estado = this.props.location.state;
    if (estado) {
      console.log(estado);
      this.setState({ fuente: estado.fuente, externo: true });
    } else {
      console.log("no llego");
    }
  }

  render() {
    var { datos } = this.props;
    var keys = ["sigla", "nombre", "semestre", "tipo"];
    return (
      <div>

        <ListaCore
          index={this.props.index}
          datos={datos} tipo="materia"
          titulo="Lista de materias"
          keys={keys} />
        {this.state.externo && <p>LLego</p>}
      </div>
    );
  }
}
