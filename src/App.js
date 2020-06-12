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
      url:"http://127.0.0.1:8000",
      index: {},

      fuente: "http://127.0.0.1:8000/clases/show",
      selectedPeriodo: ""
    }
  }

  async componentDidMount(){
    this.getPeriodo()
    
  }
  async getPeriodo() {
    const urlPeriodo = this.state.url + "/index?index=periodos"
    
    const data = await fetch(urlPeriodo).then(value => value.json())
    console.log(data)
    var periodo=data.periodo[0].id
    const fuentePeriodo = this.state.url+"/index?periodo="+periodo;
    this.setState({ selectedPeriodo:periodo ,fuente:fuentePeriodo})
    // this.fuente()
  }
  handlePeriodoSelect = (periodo) => {
    // console.log(evento)
    const fuentePeriodo = this.state.url+"/index?periodo="+periodo;
    this.setState({ selectedPeriodo: periodo,fuente:fuentePeriodo })
    // this.fuente()
  }
  handleAmbienteSelect = (evento) => {
    console.log(evento)
    var nuevaFuente = "http://127.0.0.1:8000/ambientes/" + evento+"?periodo="+this.state.selectedPeriodo;;
    this.setState({ fuente: nuevaFuente })
  }

  handleSemestreSelect = (evento) => {
    console.log(evento.value)
    if (evento != 'undefined') {
      if (evento.value < 7) {
        var nuevaFuente = "http://127.0.0.1:8000/semestres/" + evento.value+"?periodo="+this.state.selectedPeriodo;
        this.setState({ fuente: nuevaFuente })
      }
      else {
        var fuenteDatos = "http://127.0.0.1:8000/semestres/" + evento.value + "?periodo="+this.state.selectedPeriodo+"&mencion=" + evento.mencion;
        this.setState({ fuente: fuenteDatos })
      }
    }
    // console.log("fuente es : " + this.state.fuente)
    // this.fuente()
  }

  fuente(){
    return this.state.fuente
  }




  render() {

    return (
      <div className='App'>
        <div className="container">
          <NavBar handleAmbienteSelect={this.handleAmbienteSelect} handleSemestreSelect={this.handleSemestreSelect} handlePeriodoSelect={this.handlePeriodoSelect} />
        </div>

        <div className='home' >
          <Router>
            <Route exact path="/" 
            render={(props)=><Home {...props} fuente={this.fuente()}/>}
             />
            <Route path="/clase/crear" component={CrearClase} />
          </Router>

        </div>




        <div className='container'>
          Datos
          {/* <FetchDatos semestre='7' ask={this.ask} /> */}

          {/* <Calendario fuente={this.state.fuente}/> */}
        </div>



      </div>

    );
  }
}

export default App;
