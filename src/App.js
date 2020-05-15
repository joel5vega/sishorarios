import React, { Component ,useState} from "react";

import "./App.css";
import Calendario from "./components/Calendario";
import NavItem from "./components/NavItem";
import { BrowserRouter as Router, Route ,NavLink,HashRouter} from 'react-router-dom'
import FetchClases from "./containers/FetchClases";
import Home from "./views/Home";
import Stuff from "./views/Stuff";
const items =[{id:1,value:"aula 1"},{id:2,value:"aula 2"}];

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
    
    return (
      <div className='App'>
        <div className='container' onClick={console.log("cambio")}>
          <NavItem handleSelect={this.handleSelect}/>
        </div>
        
<HashRouter>
<div>
<h1>Simple SPA</h1>

<ul className="header">

  <li><NavLink exact to="/">Home</NavLink></li>

  <li><NavLink to="/stuff">Stuff</NavLink></li>

  <li><a href="/contact">Contact</a></li>

</ul>

<div className="content">
<Route exact path="/" component={Home}/>
<Route path="/stuff" component={Stuff}/>
</div>

</div>
</HashRouter>



        <div>
          <div className='calendario'>
            <FetchClases/>
          {/* <Calendario fuente={this.state.fuente} /> */}
          </div>

        </div>



      </div>

    );
  }
}

export default App;
