import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUniversity, faUserGraduate, faBook, faSignal, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

class NavDocente extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const NavActive = {
      color: "blue",

    };

    const { usuario } = this.props;
    return (
      <div>
        <Nav>
          <div className="icon">
          <FontAwesomeIcon icon={faCalendarPlus} />   
            <Nav.Link as={NavLink} exact to="/clase/crear" eventKey="crearClase">
              Crear Clase
            </Nav.Link>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faBook} />
            <Nav.Link as={NavLink} exact to="/materia/" eventKey="curricula">
              Malla curricular
            </Nav.Link>
          </div>
        </Nav>
      </div >
    );
  }
}
export default NavDocente;
