import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,NavLink,HashRouter} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import {Nav,Button,FormControl,NavDropdown,Form} from 'react-bootstrap'
import '../css/estiloNavbar.css'
import mainlogo from '../images/logo.png';
import secondlogo from '../images/logo-canaan.png';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: 'transparent',
            imagen: mainlogo,
            colorbtn: 'btn btn-danger my-2 my-sm-0 ',
            semestres:[
                {id:1,nombre:"Primer Semestre",value:1},
                {id:2,nombre:"Segundo Semestre",value:2},
                {id:3,nombre:"Tercer Semestre",value:3},
                {id:10,nombre:"Septimo Semestre: Control",value:7,mencion:"control"},
                {id:11,nombre:"Septimo Semestre: Sistemas",value:7,mencion:"sistemas"},
                {id:12,nombre:"Septimo Semestre: Telecomunicaciones",value:7,mencion:"telecomunicaciones"}
                
            ],
            aulas:[{id:1,nombre:"Aula 304"},{id:2,nombre:"Aula 306"}],
            laboratorios:[{id:3, nombre:"Labo de Telecomunicaciones"},{id:4, nombre:"Labo de Control"}],

            selectedSemestre:"",
            selectedAmbiente:""

             
        }
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        let scrollTop = window.scrollY;
        // itemTranslate = Math.min(0, scrollTop/3 - 60);
        if (scrollTop > 60) {
            this.setState({
                backgroundColor: 'white',
                imagen: secondlogo,
                colorbtn: 'btn btn-outline-danger my-2 my-sm-0 '

            });


        }
        else {
            this.setState({
                backgroundColor: 'transparent',
                imagen: mainlogo,
                colorbtn: 'btn btn-danger my-2 my-sm-0 '
            });

        }

    }


/*
<div>
<h1>NavBar</h1>

<header className="header">
<nav className="navbar navbar-expand-lg navbar-light text-light fixed-top" style={containerStyle}>

  <NavLink exact to="/">
  <img src={this.state.imagen} id="logo_header" height='48px' width='111px' alt='commitSRL'></img>
  </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     <span className="navbar-toggler-icon"></span>
    </button>
    <ul className="navbar-nav m-auto">
                            <NavLink to="/" className="nav-link">
                                <li className="nav-item active">
                                    Home
                                </li>
                            </NavLink>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/semestre" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Semestre
                                </a>
                                <div className="dropdown-menu px-1" aria-labelledby="navbarDropdown">
                                    <NavLink to="/Stuff" className="nav-link text-dark bg-light">
                                        Stuff
                                    </NavLink>
                                    <NavLink to="/contact" className="nav-link text-dark bg-light">
                                        Contact
                                    </NavLink>
                                </div>
                            </li>
                            
                           
                            
                            
                        </ul>
                        
  
</nav>
</header>


</div>
*/    
    render() {

        const styles = {
            containerStyle: {
                backgroundColor: this.state.backgroundColor,

            }
        };
        const { containerStyle } = styles;

        return (
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Nav>
                <Navbar.Brand href="/">
                <img src={this.state.imagen} id="logo_header" height='48px' width='111px' alt='commitSRL'/>
                    React-Bootstrap
                </Navbar.Brand>
            </Nav>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto" href="/" eventKey={1}>
                
               
                <NavDropdown title="Ambiente" id="collasible-nav-dropdown"
                // onChange={(e)=>this.setState({selectedAmbiente:e.target.value})}>
                onSelect={console.log("cambiara")}>    
                {this.state.aulas.map((item)=>
                    <NavDropdown.Item 
                    key={item.id} value={item.id} onSelect={console.log("seleccionado")}>
                        {item.nombre} 
                    </NavDropdown.Item>)}   
                    <NavDropdown.Divider/>
                    {this.state.laboratorios.map((item)=>
                    <NavDropdown.Item href="stuff" key={item.id} value={item.id}>
                        {item.nombre}
                    </NavDropdown.Item>)} 
                </NavDropdown>

                
                <NavDropdown title="Semestre" id="collasible-nav-dropdown">
                {this.state.semestres.map((semestre)=>
                    <NavDropdown.Item href="stuff" key={semestre.id} value={semestre.value}>
                        {semestre.nombre}
                    </NavDropdown.Item>)}   
                </NavDropdown>
                </Nav>
                
                <Nav>
                <Nav.Link href="#deets">Login</Nav.Link>
                
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            </div>




            );
    }



}
export default NavBar;