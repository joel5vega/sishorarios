import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendario from "./components/Calendario";

import NavBar from "./components/NavBar";

import FetchDatos from "./containers/FetchDatos";


import Home from "./views/Home";
import Stuff from "./views/Stuff";
import CrearClase from "./views/crearClase";


const items = [{ id: 1, value: "aula 1" }, { id: 2, value: "aula 2" }];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      index: {},

      fuente: "http://127.0.0.1:8000/clases/show"

    }
  }

  handleSelect = (evento) => {
    console.log(evento)
    var nuevaFuente = "http://127.0.0.1:8000/ambientes/" + evento;
    this.setState({ fuente: nuevaFuente })
  }
  handleSemestreSelect = (evento) => {
    console.log(evento)
    if (evento != 'undefined') {
      if (evento.value < 7) {
        var nuevaFuente = "http://127.0.0.1:8000/semestres/" + evento.value;
        this.setState({ fuente: nuevaFuente })
      }
      else
        //this.changeEvents(evento);
        var fuenteDatos = "http://127.0.0.1:8000/semestres/" + evento.value + "?mencion=" + evento.mencion;
      this.setState({ fuente: fuenteDatos })
    }

  }

  ask = (value) => {
    console.log(value)
  }

  changeEvents = (evento) => {
    console.log("cambio de eventos");
    var nuevaFuente = {
      "id": 1,
      "materia_id": 1,
      "responsable_id": 1,
      "ambiente_id": 1,
      "periodo_id": 1,
      "daysOfWeek": 1,
      "startTime": "11:11",
      "endTime": "12:11",
      "deleted_at": null,
      "created_at": null,
      "updated_at": null,
      "sigla": "FIS 100",
      "nombre": "Aula 304",
      "tipo": "aula",
      "semestre": "1",
      "control": null,
      "telecomunicaciones": null,
      "sistemas": null,
      "requisito": null,
      "pensum": "2000",
      "nivel": "auxiliar",
      "paralelo": "A",
      "ap_paterno": "Vega",
      "ap_materno": "Cruz",
      "puesto": "Ingeniero",
      "titulo": "ING",
      "estado": "titular",
      "gestion": "2020",
      "start_date": "2020-01-01",
      "end_date": "2020-12-12",
      "capacidad": 100,
      "edificio": "1",
      "piso": "75"
    }
    var ejemplo = [{
      groupId: "1",
      title: "Hols",
      startTime: "10:00",
      endTime: "11:00",
      daysOfWeek: [1],
      description: "descripcion",
      sigla: "ETN",
      responsable: "Joel"
    }]
    this.setState({ fuente: ejemplo })
    console.log(ejemplo);
  }




  render() {

    return (
      <div className='App'>
        <div className="container">
          <NavBar handleSelect={this.handleSelect} handleSemestreSelect={this.handleSemestreSelect} />
        </div>

        <div className='home' >
          <Router>
            <Route exact path="/" component={Home} />
            <Route path="/clase/crear" component={CrearClase} />
          </Router>

        </div>




        <div className='container'>
          Datos
          {/* <FetchDatos semestre='7' ask={this.ask} /> */}

          {/* <Calendario fuente={this.state.fuente} titulo="titulo" periodo="I/2020" /> */}
        </div>



      </div>

    );
  }
}

export default App;
