import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUniversity, faUserGraduate, faBook, faSignal ,faChartBar} from '@fortawesome/free-solid-svg-icons'
import { Font } from "@react-pdf/renderer";
class NavAdministrativo extends Component {
  render() {
    const background = {
      color: "#40826d",
    };

    const { tipo, ambientes, usuario, semestres } = this.props;
    return (
      <div>
        <Nav>
          <div className="icon">
            <FontAwesomeIcon icon={faCalendar} />
            <NavDropdown title="Clases" id="collasible-nav-dropdown" >

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
            <FontAwesomeIcon icon={faUniversity} />

            <NavDropdown title="Ambientes" id="collasible-nav-dropdown">
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
            <FontAwesomeIcon icon={faUserGraduate} />
            <NavDropdown title="Responsables" id="collasible-nav-dropdown">
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
            <FontAwesomeIcon icon={faBook} />
            <NavDropdown title="Materias" id="collasible-nav-dropdown">
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
            <FontAwesomeIcon icon={faChartBar} />

            <NavDropdown title="Estadística" id="collasible-nav-dropdown">
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

      </div>
    );
  }
}
export default NavAdministrativo;
