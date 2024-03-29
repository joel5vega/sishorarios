import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import UrlService from "../../services/UrlService";

export default class HabilitarClases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      api: UrlService.apiUrl(),
      clases: this.props.clases,
    };
  }
  componentDidMount() {
    this.getDatos();
  }
  
  async getDatos() {
    var url = this.state.api + "/clases?estado=false";
    axios.get(url).then((response) => {
      this.setState({ clases: response.data });
    });
  }

  habilitarTodos = () => {
    var url = this.state.api + "/clases/habilitar/0?todos=yes"
    axios.post(url).then((response) => {
      console.log(response)
    },
      (error) => {
        console.log(error);

      })
      window.location.reload(false)
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
          {this.state.clases.length>0?
            <div className="container">
              <ListaCore
                index={this.props.index}
                titulo="Clases"
                datos={this.state.clases}
                tipo="clases"
                keys={keys}
              />
              <div className="sticky">
                <button
                  onClick={this.habilitarTodos}
                  key="habilitar"
                >
                  <FontAwesomeIcon icon={faCheck} />
                  Habilitar todos
                </button>
              </div>

            </div>
          :<h3>No hay clases nuevas</h3>
          }
        </div>
      </div>
    );
  }
}
