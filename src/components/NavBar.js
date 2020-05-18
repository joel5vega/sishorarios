import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, HashRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Button, FormControl, NavDropdown, Form } from 'react-bootstrap'
import '../css/estiloNavbar.css'
import mainlogo from '../images/logo.png';
import secondlogo from '../images/logo-canaan.png';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: 'black',
            selected: 'Home',
            imagen: mainlogo,
            colorbtn: 'btn btn-danger my-2 my-sm-0 ',
            semestres: [
                { id: 1, nombre: "Primer Semestre", value: 1 },
                { id: 2, nombre: "Segundo Semestre", value: 2 },
                { id: 3, nombre: "Tercer Semestre", value: 3 },
                { id: 10, nombre: "Septimo Semestre: Control", value: 7, mencion: "control" },
                { id: 11, nombre: "Septimo Semestre: Sistemas", value: 7, mencion: "sistemas" },
                { id: 12, nombre: "Septimo Semestre: Telecomunicaciones", value: 7, mencion: "telecomunicaciones" }

            ],
            aulas: [{ id: 1, nombre: "Aula 304" }, { id: 2, nombre: "Aula 306" }],
            laboratorios: [{ id: 3, nombre: "Labo de Telecomunicaciones" }, { id: 4, nombre: "Labo de Control" }],

            selectedSemestre: "",
            selectedAmbiente: ""


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
                backgroundColor: 'black',
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


    render() {

        const styles = {
            containerStyle: {
                backgroundColor: this.state.backgroundColor,

            }
        };
        const { containerStyle } = styles;

        return (
            <div>
                <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark"  fixed="top">
                    <Nav>
                        <Navbar.Brand href="/">
                            <img src={this.state.imagen} id="logo_header" height='48px' width='111px' alt='commitSRL' />
                            {this.state.selected}
                        </Navbar.Brand>
                    </Nav>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="mr-auto" href="/" >


                            <NavDropdown title="Ambiente" id="collasible-nav-dropdown">

                                <Navbar.Toggle >
                                    {this.state.aulas.map((item) =>

                                        <NavDropdown.Item
                                            key={item.id} value={item.id}
                                            onClick={(e) => this.setState({ selected: item.nombre, selectedAmbiente: item.id })}>
                                            {item.nombre}
                                        </NavDropdown.Item>)}

                                    <NavDropdown.Divider />
                                    {this.state.laboratorios.map((item) =>
                                        <NavDropdown.Item key={item.id} value={item.id}
                                            onClick={(e) => this.setState({ selected: 'Ambiente' + item.id, selectedAmbiente: item.id })}>
                                            {item.nombre}
                                        </NavDropdown.Item>)}
                                </Navbar.Toggle>
                            </NavDropdown>






                            <NavDropdown title="Semestre" id="collasible-nav-dropdown">
                                <Navbar.Toggle>
                                    {this.state.semestres.map((semestre) =>
                                        <NavDropdown.Item key={semestre.id} value={semestre.value}
                                            onClick={(e) => this.setState({ selected: semestre.nombre, selectedAmbiente: semestre.id })}>
                                            {semestre.nombre}
                                        </NavDropdown.Item>)}
                                </Navbar.Toggle>


                            </NavDropdown>
                        </Nav>

                        <Nav>
                            <Nav.Link href="/stuff">Login</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>




        );
    }



}
export default NavBar;