import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUniversity, faUserGraduate, faBook, faChartBar } from '@fortawesome/free-solid-svg-icons'
class NavAdministrativo extends Component {
  render() {
    // const background = {
    //   color: "#40826d",
    // };

    // const { tipo, ambientes, usuario, semestres } = this.props;
    return (
      <div>
        <Nav>
          <div className="icon">

            <NavDropdown title={<div><FontAwesomeIcon icon={faCalendar} />Clases</div>} id="collasible-nav-dropdown" >

              <NavDropdown.Item eventKey="clase" as={NavLink} exact to="/clase/">
                Buscar
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item
                eventKey="claseHabilitar"
                as={NavLink}
                exact
                to="/clase/habilitar"
              >
                Habilitar clases
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="claseCrear"
                as={NavLink}
                exact
                to="/clase/crear"
              >
                Crear
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="icon">
            <NavDropdown title={<div><FontAwesomeIcon icon={faUniversity} />Ambiente</div>} id="collasible-nav-dropdown">
              <NavDropdown.Item
                eventKey="ambiente"
                as={NavLink}
                exact
                to="/ambiente/"
              >
                Uso de ambientes
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="ambienteLista"
                as={NavLink}
                exact
                to="/ambiente/lista"
              >
                Listado de ambientes
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="icon">

            <NavDropdown title={<div><FontAwesomeIcon icon={faUserGraduate} />Responsable</div>} id="collasible-nav-dropdown">
              <NavDropdown.Item
                as={NavLink}
                exact
                to="/responsable/"
                eventKey="allResponsables"
              >

                Docentes y Auxiliares
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                exact
                to="/responsable/lista"
                eventKey="listaResponsable"
              >
                Lista de Responsables
              </NavDropdown.Item>

            </NavDropdown>
          </div>
          <div className="icon">

            <NavDropdown title={<div><FontAwesomeIcon icon={faBook} />Materia</div>} id="collasible-nav-dropdown">
              <NavDropdown.Item
                as={NavLink}
                exact
                to="/materia/"
                eventKey="curricula"
              >
                Malla curricular
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                exact
                to="/materia/lista"
                eventKey="listaMateria"
              >
                Lista de Materias
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className="icon">
            <NavDropdown title={<div><FontAwesomeIcon icon={faChartBar} />Estadística</div>} id="collasible-nav-dropdown">
              <NavDropdown.Item
                as={NavLink}
                exact
                to="/stats/ambiente"
                eventKey="statA"
              >
                Ambiente
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                exact
                to="/stats/responsable"
                eventKey="statR"
              >
                Responsable
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>

      </div >
    );
  }
}
export default NavAdministrativo;
