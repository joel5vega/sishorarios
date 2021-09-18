import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default class HabilitarClases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      url: "https://sishorarios.azurewebsites.net/public/api/",
      // url: "http://localhost:8000/api/",
      clases: this.props.clases,
    };
  }
  componentDidMount() {
    this.getDatos();
  }
  componentDidUpdate() {
    //this.getDatos();
  }
  async getDatos() {
    var url = this.state.url + "clases?estado=false";
    axios.get(url).then((response) => {
      this.setState({ clases: response.data });
    });
  }

  habilitarTodos = () => {
    var url = this.state.url + "clases/habilitar/0?todos=yes"
    axios.post(url).then((response) => {
      console.log(response)
    },
      (error) => {
        console.log(error);

      })
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
