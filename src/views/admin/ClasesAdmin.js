import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";
import axios from "axios";
export default class ClasesAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: "http://localhost:8000/",
      clases: this.props.clases,
    };
  }
  componentDidMount() {
    this.getDatos();
  }
  componentDidUpdate() {
    this.getDatos();
  }
  async getDatos() {
    var url = this.state.url + "api/clases?estado=false";
    axios.get(url).then((response) => {
      this.setState({ clases: response.data });
    });
  }
  render() {
    const keys = [
      "estado",
      "title",
      "semestre",
      "nivel",
      "paralelo",
      "responsable",
      "ambiente",
      "daysOfWeek",
      "startTime",
      "endTime",
      "periodo",
    ];
    return (
      <div>
        <div>
          <ListaCore
            titulo="Clases"
            datos={this.state.clases}
            tipo="clases"
            keys={keys}
          />
        </div>
      </div>
    );
  }
}
