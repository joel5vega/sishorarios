import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

class NavDocente extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // const { usuario } = this.props;
    return (
      <div>
        <Nav>


          <Nav.Link as={NavLink} exact to="/clase/crear" eventKey="crearClase">
            Crear Clase
          </Nav.Link>


          <Nav.Link as={NavLink} exact to="/materia/" eventKey="curricula">
            Malla curricular
          </Nav.Link>

        </Nav>
      </div >
    );
  }
}
export default NavDocente;
