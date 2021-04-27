import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
class NavDocente extends Component {
  render() {
    const NavActive = {
      color: "blue",
    };

    const { usuario } = this.props;
    return (
      <div>
        <Nav>
                  <Nav.Link
                    as={NavLink}
                    eventKey="mishorarios"
                    to={{
                      pathname: "/clase/view",
                      state: {
                        fuente:
                          "http://localhost:8000/api/clases/responsable/" +
                           usuario.responsable.id +
                          "?periodo=4",
                        titulo:
                          "Horarios de " +
                          usuario.responsable.titulo +
                          " " +
                          usuario.responsable.ap_paterno,
                      },
                    }}
                  >
                    Mis horarios
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/clase/crear"
                    eventKey="crearClase"
                  >
                    Crear Clase
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/materia/"
                    eventKey="curricula"
                  >
                    Malla curricular
                  </Nav.Link>
                </Nav>
        ;
      </div>
    );
  }
}
export default NavDocente;
