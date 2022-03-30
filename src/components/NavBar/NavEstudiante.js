import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faGraduationCap, faBook } from '@fortawesome/free-solid-svg-icons'
import UrlService from "../../services/UrlService";
class Estudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: UrlService.apiUrl(),
    };
  }
  render() {
    const NavActive = {
      color: "var(--color-primary)",
    };

    const { ambientes } = this.props;


    return (
      <Nav>
        <NavDropdown
          title={"Semestres"}
          id="collasible-nav-dropdown"
          >
          {this.props.semestres.map((item) => {
            return (
              <div key={item.id}>
                <NavDropdown.Item eventKey="semestres"
                  as={NavLink}

                  to={{
                    pathname: "/clase/view",
                    state: {
                      fuente:
                        this.state.url + "clases/semestre/" +
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

        <NavDropdown title={"Ambientes"} id="collasible-nav-dropdown">
          {ambientes.map((item) => (
            <NavDropdown.Item eventKey="ambientes"
              key={item.id}

              as={NavLink}
              to={{
                pathname: "/clase/view",
                state: {
                  fuente:
                    this.state.url + "clases/ambiente/" + item.id,
                  titulo: " " + item.nombre,
                },
              }}
            >
              {item.nombre}
            </NavDropdown.Item>
          ))}
        </NavDropdown>

        <Nav.Link eventKey="materias"
          as={NavLink}

          exact
          to="/materia/"
          activeStyle={NavActive}
        >
          Malla curricular
        </Nav.Link>
      </Nav>
    );
  }
}
export default Estudiante;
