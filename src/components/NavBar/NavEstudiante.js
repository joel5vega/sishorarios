import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUniversity, faGraduationCap, faBook, faSignal ,faChartBar} from '@fortawesome/free-solid-svg-icons'
import { Font } from "@react-pdf/renderer";
class Estudiante extends Component {
  render() {
    const NavActive = {
      color: "blue",
    };

    const {  ambientes } = this.props;
    return (
      <div>
        <Nav>
          <div className="icon">
            <FontAwesomeIcon icon={faGraduationCap}/>
          
          <NavDropdown title="Semestres" id="collasible-nav-dropdown">
            {this.props.semestres.map((item) => {
              return (
                <div key={item.id}>
                  <NavDropdown.Item
                    as={NavLink}
                    eventKey="semestres"
                    to={{
                      pathname: "/clase/view",
                      state: {
                        fuente:
                          "http://localhost:8000/api/clases/semestre/" +
                          item.semestre +
                          "?mencion=" +
                          item.mencion_id,
                        titulo:
                          item.mencion === "general"
                            ? item.semestre + " Semestre "
                            : item.semestre +
                              " Semestre - Mencion:" +
                              item.mencion,
                      },
                    }}
                  >
                    {item.semestre} {item.mencion}
                  </NavDropdown.Item>
                </div>
              );
            })}
          </NavDropdown>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faUniversity}/>
          <NavDropdown title="Ambientes" id="collasible-nav-dropdown">
            {ambientes.map((item) => (
              <NavDropdown.Item
                key={item.id}
                eventKey="ambientes"
                as={NavLink}
                to={{
                  pathname: "/clase/view",
                  state: {
                    fuente:
                      "http://localhost:8000/api/clases/ambiente/" + item.id,
                    titulo: "Horarios en " + item.nombre,
                  },
                }}
              >
                {item.nombre}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          </div>

          <div className="icon">
            <FontAwesomeIcon icon={faBook}/>
          <Nav.Link
            as={NavLink}
            eventKey="materias"
            exact
            to="/materia/"
            activeStyle={NavActive}
          >
            Malla curricular
          </Nav.Link>
          </div>

        </Nav>
      </div>
    );
  }
}
export default Estudiante;
