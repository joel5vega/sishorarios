import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendario from "./components/Calendario";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Ambientes from "./views/ambientes";
import Materias from "./views/materias";
import Responsables from "./views/responsables"
import Clases from "./views/clases"
import CrearClase from "./views/crearClase";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      url:"http://127.0.0.1:8000",
      index: {},

      fuente: "http://127.0.0.1:8000/clases/show",
      selectedPeriodo: "",
      selectedTitle:"Home",
      periodo:""
    }
  }

  async componentDidMount(){
    this.getPeriodo()
    
  }
  async getPeriodo() {
    const urlPeriodo = this.state.url + "/index?index=periodos"
    
    const data = await fetch(urlPeriodo).then(value => value.json())
    // console.log(data)
    var periodo=data.periodo[0].id
    var periodo_nombre=data.periodo[0].nombre
    const fuentePeriodo = this.state.url+"/index?periodo="+periodo;
    this.setState({ selectedPeriodo:periodo, periodo:periodo_nombre ,fuente:fuentePeriodo})
    // this.fuente()
  }
  handlePeriodoSelect = (periodo) => {
    // console.log(evento)
    const fuentePeriodo = this.state.url+"/index?periodo="+periodo.id;
    this.setState({ selectedPeriodo: periodo.id,fuente:fuentePeriodo, periodo:periodo.nombre })
    // this.fuente()
  }
  handleAmbienteSelect = (evento) => {
    console.log(evento)
    var nuevaFuente = "http://127.0.0.1:8000/ambientes/" + evento.id+"?periodo="+this.state.selectedPeriodo;;
    let title = "Ambiente:  "+evento.nombre;
    this.setState({ fuente: nuevaFuente ,selectedTitle: title});
  }

  handleSemestreSelect = (evento) => {
    console.log(evento)
    if (evento != 'undefined') {
      if (evento.value < 7) {
        var nuevaFuente = "http://127.0.0.1:8000/semestres/" + evento.value+"?periodo="+this.state.selectedPeriodo;
        this.setState({ fuente: nuevaFuente })
      }
      else {
        var fuenteDatos = "http://127.0.0.1:8000/semestres/" + evento.value + "?periodo="+this.state.selectedPeriodo+"&mencion=" + evento.mencion;
        this.setState({ fuente: fuenteDatos })
      }
      this.setState({selectedTitle:evento.nombre})
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

        <div className='container'>
          <Router>
            <Route exact path="/" 
            render={(props)=><Home {...props} fuente={this.fuente()} 
            periodo={this.state.periodo} titulo={this.state.selectedTitle}/>}
             />
            <Route path="/crear/clase" component={CrearClase} />
            <Route path="/ambiente" component={Ambientes} />
            <Route path="/materia" component={Materias} />
            <Route path="/responsable" component={Responsables} />
            <Route path="/clase" 
            render={(props)=><Clases {...props} fuente={this.fuente()} 
            periodo={this.state.periodo} titulo={this.state.selectedTitle} />}
            />
          </Router>

        </div>
        <div>
          (c) Sistema de horarios de Ingenieria Electrónica
        </div>
      </div>

    );
  }
}

export default App;
