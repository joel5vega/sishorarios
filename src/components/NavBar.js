import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, HashRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import { Nav, Button, FormControl, NavDropdown, Form } from 'react-bootstrap'
// import '../css/estiloNavbar.css'
import mainlogo from '../images/logo-UMSA.png';
import secondlogo from '../images/logo-canaan.png';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: 'black',
            titulo: 'Home',
            periodo: '',
            imagen: mainlogo,
            colorbtn: 'btn btn-danger my-2 my-sm-0 ',
            semestres: [
                { id: 1, nombre: "Primer Semestre", value: 1 },
                { id: 2, nombre: "Segundo Semestre", value: 2 },
                { id: 3, nombre: "Tercer Semestre", value: 3 },
                { id: 4, nombre: "Cuarto Semestre", value: 4 },
                { id: 5, nombre: "Quinto Semestre", value: 5 },
                { id: 6, nombre: "Sexto Semestre", value: 6 },
                { id: 7, nombre: "Septimo Semestre: Control", value: 7, mencion: "control" },
                { id: 8, nombre: "Septimo Semestre: Sistemas", value: 7, mencion: "sistemas" },
                { id: 9, nombre: "Septimo Semestre: Telecomunicaciones", value: 7, mencion: "telecomunicaciones" },
                { id: 10, nombre: "Octavo Semestre: Control", value: 8, mencion: "control" },
                { id: 11, nombre: "Octavo Semestre: Sistemas", value: 8, mencion: "sistemas" },
                { id: 12, nombre: "Octavo Semestre: Telecomunicaciones", value: 8, mencion: "telecomunicaciones" },
                { id: 13, nombre: "Noveno Semestre: Control", value: 9, mencion: "control" },
                { id: 14, nombre: "Noveno Semestre: Sistemas", value: 9, mencion: "sistemas" },
                { id: 15, nombre: "Noveno Semestre: Telecomunicaciones", value: 9, mencion: "telecomunicaciones" },
                { id: 16, nombre: "Decimo Semestre: Control", value: 10, mencion: "control" },
                { id: 17, nombre: "Decimo Semestre: Sistemas", value: 10, mencion: "sistemas" },
                { id: 18, nombre: "Decimo Semestre: Telecomunicaciones", value: 10, mencion: "telecomunicaciones" },

            ],
            ambientes: [],
            aulas: [{ id: 1, nombre: "Aula 304" }, { id: 2, nombre: "Aula 306" }],
            laboratorios: [{ id: 3, nombre: "Labo de Telecomunicaciones" }, { id: 4, nombre: "Labo de Control" }],

            selectedSemestre: "",
            selectedAmbiente: ""
        }
        const { handleSelect } = this.props
    }
    //fetch data
    async componentDidMount() {
        const url = "http://127.0.0.1:8000/index?index=ambientes"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ ambientes: data.ambientes, periodo: data.periodo })
        // console.log(data)
    }
    /*
    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }
*/
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

    handleChange = (item) => {
        this.setState({ titulo: item.nombre, selectedAmbiente: item.id, selectedSemestre: "" })
    }
    handleSemestreChange = (item) => {
        this.setState({ titulo: item.nombre, selectedSemestre: item.id, selectedAmbiente: "" })
    }
    render() {

        const styles = {
            containerStyle: {
                backgroundColor: this.state.backgroundColor,

            }
        };
        const { containerStyle } = styles;
        const { handleSelect, handleSemestreSelect } = this.props;
        return (
            <div>
                <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" >
                    <Nav style={{ marginRight: 50 }}>
                        <Navbar.Brand href="/">
                            <img src={this.state.imagen} id="logo_header" height='50px' alt='logo-UMSA' />
                        </Navbar.Brand>
                        <Navbar.Text style={{ marginRight: 5 }}>Sistema de Horarios</Navbar.Text>
                    </Nav>
                    <Nav style={{ marginRight: 50 }}> <Navbar.Text>{this.state.periodo}</Navbar.Text> </Nav>
                    <Nav style={{ marginRight: 50 }}> <Navbar.Text>{this.state.titulo}</Navbar.Text> </Nav>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="r-auto" href="/" >

                            <NavDropdown title="Ambiente" id="collasible-nav-dropdown">
                                <Navbar.Toggle >
                                    {this.state.ambientes.map((item) =>
                                        <NavDropdown.Item
                                            key={item.id} value={item.id}
                                            onClick={() => {
                                                this.handleChange(item)
                                                handleSelect(item.id)
                                            }}>
                                            {item.nombre}
                                        </NavDropdown.Item>)}
                                    <NavDropdown.Divider />
                                    {this.state.laboratorios.map((item) =>
                                        <NavDropdown.Item key={item.id} value={item.id}
                                            onClick={(e) => {
                                                this.handleChange(item)
                                                handleSelect(item.id)
                                            }}>
                                            {item.nombre}
                                        </NavDropdown.Item>)}
                                </Navbar.Toggle>
                            </NavDropdown>
                        

                            <NavDropdown children title="Semestre" id="collasible-nav-dropdown">
                                <Navbar.Toggle>

                                {this.state.semestres.map((semestre) =>
                                    <NavDropdown.Item key={semestre.id} value={semestre.value}
                                        onClick={(e) => {
                                            this.handleSemestreChange(semestre)
                                            handleSemestreSelect(semestre)
                                        }
                                        }

                                    >
                                        {semestre.nombre}
                                    </NavDropdown.Item>)}

                                </Navbar.Toggle>
                            </NavDropdown>




                            <Nav.Link href="/clase/crear">Crear Nueva Clase</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </div>




        );
    }



}
export default NavBar;