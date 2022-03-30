import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Nav,  NavDropdown } from "react-bootstrap";
import mainlogo from "../../images/logo-UMSA.png";
import AuthService from "../../services/AuthService";
import auth from "../common/router/protected/auth";
import Estudiante from "./NavEstudiante.js";
import NavAdministrativo from "./NavAdministrativo.js";
import NavDocente from "./NavDocente.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faSignInAlt, faTh ,faHouseUser} from '@fortawesome/free-solid-svg-icons'
// import axios from "axios";
import UrlService from "../../services/UrlService";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      key: "home",
      titulo: "Sistema de Horarios",
      imagen: mainlogo,
      colorbtn: "btn btn-danger my-2 my-sm-0 ",
      usuario: this.props.usuario||{ responsable: { id: 0 } },
      fuente: "",
      responsable:"",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }


  componentDidMount() {
    var tipo = this.props.tipo||"estudiante";
    var usuario = this.props.usuario||this.state.usuario;
    var fuente = UrlService.apiUrl()+"clases/responsable/" +usuario.responsable.id +"?periodo=4";
    var responsable= usuario.responsable.titulo +    " " +    usuario.responsable.ap_paterno;
    if (tipo !== "estudiante") {
      this.setState({ tipo: tipo, logged: true });
    }
    if (this.props.usuario) {
      // var titulo= "Horarios de " +    usuario.responsable.titulo +    " " +    usuario.responsable.ap_paterno;
      this.setState({ usuario: this.props.usuario ,fuente:fuente, responsable:responsable});
    }
    else {
      // alert("No hay usuario");
      
      this.getUser("21")
    }
    
    console.group("NavBar");
    console.log("tipo:",tipo);
    console.log("usuario:",this.state.usuario);
    console.groupEnd();
  }

  async getUser(id) {
/*
    const url = UrlService.apiUrl() + "users/" + id;
    try {
      this.setState({ loading: true });
      axios.get(url).then((response) => {
        var data = response.data;
        this.setState({ usuarios: data });
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, loading: false });
    }
    */
    console.group("getUser");
    console.log("id:", id);
    console.log("usuario:", this.state.usuario);
    console.groupEnd();
    // console.log("DDD")
  }
  background() {
    switch (this.props.tipo) {
      case  "estudiante": {
        this.setState({ background: "#40826d" });
        break;
      }
      case "docente": {
        this.setState({ background: "cyan" });
        break;
      }
      case "administrativo": {
        this.setState({ background: "white" });
        break;
      }
      default : {
      this.setState({ background: "#40826d" });
      }
    }
  }
  //Para ver elemento seleccionado
  handleSelect(key) {
    this.setState({
      key: key,
    });
    console.log(`selected ${key}`);
  }

  titulo() {
    return this.state.titulo;
  }

  handleChange = (e) => {
    var name = e.target.name;

    console.log(name);
  };

  logout = () => {
    console.log("NavBar logout");
    auth.logout();
    AuthService.handleLogout();
    this.props.handleAuth();
    this.setState({ tipo: "estudiante", logged: false });
    window.location.reload(false)
  };
  render() {
    const NavActive = {
      color: "#40826d ",
    };

    const { tipo, ambientes, semestres, usuario } = this.props;
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="xl"
          // style={{ backgroundColor: this.state.background }}
          style={{ backgroundColor: "white", maxHeight: 'auto' }}
          // variant="dark"
          fixed="top"

        >
          <Navbar.Brand as={NavLink} exact to="/" activeStyle={NavActive}>
            {/* <FontAwesomeIcon icon={faHouseUser} /> */}
              Horarios ETN
          </Navbar.Brand>
          <div className="b">
            {/* <Navbar.Text style={{ "color": "#40826d", "fontWeight": "bolder", "fontSize": "20px", "whiteSpace": "nowrap" }}>{this.state.titulo}</Navbar.Text> */}
          </div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" ><FontAwesomeIcon icon={faTh} /></Navbar.Toggle>
          {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
          <Navbar.Collapse id="navbarScroll">
            {tipo === "administrativo" ? (
              <div>
                <NavAdministrativo />
              </div>
            ) : tipo === "docente" ? (
              <div>
                <NavDocente usuario={usuario} />
              </div>
            ) : (
              <Estudiante semestres={semestres} ambientes={ambientes} />
            )}
            <Nav
              onSelect={this.handleSelect}
            >

              {tipo === "docente" && (
                <div className="icon justify-content-end ">
                  <Nav.Link
                    as={NavLink}
                    eventKey="mishorarios"
                    to={{
                      pathname: "/clase/view",
                      state: {
                        fuente:
                        this.state.fuente,
                        titulo:
                          this.state.titulo,
                      },

                    }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    Mis Horarios: {this.state.responsable}
                  </Nav.Link>
                </div>
              )}

            </Nav>

            <Nav className="nav justify-content-end ml-auto">
              {!tipo ? (
                <div> 
            <NavDropdown  title={<div><FontAwesomeIcon icon={faUser}/>  Usuario</div>} id="collasible-nav-dropdown">
                 {/* <NavDropdown.Item
                    eventKey="register"
                    as={NavLink}
                    to="/register/"
                    activeStyle={NavActive}
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                    Registrar
                  </NavDropdown.Item> */}
                
                
                
                  <NavDropdown.Item
                    eventKey="login"
                    as={NavLink}
                    to="/login/"
                    activeStyle={NavActive}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Login
                  </NavDropdown.Item>
                </NavDropdown>
                </div>
              ) : (
                <div className="icon">

                  <Nav.Link
                    eventKey="login"
                    as={NavLink}
                    to="/home/"
                    activeStyle={NavActive}
                    onClick={this.logout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />  Salir
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div >
    );
  }
}
export default NavBar;
