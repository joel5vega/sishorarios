import React, { Component ,useState} from "react";

import "./App.css";
import EventCalendar from "./components/EventCalendar";
import Calendario from "./components/Calendario";
import NavItem from "./components/NavItem";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dropdown from "./components/Dropdown";
//import Menu from "./components/menu";
const items =[{id:1,value:"aula 1"},{id:2,value:"aula 2"}];
// let fuentes="http://127.0.0.1:8000/clases/show";
// const calendario=
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      
      fuente: "http://127.0.0.1:8000/clases/show"
      
    }
  }
  handleSelect=(evento)=>{
    console.log(evento)
    var nuevaFuente = "http://127.0.0.1:8000/ambientes/"+evento;
    this.setState({fuente:nuevaFuente})
  }

 

  render() {
    console.log(this.state.fuente);
    console.log(items)
    
    return (

      <div className='App'>
        <div className='container' onClick={console.log("cambio")}>
          {/* <Dropdown title="Titulo" items={items} handleSelect={this.handleSelect}/> */}
          <NavItem handleSelect={this.handleSelect}/>
        </div>
        <div>
          <div className='calendario'>
          <Calendario fuente={this.state.fuente} />
          </div>

        </div>



      </div>

    );
  }
}

export default App;
