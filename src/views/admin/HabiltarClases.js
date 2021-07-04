import React, { Component } from "react";
import ListaCore from "../../components/ListaCore";
import axios from "axios";

import Fab from "@material-ui/core/Fab";
import { Typography } from "@material-ui/core";
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

export default class HabilitarClases extends Component {
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
    //this.getDatos();
  }
  async getDatos() {
    var url = this.state.url + "api/clases?estado=false";
    axios.get(url).then((response) => {
      this.setState({ clases: response.data });
    });
  }

  habilitarTodos = () => {
    var url = this.state.url + "api/clases/habilitar/0?todos=yes"
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
          <div className="sticky">
            <Fab
              onClick={this.habilitarTodos}
              key="habilitar"
              color="default"
              variant="round"
              aria-label="option"
            >
              <AssignmentTurnedInOutlinedIcon />

              <Typography variant="overline" >
                Habilitar todos
              </Typography></Fab>
          </div>
          <ListaCore
            index={this.props.index}
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
