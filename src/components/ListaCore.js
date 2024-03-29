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
import CrearPensum from "../containers/crear/crearPensum";
import CrearPeriodo from "../containers/crear/crearPeriodo";
import CrearMencion from "../containers/crear/crearMencion";
import Register from "../views/auth/Register.js";
import DetalleClase from "../views/clases/DetalleClase";
import DetalleUser from "../views/auth/DetalleUser";

import UrlService from "../services/UrlService";

class ListaCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      dato: {},
      tipo: "",
      urlpub: "",
      show: false,
      showInfo: false,
      guardar: false,
      editar: false,
      selected: {},
      info: { color: "green" },
      api: UrlService.apiUrl(), 
    };
  }
  componentDidMount() {
    if (this.props.index) {
      this.setState({
        menciones: this.props.index.menciones,
        pensums: this.props.index.pensums,
        api: UrlService.apiUrl(),
      })
    }
    console.group("Lista")
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
    console.log("modal tipo:", tipo);
    console.log(this.state.selected)
    this.setState({ info: { tipo: tipo }})
  };
  onHide = () => {
    this.setState({ show: false, showInfo: false });
  };
  /////////////RECIBIR DATOS DE FORMULARIOS
  onChange = (evento) => {
    console.log("padre");
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    console.log(name + " es: " + value);
    console.log(this.state.selected)
  };
  onCheckChange = (event) => {
    const { name, checked } = event.target
    this.setState({
      selected: {
        ...this.state.selected,
        ["menciones"]: {
          ...this.state.selected.menciones,
          [name]: checked,
        }
      },
    })
  }
  ////////////////////////
  showHabil = (e) => {
    const target = e.target;
    const id = target.id;
    var tipo = this.props.tipo;
    console.log(id);

    const response = this.buscar(id);
    
    // console.log(response);

    this.setState({
      info: response,
      selected: response,
      showInfo: true,
      showHabilitado: true,
      // selected: { ...this.state.selected, [name]: value },
      idClase: id,
    });
    
  };
  buscar(id) {
    var dato = this.props.datos.filter((e) => e.id == id);
    return dato[0];
  }
  habilitar = (event) => {
    event.preventDefault();
    var id = this.state.idClase;
    // console.log(id);
    var urlPost
    if (this.props.tipo === "users") {
      urlPost = this.state.api + "/users/habilitar/" + id;
    } else {
      urlPost = this.state.api + "/clases/habilitar/" + id;
    }
    axios
      .post(urlPost)
      .then(
        (response) => {
          // console.log(response);
          alert("Habilitado")
          console.log(response.request.response)
        },
        (error) => {
          "No se pudo habilitar"
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
        return <DetalleUser clase={this.state.selected} />;

      default:
        return <p>Envie el modo</p>;
    }
  }
  /////////
  editar = (e) => {
    this.setState({
      show: true,
      dato: e,
      editar: true,
      guardar: false,
      selected: e,
    });
    if (this.props.tipo === "materia") {
      var mencionesSeleccionadas = this.checkMenciones(e.menciones)
      this.setState({
        selected: { ...e, menciones: mencionesSeleccionadas }
      })
    }
    console.log("editar en " + this.props.tipo,e);
    // console.log(e);
    /// Enviar para editar
    /// obtener url
    var url = this.url(this.props.tipo) + e.id
    this.setState({ urlpub: url })
    console.log("URL es", url)

  }
  checkMenciones = (menciones) => {
    var mencionesSeleccionadas = {}
    var keys = Object.keys(menciones);
    keys.map((mencion) => {
      var tag = menciones[mencion].id;
      mencionesSeleccionadas = { ...mencionesSeleccionadas, [tag]: true }
    })
    return (mencionesSeleccionadas)
  }
  // Crud
  guardar = () => {
    let tipo = this.props.tipo;
    console.log("guardar " + tipo);
    var url
    if (this.state.editar) {
      url = this.state.urlpub
      console.log("editar " + tipo + " en " + url);
      this.put(url, this.state.selected);
    } else {
      url = this.url(tipo);
      console.log("guardar " + tipo + " en " + url);
      this.post(url, this.state.selected);
    }
    console.log(this.state.selected);
  };
  url = (tipo) => {
    var url
    switch (tipo) {
      case "responsable":
        {
          url = this.state.api + "/responsables/";
          break;
        }
      case "materia":
        {
          url = this.state.api + "/materias/";
          break;
        }
      case "clases":
        {
          url = this.state.api + "/clases/"
          break;
        }
      case "periodo":
        {
          url = this.state.api + "/periodos/"
          break;
        }
      case "ambiente":
        {
          url = this.state.api + "/ambientes/"
          break;
        }
      case "users":
        {
          url = this.state.api + "/users/"
          break;
        }
      default:
    }
    return url;
  };

  put = (urlPut, dato) => {
    axios
      .put(urlPut, dato)
      .then(
        (response) => {
          console.log(response);
          alert("Actualizado");
          window.location.reload(false)
        },
        (error) => {
          alert("Error al actualizar");
          console.log(error);
        }
      )
      .then(this.limpiarForm());
  };
  post = (urlPost, dato) => {
    axios
      .post(urlPost, dato)
      .then(
        (response) => {
          console.log(response);
          alert("Guardado");
          window.location.reload(false)
        },
        (error) => {
          alert("Error al guardar");
          console.log(error);
        }
      )
      // .then(this.limpiarForm());
  };
  // Limpiar formulario
  limpiarForm() {
    this.setState({
      selected: {},
      show: false,
    });
    // alert("cambios realizados, actualizar?")
     window.location.reload(false);
  }

  eliminar(e) {

    var url = this.url(this.props.tipo)+e;
    console.log("eliminar: "+this.props.tipo + e+ " en " + url);
    // console.log(url);
    axios.delete(url).then(
      (response) => {
        console.log(response);
        alert("Eliminado con éxito");
        window.location.reload(false)
      },
      (error) => {
        alert("No se pudo eliminar, revise si el recurso tiene alguna clase asignada");
        console.log(error);
        this.props.history.push("/clase");
      }
    );
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
        );

      case "materia":
        return (
          <CrearMateria
            datos={this.state.selected}
            menciones={this.state.menciones}
            pensums={this.state.pensums}
            onChange={this.onChange}
            onCheckChange={this.onCheckChange}
          />
        );

      case "clases":
        return <CrearClase {...this.props} />;
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
            modo={this.state.editar}
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
            <Modal.Header style={{ backgroundColor: info.color |"var(--color-primary)"}}>
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
                <Button onClick={this.habilitar}>Habilitar</Button>
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
