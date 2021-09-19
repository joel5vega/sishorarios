import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUniversity, faGraduationCap, faBook, faSignal, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { Font } from "@react-pdf/renderer";
class Estudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://sishorarios.azurewebsites.net/public/api/",
      //url: "http://127.0.0.1:8000/api/",
    };
  }
  render() {
    const NavActive = {
      color: "blue",
    };

    const { ambientes } = this.props;
    return (
      <div>
        <Nav style={{ maxHeight: '400px' }}>
          {/* // navbarScroll> */}
          <div className="icon">

            <NavDropdown
              title={<div><FontAwesomeIcon icon={faGraduationCap} />Semestres</div>}
              id="navbarScrollingDropdown">
              {this.props.semestres.map((item) => {
                return (
                  <div className="opcion" key={item.id}>
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
          </div>
          <div className="icon">

            <NavDropdown title={<div><FontAwesomeIcon icon={faUniversity} />Ambientes</div>} id="collasible-nav-dropdown">
              {ambientes.map((item) => (
                <NavDropdown.Item eventKey="ambientes"
                  key={item.id}

                  as={NavLink}
                  to={{
                    pathname: "/clase/view",
                    state: {
                      fuente:
                        this.state.url+"clases/ambiente/" + item.id,
                      titulo: " " + item.nombre,
                    },
                  }}
                >
                  {item.nombre}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </div>

          <div className="icon">

            <Nav.Link eventKey="materias"
              as={NavLink}

              exact
              to="/materia/"
              activeStyle={NavActive}
            >
              <FontAwesomeIcon icon={faBook} />  Malla curricular
            </Nav.Link>
          </div>

        </Nav>
      </div>
    );
  }
}
export default Estudiante;
