import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendario from "../../components/Calendario";
import { Link } from "react-router-dom";
import SelectControlado from "../../components/SelectControlado";
import Fab from "@material-ui/core/Fab";
import { Typography } from "@material-ui/core";
import { Modal, Button } from "react-bootstrap";
import EditarClase from "./EditarClase";

export default class BuscarClase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://127.0.0.1:8000",
      // fuente: "http://localhost:8000/api/clases",
      width: window.innerWidth,
      view: "timeGridWeek",
      show: true,
      loading: true,
      titulo: "",
      eventos: [],
      ambientes: [],
      materias: [],
      responsables: [],
      periodos: [],
      semestres: [],
      menciones: [],
      showNow: true,
      selectedBuscar: "default",
      selectedPeriodo: "",
      selectedSemestre: "default",
      selectedTipo: "default",
      selectedMencion: "default",
      selectedAmbiente: "default",
      selectedResponsable: "default",
      show: false,
      guardar: false,
      editar: false,
      clase: {},
    };
  }
  async componentDidMount() {
    // this.fetchData();
    let periodo = this.props.periodo;
    if (this.props.periodoActual) {
      console.log(this.props.periodoActual);
      this.setState({
        loading: false,
        selectedPeriodo: this.props.periodoActual.id,
        periodos: this.props.periodos,
        ambientes: this.props.ambientes,
        materias: this.props.materias,
        menciones: this.props.menciones,
        responsables: this.props.responsables,
        semestres: this.props.semestres,
      });
    }

    window.addEventListener("resize", this.handleResize);
    this.setState({ periodo: periodo });
  }

  /////////////////////////////////////////////
  //Tamaño

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
    this.setView();
    console.log(this.state.width);
  };
  setView = () => {
    if (this.state.width < 650) {
      this.setState({ view: "timeGrid", showNow: false });
    } else this.setState({ view: "timeGridWeek", showNow: true });
    console.log(this.state.view);
    this.render();
  };
  ///////////////////////////////////////////////

  //Exportar PDF
  printPDF = () => {
    const domElement = document.getElementById("root");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf({
        orientation: "landscape",
      });
      // 180,160
      pdf.addImage(imgData, "JPEG", 5, 5, 265, 200);
      pdf.save(`${new Date().toISOString()} Horario.pdf`);
    });
    alert("Se empezo la descarga de su documento PDF");
  };
  /////////////////////////////
  getDateClick = (event) => {
    let startTime = event.startTime;
    let day = event.day.toString();
    let date = event.date;
    let minutes = 90;
    let fin = new Date(date.getTime() + minutes * 60000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    );
    // console.log(nuevo)
    var evento = [
      { title: "evento", daysOfWeek: day, startTime: startTime, endTime: fin },
    ];
    console.log(evento);
  };
  ////////////////////
  //obtenemos cambio de fuente
  /*onClick = (e) => {
  //elaboramos la fuente de consulta
  const url = "http://localhost:8000/";
  var fuente =
    url + "api/clases/semestre/" + e.semestre + "?mencion=" + e.mencion_id;
  console.log(fuente);
  this.setState({ fuente: fuente });

};*/
  /////////////////////////Handler
  handleBuscarChange = (event) => {
    var buscar = event.target.value;
    this.setState({
      selectedBuscar: buscar,
      selectedAmbiente: "",
      selectedSemestre: "",
    });
  };

  handlePeriodoChange = (event) => {
    var periodo = event.target.value;
    var nombre = this.filtro(this.state.periodos, periodo);
    console.log(nombre);
    const fuentePeriodo = this.state.url + "/api/clases?periodo=" + periodo;

    this.setState({
      // periodo: nombre.nombre,
      selectedPeriodo: periodo,
      fuente: fuentePeriodo,
      selectedSemestre: "",
      selectedAmbiente: "",
      choqueAmbientes: "",
      choqueSemestre: "",
      eventos: this.state.evento,
    });
  };

  handleSemestreChange = (event) => {
    var semestre = event.target.value;
    let title = "Semestre:  " + semestre;
    var nuevaFuente =
      this.state.url +
      "/api/clases/semestre/" +
      semestre +
      "?periodo=" +
      this.state.selectedPeriodo;
    this.setState({ fuente: nuevaFuente });
    this.setState({
      selectedSemestre: event.target.value,
      selectedMencion: "",
      selectedAmbiente: "",
      titulo: title,
    });
  };
  handleMencionChange = (event) => {
    var mencion = event.target.value;
    var semestre = this.state.selectedSemestre;
    let title = "Semestre:  " + semestre + " - " + mencion;
    var fuenteDatos =
      this.state.url +
      "/api/clases/semestre/" +
      semestre +
      "?periodo=" +
      this.state.selectedPeriodo +
      "&mencion=" +
      mencion;
    this.setState({
      selectedMencion: mencion,
      fuente: fuenteDatos,
      titulo: title,
    });
  };
  handleAmbienteChange = (event) => {
    console.log(event.target.value);
    var ambiente = event.target.value;
    // var ambientes = this.state.ambientes;
    var nuevaFuente =
      this.state.url +
      "/api/clases/ambiente/" +
      ambiente +
      "?periodo=" +
      this.state.selectedPeriodo;
    this.setState({
      selectedAmbiente: ambiente,
      selectedSemestre: "",
      fuente: nuevaFuente,
    });
    console.log(ambiente);
  };

  handleResponsableChange = (event) => {
    console.log(event.target.value);
    var responsable = event.target.value;
    // var ambientes = this.state.ambientes;
    var nuevaFuente =
      this.state.url +
      "/api/clases/responsable/" +
      responsable +
      "?periodo=" +
      this.state.selectedPeriodo;

    this.setState({
      selectedResponsable: responsable,
      selectedSemestre: "",
      selectedAmbiente: "",
      fuente: nuevaFuente,
    });
    console.log(responsable);
  };

  onHide = () => {
    this.setState({ show: false });
  };

  filtro = (array, id) => {
    let filtrar = array;
    var nombre = filtrar.filter((item) => {
      if (item.id === id) {
        return item.nombre;
      }
    });
    return nombre[0];
  };
  crearClase = () => {
    alert("crear clase?");
  };
  ///////////////////////
  ////MODAL//////
  modal = () => {
    this.setState({ show: true, guardar: false, editar: true });
  };
  getDateClick = (e) => {
    console.log(e);
  };
  eventClick = (e) => {
    var id = e.event;
    var clase = e.event.extendedProps;
    var startTime = e.event.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    var endTime = e.event.end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    var daysOfWeek = e.event.start.getDay();
    clase = {
      ...clase,
      id: id.groupId,

      startTime: startTime,
      endTime: endTime,
      daysOfWeek: daysOfWeek,
      color: e.event.backgroundColor,
      title: e.event.title,
    };
    this.setState({
      show: true,
      guardar: true,
      editar: false,
      claseID: id,
      clase: clase,
      backgroundColor: e.event.backgroundColor,
    });

    console.log(id);
  };
  onHide = () => {
    this.setState({ show: false });
  };
  ///////////////////////

  render() {
    var {
      selectedPeriodo,
      periodos,
      selectedBuscar,
      selectedSemestre,
      selectedMencion,
      menciones,
      selectedAmbiente,
      ambientes,
      selectedResponsable,
      responsables,
    } = this.state;
    const buscar = [
      { id: "semestre", nombre: "Semestre" },
      { id: "ambiente", nombre: "Ambiente" },
      { id: "responsable", nombre: "Responsable" },
    ];

    const listaSemestres = [
      { id: "1", nombre: "1" },
      { id: "2", nombre: "2" },
      { id: "3", nombre: "3" },
      { id: "4", nombre: "4" },
      { id: "5", nombre: "5" },
      { id: "6", nombre: "6" },
      { id: "7", nombre: "7" },
      { id: "8", nombre: "8" },
      { id: "9", nombre: "9" },
      { id: "10", nombre: "10" },
    ];

    return (
      <div>
        <div className="sticky" id="print">
          <div className="tarjetas">
            {this.state.loading === false && (
              <div className="tarjeta">
                <SelectControlado
                  label="Periodo"
                  value={selectedPeriodo}
                  name="periodo"
                  handleChange={this.handlePeriodoChange}
                  datos={periodos}
                />
              </div>
            )}

            {this.state.selectedPeriodo && (
              <div className="tarjeta">
                <SelectControlado
                  label="Tipo"
                  value={selectedBuscar}
                  name="tipo"
                  handleChange={this.handleBuscarChange}
                  datos={buscar}
                />
              </div>
            )}
            {this.state.selectedBuscar === "semestre" && (
              <div className="tarjeta">
                <SelectControlado
                  label="Semestre"
                  value={selectedSemestre}
                  name="tipo"
                  handleChange={this.handleSemestreChange}
                  datos={listaSemestres}
                />
              </div>
            )}

            {this.state.selectedSemestre > 6 && (
              <div className="tarjeta">
                <SelectControlado
                  label="Mencion"
                  value={selectedMencion}
                  name="tipo"
                  handleChange={this.handleMencionChange}
                  datos={menciones}
                />
              </div>
            )}
            {this.state.selectedBuscar === "ambiente" && (
              <div className="tarjeta">
                <SelectControlado
                  label="Ambiente"
                  value={selectedAmbiente}
                  name="ambiente"
                  handleChange={this.handleAmbienteChange}
                  datos={ambientes}
                />
              </div>
            )}
            {this.state.selectedBuscar === "responsable" && (
              <div className="tarjeta">
                <SelectControlado
                  label="Responsable"
                  value={selectedResponsable}
                  name="responsable"
                  handleChange={this.handleResponsableChange}
                  datos={responsables}
                  index={`item.titulo+" "+item.ap_paterno`}
                />
              </div>
            )}
          </div>
        </div>

        <div id="calendario">
          <div className="row align-items-center">
            <div className="col-auto col-md-offset-5">
              <div id="periodo">
                <h3>{this.state.periodo}</h3>
              </div>
            </div>
            <div className="col-auto center-block">
              <div id="title">
                <h2>{this.state.titulo}</h2>
              </div>
            </div>
          </div>
          {this.state.view === "timeGrid" && (
            <Calendario
              fuente={this.state.fuente}
              getDateClick={this.getDateClick}
              view="timeGrid"
            />
          )}
          {this.state.view === "timeGridWeek" && (
            <div className="container">
              <Calendario
                fuente={this.state.fuente}
                getDateClick={this.getDateClick}
                eventClick={this.eventClick}
                view="timeGridWeek"
              />
            </div>
          )}
        </div>
        <div>
          <Modal
            show={this.state.show}
            onHide={this.onHide}
            aria-labelledby="contained-modal-title-vcenter"
          >
            <form onSubmit={this.guardar}>
              <Modal.Header
                closeButton
                style={{ backgroundColor: this.state.backgroundColor }}
              >
                <div style={{ alignContent: "center" }}></div>
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  style={{ color: "white" }}
                >
                  Tipo: {this.state.clase.tipo}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="show-grid">
                <EditarClase
                  clase={this.state.clase}
                  index={this.props.index}
                  menciones={this.props.menciones}
                />
              </Modal.Body>
            </form>
          </Modal>
        </div>
        <div className="flotante">
          <div id="print" className="sticky">
            <Fab key="pdf" variant="extended" aria-label="option">
              <Link
                to={{
                  pathname: "/clase/view",
                  state: {
                    fuente: this.state.fuente,
                  },
                }}
              >
                <Typography variant="overline" gutterBottom>
                  Ver y exportar
                </Typography>
              </Link>
            </Fab>
          </div>
          <div className="tarjeta">
            <Fab key="new" variant="extended" aria-label="option">
              <Link
                to={{
                  pathname: "/clase/crear",
                }}
              >
                <FontAwesomeIcon icon={"plus"} size="1x" />
                <Typography variant="overline">Nuevo</Typography>
              </Link>
            </Fab>
          </div>
        </div>
      </div>
    );
  }
}
