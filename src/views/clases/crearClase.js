import React, { Component } from "react";
import Calendario from "../../components/Calendario";
import "../../css/crear.css";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";
import ProgressBar from "@ramonak/react-progress-bar";

import axios from "axios";
// import userEvent from "@testing-library/user-event";
import UrlService from "../../services/UrlService";

export default class CrearClase extends Component {
  constructor(args) {
    super(args);
    this.state = {
      api: UrlService.apiUrl(),
      privilegio: this.props.usuario | "administrativo",
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
      disabled: false,
      // disabled: this.props.usuario.tipo === "docente" | false,
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
      // selectedResponsable: "default",
      selectedResponsable: this.props.usuario.responsable_id | "default",
      // selectedNivel: this.props.usuario.tipo | "default",
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
  componentDidMount() {
    const user = this.props.usuario;
    if (user.tipo === "docente") {
      this.setState({ disabled: true })
    }
    else { this.setState({ disabled: false }) }
  }
  //fetch materias
  async fetchMaterias(semestre, mencion) {
    const url = this.state.api;

    try {
      this.setState({ loading: true });
      if (mencion !== "") {
        var urlMaterias =
          url + "/materias/semestre/" + semestre + "?mencion=" + mencion;
      } else {
        urlMaterias = url + "/materias/semestre/" + semestre;
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
    const url = this.state.api;
    try {
      this.setState({ loading: true });
      var urlAmbientes = url + "/ambientes?tipo=" + tipo;
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
    const url = this.state.api;
    try {
      this.setState({ loading: true });
      const urlResponsables = url + "/responsables?nivel=" + nivel;
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
    const url = this.state.api;
    try {
      this.setState({ loading: true });
      var urlSemestre
      if (mencion !== "") {
        urlSemestre =
          url +
          "/clases/semestre/" +
          semestre +
          "?mencion=" +
          mencion +
          "&periodo=" +
          this.state.selectedPeriodo;
      } else {
        urlSemestre =
          url +
          "/clases/semestre/" +
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
    const url = this.state.api;
    try {
      this.setState({ loading: true });
      const urlChoque =
        url +
        "/clases/ambiente/" +
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
    const url = this.state.api;
    try {
      this.setState({ loading: true });
      const urlChoque =
        url +
        "/clases/responsable/" +
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
  // async componentDidMount() {
  //   //this.fetchData();
  //   //this.verificar();
  // }
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
      // eventos: [],
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
    if (this.state.selectedTipo === "laboratorio") {
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
    var porcentaje
    if (this.state.selectedAmbiente !== "default") {
      porcentaje = 100;
    } else {
      porcentaje = 10;
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
    let urlPost = this.state.api + "/clases";
    
    axios
      .post(urlPost, evento)
      .then(
        (response) => {
          console.log(response);
          alert("Evento creado");
          window.location.reload(false)
        },
        (error) => {
          console.log(error);
          alert("Error al crear evento");
        }
      )
      .then(this.limpiarForm());
    this.limpiarForm();
    this.props.history.push("crear");

    // alert("El evento se creo exitosamente");
  }

  limpiarForm() {
    this.setState({
      disabled: false,
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
      disabled,
      selectedPeriodo,
      selectedSemestre,
      selectedMencion,
      selectedResponsable,
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
      // horarios
    } = this.state;

    return (
      <div className="crear__container">
        <div className="form__container">
          <div className="progreso">
            Crear Clase
            <ProgressBar completed={porcentaje} bgColor="#40826d" />
          </div>
          <form className="formulario" onSubmit={this.handleSubmit}>
            <div className="form__grupo">
              <SelectControlado
                label="Periodo"
                value={selectedPeriodo}
                name="periodo_id"
                handleChange={this.handlePeriodoChange}
                datos={periodos}
              />
            </div>

            {this.state.selectedPeriodo !== "default" && (
              <div className="form__grupo">
                <SelectControlado
                  label="Semestre"
                  value={selectedSemestre}
                  name="semestre"
                  handleChange={this.handleSemestreChange}
                  datos={listaSemestres}
                />

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
            )}
            {this.state.selectedSemestre !== "default" && (
              <div className="form__grupo">
                <SelectControlado
                  label="Materia"
                  value={selectedMateria}
                  name="materia"
                  handleChange={this.handleMateriaChange}
                  materia={true}
                  datos={materias}
                />
                <InputControlado
                  label="Paralelo"
                  nombre="paralelo"
                  valor={paralelo}
                  handleChange={this.handleChange}
                />
              </div>
            )}

            {this.state.selectedMateria !== "default" && (
              <div className="form__grupo">
                <SelectControlado
                  label="Nivel"
                  value={selectedNivel}
                  name="nivel"
                  handleChange={this.handleNivelChange}
                  datos={niveles}
                  disabled={disabled}
                />
                {this.state.selectedNivel !== "" && (
                  <SelectControlado
                    label="Docente"
                    value={selectedResponsable}
                    name="responsable"
                    handleChange={this.handleResponsableChange}
                    datos={responsables}
                    index={true}
                    disabled={disabled}
                  />
                )}
              </div>
            )}
            {this.state.selectedNivel !== "default" && this.state.selectedResponsable !== "default" && (
              <div className="form__grupo">
                <SelectControlado
                  label="Tipo"
                  value={selectedTipo}
                  name="tipo"
                  handleChange={this.handleTipoChange}
                  datos={tipos}
                />
                {this.state.selectedTipo !== "" && (
                  <SelectControlado
                    label="Ambiente"
                    value={selectedAmbiente}
                    name="ambiente"
                    handleChange={this.handleAmbienteChange}
                    datos={ambientes}
                  />
                )}
              </div>
            )}
            {this.state.selectedAmbiente !== "default" && (
              <div className="form__grupo">
                <SelectControlado
                  label="Dia"
                  value={day}
                  name="day"
                  handleChange={this.handleDayChange}
                  datos={dias}
                />

                {this.state.day > 0 && (
                  <InputControlado
                    label="Inicio"
                    nombre="startTime"
                    valor={startTime}
                    handleChange={this.handleStartChange}
                  />
                )}
                {this.state.startTime !== "" && (
                  <InputControlado
                    label="Final"
                    nombre="endTime"
                    valor={endTime}
                    handleChange={this.handleEndChange}
                  />
                )}
              </div>
            )}

          </form>
          {this.state.porcentaje === 100 && (
            <button
              className="form__submit"
              type="submit"
              disabled={this.state.isSubmitting}
              onClick={this.handleSubmit}
            >
              Crear
            </button>
          )}
        </div >
        <div className="contenido">
          <div className="calendario">
            <Calendario
              eventClick={this.eventClick}
              fuente={this.state.eventos}
              getDateClick={this.getDateClick}
              size="small"
            />
          </div>
        </div>
      </div >
    );
  }
}
