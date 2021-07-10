import axios from "axios";
import React, { Component } from "react";
import EstadisticasAmbiente from "./EstadisticasAmbiente";
import EstadisticasResponsable from "./EstadisticasResponsables";
export default class EstadisticasAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: 'http://127.0.0.1:8000/api/',
      responsable: {},
      ambiente: {}
    };
  }
  componentDidMount() {
    // this.getDatosDocentes();

  }
  // async getDatosDocentes() {
  //   var url = this.state.url + 'datos?tipo=responsable'
  //   try {
  //     axios.get(url).then((response) => {
  //       this.setState({ responsable: response.data.responsable })
  //       // console.log(response.data.responsable)
  //     })
  //   }
  //   catch (e) { console.log(e) }
  // }

  render() {
    var { docente_equivalente } = this.state.responsable;
    return (
      <div>
        <EstadisticasResponsable />
        <br></br>
        {docente_equivalente}
        <br />
        <EstadisticasAmbiente datos={this.state.ambiente} />
      </div>
    );
  }
}
