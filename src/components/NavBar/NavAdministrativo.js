import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
class NavAdministrativo extends Component {
  render() {
    const NavActive = {
      color: "blue",
    };

    const { tipo, ambientes, usuario, semestres } = this.props;
    return (
      <div>
        <Nav className="mr-auto">
          <NavDropdown title="Clases" id="collasible-nav-dropdown">
            <NavDropdown.Item eventKey="clase" as={NavLink} exact to="/clase/">
              Buscar
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey="claseView"
              as={NavLink}
              exact
              to="/clase/view"
            >
              Ver Clase
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              eventKey="claseCrear"
              as={NavLink}
              exact
              to="/clase/crear"
            >
              Crear
            </NavDropdown.Item>
          </NavDropdown>
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
            <NavDropdown.Item
              as={NavLink}
              exact
              to={{
                pathname: "/clase/lista",
                state: {
                  selectedBuscar: "responsable",
                },
              }}
              eventKey="horarioResponsable"
            >
              Horario de los Responsables
            </NavDropdown.Item>
          </NavDropdown>

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
        </Nav>
      </div>
    );
  }
}
export default NavAdministrativo;
