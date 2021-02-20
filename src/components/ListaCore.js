import React, { Component } from "react";
import "../css/Lista.css";
import "../fontawesome";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import axios from "axios";
//Plantillas para crear
import CrearResponsable from "../views/responsables/CrearResponsable";
import CrearAmbiente from "../views/ambientes/crearAmbiente";
import CrearMateria from "../views/materias/CrearMateria";
import CrearClase from "../views/clases/crearClase";
import CrearPeriodo from "../containers/crear/crearPensum";
import CrearPensum from "../containers/crear/crearPeriodo";
import CrearMencion from "../containers/crear/crearMencion";
import Register from "../views/auth/Register.js";
import DetalleClase from "../views/clases/DetalleClase";

class ListaCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      url: "http://localhost:8000/",
      dato: {},
      tipo: "",
      show: false,
      showInfo: false,
      guardar: false,
      editar: false,
      selected: {},
      info: {},
      menciones: this.props.datos.menciones,
      pensums: this.props.datos.pensums,
    };
  }

  modal = () => {
    var tipo = this.props.tipo;
    this.setState({
      show: true,
      guardar: true,
      id: "",
      editar: false,
      tipo: tipo,
      selected: {},
    });
    console.log(tipo);
  };
  onHide = () => {
    this.setState({ show: false, showInfo: false });
  };

  onChange = (evento) => {
    console.log("padre");
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    console.log(name + " es: " + value);
  };
  ////////////////////////
  showHabil = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    const id = target.id;
    var tipo = this.props.tipo;

    const response = this.buscar(id);
    console.log(target.name);
    // console.log(response[0]);
    this.setState({
      info: response[0],
      selected:response[0],
      showInfo: true,
      showHabilitado: true,
      // selected: { ...this.state.selected, [name]: value },
      idClase: id,
    });
  };
  buscar(id) {
    var dato = this.props.datos.filter((e) => e.id == id);
    return dato;
  }
  habilitar = (event) => {
    event.preventDefault();
    var id = this.state.idClase;
    console.log(id);
    let urlPost = this.state.url + "api/clases/habilitar/" + id;
    axios
      .post(urlPost)
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
      .then(console.log("evento habilitado"));
    this.setState({ showInfo: false });
    this.props.history.push("/admin/clases");
  };
  selectHabilitar(e) {
    // console.log("tipo: " + e);
    switch (e) {
      case "clases":
        return <DetalleClase clase={this.state.info} />;
      case "users":
        return <DetalleClase clase={this.state.selected} />;

      default:
        return <p>Envie el modo</p>;
    }
  }
  /////////
  editar(e) {
    this.setState({
      show: true,
      dato: e,
      editar: true,
      guardar: false,
      selected: e,
    });
    console.log("editar en lista");
    console.log(e);
  }

  // Crud
  guardar = (e) => {
    console.log("guardar");
    console.log(this.state.selected);
  };
  eliminar(e) {
    console.log("eliminar: " + e);
    console.log(this.state.tipo);
  }
  ///////////////////////////
  //end of CRUD
  ///////////////////////////
  selectCrear(e) {
    // console.log("tipo: " + e);
    switch (e) {
      case "ambiente":
        return (
          <CrearAmbiente datos={this.state.selected} onChange={this.onChange} />
        );

      case "responsable":
        return (
          <CrearResponsable
            selected={this.state.selected}
            onChange={this.onChange}
          />
          // <CrearResponsable {...this.state.selected} onChange={this.onChange} />
        );

      case "materia":
        return (
          <CrearMateria
            datos={this.state.selected}
            menciones={this.state.menciones}
            pensums={this.state.pensums}
            onChange={this.onChange}
          />
        );

      case "clase":
        return <CrearClase />;
      case "periodo":
        return (
          <CrearPeriodo datos={this.state.selected} onChange={this.onChange} />
        );
      case "pensum":
        return (
          <CrearPensum datos={this.state.selected} onChange={this.onChange} />
        );
      case "mencion":
        return (
          <CrearMencion datos={this.state.selected} onChange={this.onChange} />
        );

      case "users":
        return (
          <Register
            datos={this.state.selected}
            responsables={this.props.responsables}
            onChange={this.onChange}
          />
        );

      default:
        return <p>Envie el modo</p>;
    }
  }
  ///manejador de cambios
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    console.log(name);
    console.log(value);
  }

  render() {
    const { titulo } = this.props;
    var info = this.state.info;
    // console.log(datos)
    // const keys = Object.keys(datos[0]);
    const { keys } = this.props;
    // console.log(keys);
    return (
      <div>
        <div className="container-lg">
          <div className="table-wrapper">
            <div className="table-title">
              <h1 className="col-auto">{titulo}</h1>
              <button
                type="button"
                className="btn btn-info add-new col-auto"
                onClick={this.modal}
              >
                <FontAwesomeIcon icon={"plus"} size="1x" />{" "}
                <small>Crear Nuevo</small>
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  {keys.map((key) => {
                    if (key === "id") {
                    } else {
                      return <th key={key}>{key.toUpperCase()}</th>;
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {this.props.datos.map((item) => (
                  <tr key={item.id}>
                    {keys.map((campo) => {
                      if (campo === "id") {
                      } else {
                        if (campo === "estado") {
                          return (
                            <td key={item.id + campo}>
                              <input
                                name={item.tipo}
                                id={item.id}
                                onChange={this.showHabil}
                                type="checkbox"
                                checked={item[campo] === "true"}
                              />
                              {item[campo]}
                            </td>
                          );
                        } else {
                          return <td key={item.id + campo}>{item[campo]}</td>;
                        }
                      }
                    })}
                    <td>
                      <div
                        type="button"
                        href="#"
                        className="col-auto"
                        onClick={() => this.editar(item)}
                      >
                        <FontAwesomeIcon icon={"edit"} />
                      </div>
                      <span
                        type="button"
                        href="#"
                        className="col-auto"
                        onClick={() => this.eliminar(item.id)}
                      >
                        <FontAwesomeIcon icon={"trash"} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="crear">
          <Modal
            show={this.state.show}
            onHide={this.onHide}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <form onSubmit={this.guardar}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {this.props.titulo}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="show-grid">
                {this.selectCrear(this.props.tipo)}
              </Modal.Body>
              <Modal.Footer>
                {this.state.guardar && (
                  <Button onClick={this.guardar}>Guardar</Button>
                )}
                {this.state.editar && (
                  <Button
                    // type="submit"
                    onClick={this.guardar}
                  >
                    Actualizar
                  </Button>
                )}
                <Button onClick={this.onHide}>Cancelar</Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>

        <div id="info">
          <Modal
            show={this.state.showInfo}
            onHide={this.onHide}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Modal.Header style={{ backgroundColor: info.color }}>
              <Modal.Title
                id="contained-modal-title-vcenter"
                style={{ color: "white" }}
              >
                {info.tipo}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              {this.selectHabilitar(this.props.tipo)}
            </Modal.Body>
            <Modal.Footer>
              {this.state.showHabilitado && (
                <Button onClick={this.habilitar}>Habilitar Clase</Button>
              )}

              <Button onClick={this.onHide}>Cancelar</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
export default withRouter(ListaCore);
