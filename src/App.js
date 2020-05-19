import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendario from "./components/Calendario";
import NavItem from "./components/NavItem";
import NavBar from "./components/NavBar";

import FetchClases from "./containers/FetchClases";


import Home from "./views/Home";
import Stuff from "./views/Stuff";


const items = [{ id: 1, value: "aula 1" }, { id: 2, value: "aula 2" }];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,

      fuente: "http://127.0.0.1:8000/clases/show"

    }
  }

  handleSelect = (evento) => {
    console.log(evento)
    var nuevaFuente = "http://127.0.0.1:8000/ambientes/" + evento;
    this.setState({ fuente: nuevaFuente })
  }



  render() {

    return (
      <div className='App'>

        <div className='home' >
          <Router>
            {/* <NavBar/> */}
            <Route exact path="/" />
            <Route path="/stuff" component={Stuff} />
          </Router>

        </div>

        <div>
          <NavBar handleSelect={this.handleSelect}/>
        </div>


        <div >
          <Calendario fuente={this.state.fuente} />
        </div>

        <div className='container' onClick={console.log("cambio")}>
          <NavItem handleSelect={this.handleSelect} />
        </div>


      </div>

    );
  }
}

export default App;
