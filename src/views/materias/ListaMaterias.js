import React, { Component } from "react";

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
    return (
      <div>
        Lista Materi
        {this.state.externo && <p>LLego</p>}
        <h1>{this.state.fuente}</h1>
      </div>
    );
  }
}
