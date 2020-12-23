import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendario from "../../components/Calendario";
import { Link } from "react-router-dom";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";

export default class clases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://127.0.0.1:8000",
      fuente: "http://localhost:8000/api/clases",
      width: window.innerWidth,
      view: "timeGridWeek",
      loading: true,
      titulo: "",
      eventos: [],
      ambientes: [],
      materias: [],
      responsables: [],
      periodos: [],
      semestres: [],
      menciones: [],

      selectedBuscar: "default",
      selectedPeriodo: "",
      selectedSemestre: "default",
      selectedTipo: "default",
      selectedMencion: "default",
      selectedAmbiente: "default",
      selectedResponsable: "default",
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
    if (this.state.width < 500) {
      this.setState({ view: "timeGrid" });
    } else this.setState({ view: "timeGridWeek" });
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

  ///Handler
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
    var ambientes = this.state.ambientes;
    var nuevaFuente =
      this.state.url +
      "/api/clases/ambiente/" +
      ambiente +
      "?periodo=" +
      this.state.selectedPeriodo;
    // var nombre = ambientes.filter(item => item.id === ambiente)
    var nombre = this.filtro(ambientes, ambiente);
    // let title = "Ambiente: " + nombre.nombre;
    this.setState({
      selectedAmbiente: ambiente,
      selectedSemestre: "",
      // titulo: title,
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
    const nivel = [
      { id: "docente", nombre: "Docente" },
      { id: "auxiliar", nombre: "Auxiliar" },
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
        <div className="container" id="print">
          <div className="row align-items-center">
            {this.state.loading === false && (
              <div className="col-auto">
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
              <div className="col-auto">
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
              <SelectControlado
                label="Semestre"
                value={selectedSemestre}
                name="tipo"
                handleChange={this.handleSemestreChange}
                datos={listaSemestres}
              />
            )}

            {this.state.selectedSemestre > 6 && (
              <SelectControlado
                label="Mencion"
                value={selectedMencion}
                name="tipo"
                handleChange={this.handleMencionChange}
                datos={menciones}
              />
            )}
            {this.state.selectedBuscar === "ambiente" && (
              <SelectControlado
                label="Ambiente"
                value={selectedAmbiente}
                name="ambiente"
                handleChange={this.handleAmbienteChange}
                datos={ambientes}
              />
            )}
            {this.state.selectedBuscar === "responsable" && (
              <SelectControlado
                label="Responsable"
                value={selectedResponsable}
                name="responsable"
                handleChange={this.handleResponsableChange}
                datos={responsables}
                index={`item.titulo+" "+item.ap_paterno`}
              />
            )}
          </div>


          <div className="row align-items-center">
            <div className="col-auto">
              <div>
                <small>Exportar a PDF</small>
              </div>
              <button onClick={this.printPDF}>
                <FontAwesomeIcon icon={"file-pdf"} size="1x" />
              </button>
            </div>
            <div className="col-auto">
              <div>
                <small>Crear Nuevo</small>
              </div>
              <Link to={"/crear/clase"}>
                <FontAwesomeIcon icon={"plus"} size="2x" />
              </Link>
            </div>
          </div>
        </div>

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

        <div id="calendario">
          {this.state.view === "timeGrid" && (
            <Calendario
              fuente={this.state.fuente}
              getDateClick={this.getDateClick}
              view="timeGrid"
            />
          )}
          {this.state.view === "timeGridWeek" && (
            <Calendario
              fuente={this.state.fuente}
              getDateClick={this.getDateClick}
              view="timeGridWeek"
            />
          )}
        </div>
      </div>
    );
  }
}
