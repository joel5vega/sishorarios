import React, { Component } from "react";
import Calendario from "../../components/Calendario";
// import "../css/crear.css";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";
import FormCrear from "./FormCrear";
import ProgressBar from "@ramonak/react-progress-bar";

import axios from "axios";

export default class CrearClase extends Component {
  constructor(args) {
    super(args);
    this.state = {
      url: "http://127.0.0.1:8000",
      ambientes: [],
      materias: [],
      responsables: [],
      periodos: [],
      loading: true,
      choqueSemestre: [],
      choqueAmbiente: [],
      Hambiente: [],
      Hsemestre: [],
      eventos: [],
      evento: [],
      view: "timeGridWeek",
      valido: false,
      ////selescted
      selectedPeriodo: "default",
      selectedMateria: "default",
      selectedAmbiente: "default",
      day: "default",
      startTime: "",
      endTime: "",
      paralelo: "A",
      selectedSemestre: "default",
      selectedMencion: "default",
      selectedResponsable: "default",
      selectedNivel: "default",
      selectedTipo: "default",
      //////
      selected: {
        periodo_id: "default",
        semestre: "default",
        selectedMencion: "default",
        materia: "default",
        nivel: "default",
        responsable: "default",
        ambiente: "default",
        day: "default",
        startTime: "",
        endTime: "",
        paralelo: "A",
      },

      isSubmitting: false,
      porcentaje: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //fetch materias
  async fetchMaterias(semestre, mencion) {
    const url = this.state.url;

    try {
      this.setState({ loading: true });
      if (mencion !== "") {
        var urlMaterias =
          url + "/api/materias/semestre/" + semestre + "?mencion=" + mencion;
      } else {
        urlMaterias = url + "/api/materias/semestre/" + semestre;
      }
      axios.get(urlMaterias).then((response) => {
        this.setState({ materias: response.data.materias, loading: false });
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, loading: false });
    }
  }
  //fetch Ambientes
  async fetchAmbientes(tipo) {
    const url = this.state.url;
    try {
      this.setState({ loading: true });
      var urlAmbientes = url + "/api/ambientes?tipo=" + tipo;
      axios.get(urlAmbientes).then((response) => {
        var data = response.data;
        //asignamos las aulas del tipo  correspondiente
        this.setState({ ambientes: data });
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, loading: false });
    }
  }
  //fetch responsables
  async fetchResponsables(nivel) {
    const url = this.state.url;
    try {
      this.setState({ loading: true });
      const urlResponsables = url + "/api/responsables?nivel=" + nivel;
      axios.get(urlResponsables).then((response) => {
        var data = response.data.responsables;
        this.setState({ responsables: data });
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, loading: false });
    }
  }

  async fetchChoqueSemestre(semestre, mencion) {
    const url = this.state.url;
    try {
      this.setState({ loading: true });
      if (mencion !== "") {
        var urlSemestre =
          url +
          "/api/clases/semestre/" +
          semestre +
          "?mencion=" +
          mencion +
          "&periodo=" +
          this.state.selectedPeriodo;
      } else {
        var urlSemestre =
          url +
          "/api/clases/semestre/" +
          semestre +
          "?periodo=" +
          this.state.selectedPeriodo;
      }
      //verificamos eventos anteriormente buscados
      // let anterior = this.state.evento.concat(this.state.choqueAmbiente);
      //recibimos clases del semestre
      axios.get(urlSemestre).then((response) => {
        var data = response.data;
        this.setState({ choqueSemestre: data, eventos: data });

        // this.setState({ eventos: anterior });
        // console.log(data);
        // this.pushArray(data);
      });
    } catch (e) {
      // console.log(e.data);
      this.setState({ ...this.state, loading: false });
      //adicionamos a eventos
    }
  }
  pushArray(data) {
    data.map((item) => {
      if (item.title !== "evento") {
        // if (!(this.state.eventos.filter(e => e.ambiente_id === item.ambiente_id).length > 0)) {
        if (
          !(
            this.state.eventos.filter((e) => e.groupId === item.groupId)
              .length > 0
          )
        ) {
          this.setState({ eventos: [...this.state.eventos, item] });
        }
      } else {
        if (item.title === "evento") {
          // console.log("evento temporal creado");
          let anterior = this.state.choqueAmbiente.concat(
            this.state.choqueSemestre
          );
          // console.log(anterior)
          // this.setState({eventos:anterior});
          this.setState({ eventos: [...anterior, item] });

          // console.log("funciono")
          // console.log(this.state.eventos)
          // this.setState({eventos:this.state.choqueAmbiente})
        }
      }
    });
  }
  async fetchChoqueAmbiente(ambiente) {
    const url = this.state.url;
    try {
      this.setState({ loading: true });
      const urlChoque =
        url +
        "/api/clases/ambiente/" +
        ambiente +
        "?periodo=" +
        this.state.selectedPeriodo;

      axios.get(urlChoque).then((response) => {
        var data = response.data;
        //asignamos las materias del semestre correspondiente
        let anterior = this.state.evento.concat(this.state.choqueSemestre);
        this.setState({ choqueAmbiente: data, eventos: anterior });
        this.pushArray(data);
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, loading: false });
    }
  }
  async fetchChoqueResponsable(responsable) {
    const url = this.state.url;
    try {
      this.setState({ loading: true });
      const urlChoque =
        url +
        "/api/clases/responsable/" +
        responsable +
        "?periodo=" +
        this.state.selectedPeriodo;

      axios.get(urlChoque).then((response) => {
        var data = response.data;
        //asignamos las materias del semestre correspondiente
        let anterior = this.state.evento.concat(this.state.choqueSemestre, this.state.choqueAmbiente);
        this.setState({ choqueResponsable: data, eventos: anterior });
        this.pushArray(data);
      });
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, loading: false });
    }
  }
  //fetch data
  async componentDidMount() {
    //this.fetchData();
    //this.verificar();
  }
  getEventos = (eventos, tipo) => {
    console.log(eventos);
    // let anterior = this.state.eventos;
    this.setState({ [tipo]: [...eventos] });
    this.setState({
      eventos: [...this.state.Hambiente, ...this.state.Hsemestre],
    });
  };
  verificar() {
    if (this.props.selected) {
      var selected = this.props.selected;
      this.setState({
        selectedPeriodo: selected.periodo,
        selectedMateria: selected.materia,
        selectedMencion: selected.mencion,
        selectedNivel: selected.nivel,
      });
    }
  }
  handlePeriodoChange = (event) => {
    this.handleChange(event);

    var periodo = event.target.value;
    // console.log()
    this.setState({
      eventos: [],
      evento: [],
      selectedPeriodo: periodo,
      selectedSemestre: "default",
      selectedAmbiente: "default",
      selectedMateria: "default",
      dia: "default",
      choqueAmbientes: "",
      choqueSemestre: "",
      porcentaje: 10,
      eventos: this.state.evento,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
  };
  handleSemestreChange = (event) => {
    this.handleChange(event);
    var semestre = event.target.value;
    var mencion = "";
    // console.log(event.target);
    this.setState({
      selectedSemestre: semestre,
      porcentaje: 20,
      selectedMencion: "",
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.fetchMaterias(semestre, mencion);
    this.fetchChoqueSemestre(semestre, mencion);
  };
  handleMencionChange = (event) => {
    var mencion = event.target.value;
    var semestre = this.state.selectedSemestre;
    // console.log(mencion);
    this.setState({
      selectedMencion: mencion,
      porcentaje: 20,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.fetchMaterias(semestre, mencion);
    this.fetchChoqueSemestre(semestre, mencion);
  };
  handleMateriaChange = (event) => {
    var materia = event.target.value;
    this.setState({
      selectedMateria: materia,
      selectedNivel: "docente",
      porcentaje: 40,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.fetchResponsables("docente");
  };
  handleAmbienteChange = (event) => {
    var ambiente = event.target.value;
    this.setState({
      selectedAmbiente: ambiente,
      porcentaje: 80,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    // console.log(ambiente);
    this.fetchChoqueAmbiente(ambiente);
  };
  handleNivelChange = (event) => {
    var nivel = event.target.value;
    this.setState({
      selectedNivel: nivel,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.fetchResponsables(nivel);
    // console.log(ambiente)
  };
  handleTipoChange = (event) => {
    var tipo = event.target.value;
    this.setState({
      selectedTipo: tipo,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.fetchAmbientes(tipo);
  };

  handleResponsableChange = (event) => {
    var responsable = event.target.value;
    this.setState({
      selectedResponsable: responsable,
      selectedTipo: "teoria",
      porcentaje: 60,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.fetchChoqueResponsable(responsable);
    // console.log(ambiente)
    this.fetchAmbientes("aula")
  };
  handleDayChange = (event) => {
    var dia = event.target.value;
    var evento = [
      {
        title: "evento",
        daysOfWeek: dia,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
      },
    ];
    this.setState({
      day: dia,
      evento: evento,
      view: "dayGrid",
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.pushArray(evento);
    // console.log(evento)
  };
  handleStartChange = (event) => {
    var start = event.target.value;
    let nuevo;
    if (this.state.selectedTipo == "laboratorio") {
      nuevo = this.addTime(start, 180);
      console.log("tiempo de labo");
    } else {
      nuevo = this.addTime(start, 90);
      console.log("tiempo de teoria");
    }

    var evento = [
      {
        title: "evento",
        daysOfWeek: this.state.day,
        startTime: start,
        endTime: nuevo,
      },
    ];
    this.setState({
      startTime: start,
      endTime: nuevo,
      evento: evento,
      porcentaje: 100,
      selected: {
        ...this.state.selected,
        [event.target.name]: event.target.value,
      },
    });
    this.pushArray(evento);
  };
  handleEndChange = (event) => {
    var fin = event.target.value;
    var evento = [
      {
        title: "evento",
        daysOfWeek: this.state.day,
        startTime: this.state.startTime,
        endTime: fin,
        selected: {
          ...this.state.selected,
          [event.target.name]: event.target.value,
        },
      },
    ];
    this.setState({ endTime: fin, evento: evento });
    this.pushArray(evento);
  };
  eventClick(event) {
    console.log(event)
  }
  getDateClick = (event) => {
    let startTime = event.startTime;
    let day = event.day.toString();
    let date = event.date;
    let minutes = 90;
    let fin = new Date(date.getTime() + minutes * 60000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit", hour12: false }
    );
    var evento = [
      { title: "evento", daysOfWeek: day, startTime: startTime, endTime: fin },
    ];
    this.setState({ evento: evento });
    if (this.state.selectedAmbiente !== "default") {
      var porcentaje = 100;
    } else {
      var porcentaje = 10;
    }

    this.setState({
      startTime: startTime,
      day: day,
      endTime: fin,
      porcentaje: porcentaje,
      selected: {
        ...this.state.selected,
        startTime: startTime,
        endTime: fin,
        day: day,
      },
    });

    this.pushArray(evento);
  };
  addTime(time, minutes) {
    let now = new Date("January 25, 1994 " + time);
    let nuevo = new Date(now.getTime() + minutes * 60000).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit", hour12: false }
    );
    return nuevo;
  }
  handleSubmit(event) {
    event.preventDefault();
    var evento = {
      materia: this.state.selectedMateria,
      responsable: this.state.selectedResponsable,
      ambiente: this.state.selectedAmbiente,
      periodo: this.state.selectedPeriodo,
      tipo: this.state.selectedTipo,
      nivel: this.state.selectedNivel,
      day: this.state.day,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      paralelo: this.state.paralelo,
    };
    console.log(evento);
    console.log("Para enviar selected:");
    console.log(this.state.selected);
    let urlPost = this.state.url + "/api/clases";
    axios
      .post(urlPost, evento)
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      )
      .then(this.limpiarForm());
    this.limpiarForm();
    this.props.history.push("crear");

    alert("El evento se creo exitosamente");
  }

  limpiarForm() {
    this.setState({
      selectedPeriodo: "default",
      selectedAmbiente: "default",
      selectedMateria: "default",
      selectedMencion: "default",
      selectedNivel: "default",
      selectedResponsable: "default",
      selectedSemestre: "default",
      selectedTipo: "default",
      day: "default",
      porcentaje: 0,
      eventos: [],
      evento: [],
      choqueSemestre: [],
      choqueAmbiente: [],
      Hambiente: [],
      Hsemestre: [],
      selected: {
        periodo_id: "default",
        semestre: "default",
        selectedMencion: "default",
        materia: "default",
        nivel: "default",
        responsable: "default",
        ambiente: "default",
        day: "default",
        startTime: "",
        endTime: "",
        paralelo: "A",
      },
    });
  }
  onSubmit(event) {
    alert("se cambio");
  }
  view = (event) => {
    let view = this.state.view;
    return view;
  };

  //manejador de eventos global
  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      selected: {
        ...this.state.selected,
        [name]: value,
      },
    });
    // console.log("handleChanges");
    // console.log(name + " es: " + value);
    // console.log(this.state.selected);
  };
  render() {
    // var { menciones } = this.props;
    var { periodos, menciones } = this.props.index;
    const niveles = [
      { id: "docente", nombre: "Docente" },
      { id: "auxiliar", nombre: "Auxiliar" },
    ];
    const tipos = [
      { id: "aula", nombre: "Teoria" },
      { id: "laboratorio", nombre: "Laboratorios" },
    ];
    const dias = [
      { id: "1", nombre: "Lunes" },
      { id: "2", nombre: "Martes" },
      { id: "3", nombre: "Miercoles" },
      { id: "4", nombre: "Jueves" },
      { id: "5", nombre: "Viernes" },
      { id: "6", nombre: "Sabado" },
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


    var {
      selectedPeriodo,
      selectedSemestre,
      selectedMencion,
      selectedResponsable,
      selectedTipo,
      selectedAmbiente,
      selectedMateria,
      selectedNivel,
      selectedTipo,
      paralelo,
      materias,
      responsables,
      ambientes,
      startTime,
      endTime,
      day,
      porcentaje,
      horarios
    } = this.state;

    return (
      <div className="tarjetas">
        <div className="col-4">
          <form onSubmit={this.handleSubmit}>
            <div className="progreso">
              Crear Clase
              <ProgressBar completed={porcentaje} bgcolor="#046193" />
            </div>

            <div className="tarjeta-big">
              <div className="tarjeta">
                <SelectControlado
                  label="Periodo"
                  value={selectedPeriodo}
                  name="periodo_id"
                  handleChange={this.handlePeriodoChange}
                  datos={periodos}
                />
              </div>
            </div>
            {this.state.selectedPeriodo !== "default" && (
              <div className="tarjeta-big">
                <div className="tarjeta">
                  <SelectControlado
                    label="Semestre"
                    value={selectedSemestre}
                    name="semestre"
                    handleChange={this.handleSemestreChange}
                    datos={listaSemestres}
                  />
                </div>
                <div className="tarjeta">
                  {selectedSemestre > 6 && (
                    <SelectControlado
                      label="Mencion"
                      value={selectedMencion}
                      name="mencion"
                      handleChange={this.handleMencionChange}
                      datos={menciones}
                    />
                  )}
                </div>
              </div>
            )}
            {this.state.selectedSemestre !== "default" && (
              <div className="tarjeta-big">
                <div className="tarjeta">
                  <SelectControlado
                    label="Materia"
                    value={selectedMateria}
                    name="materia"
                    handleChange={this.handleMateriaChange}
                    materia={true}
                    datos={materias}
                  />
                </div>
                <div className="tarjeta">
                  <InputControlado
                    label="Paralelo"
                    nombre="paralelo"
                    valor={paralelo}
                    handleChange={this.handleChange}
                  />
                </div>
              </div>
            )}
            {this.state.selectedMateria !== "default" && (
              <div className="tarjeta-big">
                <div className="tarjeta">
                  <SelectControlado
                    label="Nivel"
                    value={selectedNivel}
                    name="nivel"
                    handleChange={this.handleNivelChange}
                    datos={niveles}
                  />
                </div>
                {this.state.selectedNivel !== "" && (
                  <div className="tarjeta">
                    <SelectControlado
                      label="Responsable"
                      value={selectedResponsable}
                      name="responsable"
                      handleChange={this.handleResponsableChange}
                      datos={responsables}
                      index={true}
                    />
                  </div>
                )}
              </div>
            )}
            {this.state.selectedResponsable !== "default" && (
              <div className="tarjeta-big">
                <div className="tarjeta">
                  <SelectControlado
                    label="Tipo"
                    value={selectedTipo}
                    name="tipo"
                    handleChange={this.handleTipoChange}
                    datos={tipos}
                  />
                </div>

                {this.state.selectedTipo !== "" && (
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
              </div>
            )}
            {this.state.selectedResponsable !== "default" && (
              <div className="tarjeta-big">
                <div className="tarjeta">
                  <SelectControlado
                    label="Dia"
                    value={day}
                    name="tipo"
                    handleChange={this.handleDayChange}
                    datos={dias}
                  />
                </div>

                {this.state.day > 0 && (
                  <div className="tarjeta">
                    <InputControlado
                      label="Inicio"
                      nombre="startTime"
                      valor={startTime}
                      handleChange={this.handleStartChange}
                    />
                  </div>
                )}
                {this.state.startTime !== "" && (
                  <div className="tarjeta">
                    <InputControlado
                      label="Final"
                      nombre="endTime"
                      valor={endTime}
                      handleChange={this.handleEndChange}
                    />
                  </div>
                )}
              </div>
            )}
            {this.state.porcentaje == 100 && (
              <div className="tarjeta-big">
                <button
                  className="btn btn-primary mb-2"
                  type="submit"
                  disabled={this.state.isSubmitting}
                >
                  Crear
                </button>
              </div>
            )}
          </form>
        </div>
        {/* <div className="col-4">
          <FormCrear
            index={this.props.index}
            getEventos={this.getEventos}
            evento={this.state.evento}
          />
        </div> */}
        <div className="col-8">
          <div className="calendario">
            <Calendario
              eventClick={this.eventClick}
              fuente={this.state.eventos}
              getDateClick={this.getDateClick}
              size="small"
            />
          </div>
        </div>
      </div>
    );
  }
}
