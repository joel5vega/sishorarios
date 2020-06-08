import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Dropdown, NavDropdown } from 'react-bootstrap';
import FetchDatos from "../containers/FetchDatos";
import Calendario from "../components/Calendario";
import { asRoughMinutes } from "@fullcalendar/core";

export default class CrearClase extends Component {

    constructor(args) {
        super(args)
        this.state = {

            ambientes: [],
            materias: [],
            responsables: [],
            loading: true,
            choqueSemestre: [],
            choqueAmbiente: [],
            eventos: [],
            evento: [],
            selectedSemestre: 0,
            selectedMencion: "",
            selectedAmbiente: "",
            selectedNivel: "docente",
            selectedTipo: "",
            selectedResponsable: "",
            isSubmitting: false,
            semestres: [
                { id: 1, nombre: "Primer Semestre", value: 1 },
                { id: 2, nombre: "Segundo Semestre", value: 2 },
                { id: 3, nombre: "Tercer Semestre", value: 3 },
                { id: 4, nombre: "Cuarto Semestre", value: 4 },
                { id: 5, nombre: "Quinto Semestre", value: 5 },
                { id: 6, nombre: "Sexto Semestre", value: 6 },
                { id: 7, nombre: "Septimo Semestre", value: 7 },
                { id: 8, nombre: "Octavo Semestre", value: 8 },
                { id: 9, nombre: "Noveno Semestre", value: 9 },
                { id: 10, nombre: "Decimo Semestre", value: 10 }

            ],
            day: "",
            startTime: "",
            endTime: ""
        }
    }
    //fetch materias
    async fetchMaterias(semestre, mencion) {
        const url = "http://127.0.0.1:8000";
        try {
            this.setState({ loading: true })
            if (mencion !== "") {
                var urlMaterias = url + "/index/materias/" + semestre + "?mencion=" + mencion;
            }
            else {
                var urlMaterias = url + "/index/materias/" + semestre;
            }

            //  console.log(urlMaterias)
            const data = await fetch(urlMaterias).then(value => value.json());
            //asignamos las materias del semestre correspondiente
            this.setState({ materias: data.materias })
            // console.log(data.materias)
        }
        catch (e) {
            console.log(e);
            this.setState({ ...this.state, loading: false })
        }

    }
    //fetch responsables
    async fetchResponsables(nivel) {
        const url = "http://127.0.0.1:8000";
        try {
            this.setState({ loading: true })
            const urlResponsables = url + "/index/responsables?nivel=" + nivel;
            console.log(urlResponsables)
            const data = await fetch(urlResponsables).then(value => value.json());
            //asignamos las materias del semestre correspondiente
            this.setState({ responsables: data.responsables })
            console.log(data.responsable)
        }
        catch (e) {
            console.log(e);
            this.setState({ ...this.state, loading: false })
        }

    }

    async fetchChoqueSemestre(semestre, mencion) {
        const url = "http://127.0.0.1:8000";
        try {
            this.setState({ loading: true })
            if (mencion !== "") {
                var urlSemestre = url + "/semestres/" + semestre + "?mencion=" + mencion;
            }
            else {
                var urlSemestre = url + "/semestres/" + semestre;
            }
            // console.log(urlSemestre)
            const data = await fetch(urlSemestre).then(value => value.json());
            //asignamos las materias del semestre correspondiente
            let anterior = this.state.evento.concat(this.state.choqueAmbiente)
            this.setState({ choqueSemestre: data, eventos: anterior })

            this.pushArray(data);

        }
        catch (e) {
            console.log(e);
            this.setState({ ...this.state, loading: false })
            //adicionamos a eventos

        }

    }
    pushArray(data) {
        data.map(item => {

            if (item.title !== "evento") {
                if (!(this.state.eventos.filter(e => e.ambiente_id === item.ambiente_id).length > 0)) {

                    this.setState({ eventos: [...this.state.eventos, item] });
                }
            }

            else {
                if (item.title == "evento") {
                    console.log("evento crado")
                    let anterior = this.state.choqueAmbiente.concat(this.state.choqueSemestre);
                    console.log(anterior)
                    // this.setState({eventos:anterior});
                    this.setState({ eventos: [...anterior, item] });

                    console.log("funciono")
                    // this.setState({eventos:this.state.choqueAmbiente})

                }
            }

        });
    }
    async fetchChoqueAmbiente(ambiente) {
        const url = "http://127.0.0.1:8000";
        try {
            this.setState({ loading: true })
            const urlChoque = url + "/ambientes/" + ambiente;
            // console.log(urlChoque)
            const data = await fetch(urlChoque).then(value => value.json());
            //asignamos las materias del semestre correspondiente
            let anterior = this.state.evento.concat(this.state.choqueSemestre)
            this.setState({ choqueAmbiente: data, eventos: anterior })
            this.pushArray(data);
            //console.log(data)
        }
        catch (e) {
            console.log(e);
            this.setState({ ...this.state, loading: false })
        }

    }

    async fetchData() {
        const url = "http://127.0.0.1:8000";
        const urlMaterias = url + "/index/materias/" + this.state.selectedSemestre;
        if (this.state.selectedAmbiente == 'undefined') {
            var urlAmbientes = url + "/index/ambientes";
            // var urlAmbientes = url + "/index?index=ambientes";
        }
        else (
            urlAmbientes = url + "/index/ambientes?tipo=" + this.state.selectedAmbiente
        )
        const urlResponsables = url + "/index/responsables";

        // const urlSemestre = url + "/semestres/" + this.state.selectedSemestre;
        // const urlAmbiente = url + "/ambientes/" + this.state.selectedAmbiente;
        Promise.all([
            fetch(urlMaterias).then(value => value.json()),
            fetch(urlAmbientes).then(value => value.json()),
            fetch(urlResponsables).then(value => value.json()),
            //fetch(urlSemestre).then(value => value.json()),
            //fetch(urlAmbiente).then(value => value.json())
        ]).then(allResponses => {
            const materias = allResponses[0];
            const ambientes = allResponses[1];
            const responsables = allResponses[2]
            //const choqueSemestre = allResponses[2];
            //const choqueAmbiente = allResponses[3];
            this.setState({ materias: materias.materias, ambientes: ambientes.ambientes, responsables: responsables.responsables, loading: false })
            // console.log(this.state);
            // console.log(responsables)
            // console.log(materias)

        }).catch((err) => {
            console.log(err);
        });
    }

    //fetch data
    async componentDidMount() {
        this.fetchData();
    }
    handleSemestreChange = (event) => {
        var semestre = event.target.value
        var mencion = ""
        console.log(semestre)
        this.setState({ selectedSemestre: event.target.value, selectedMencion: "" })
        this.fetchMaterias(semestre, mencion)
        this.fetchChoqueSemestre(semestre, mencion)
    }
    handleMencionChange = (event) => {
        var mencion = event.target.value
        var semestre = this.state.selectedSemestre
        // console.log(mencion)
        this.setState({ selectedMencion: mencion })
        this.fetchMaterias(semestre, mencion)
        this.fetchChoqueSemestre(semestre, mencion)

    }
    handleAmbienteChange = (event) => {
        var ambiente = event.target.value
        this.setState({ selectedAmbiente: ambiente })
        // console.log(ambiente)
        this.fetchChoqueAmbiente(ambiente)
    }
    handleNivelChange = (event) => {
        var nivel = event.target.value
        this.setState({ selectedNivel: nivel })
        this.fetchResponsables(nivel);
        // console.log(ambiente)

    }
    handleResponsableChange = (event) => {
        var responsable = event.target.value
        this.setState({ selectedResponsable: responsable })
        // this.fetchResponsables(responsable);
        // console.log(ambiente)

    }
    handleDayChange = (event) => {
        var dia = event.target.value
        var evento = [{ title: "evento", daysOfWeek: dia, startTime: this.state.startTime, endTime: this.state.endTime }]
        this.setState({ day: dia, evento: evento })
        this.pushArray(evento)
        // console.log(evento)
    }
    handleStartChange = (event) => {
        var start = event.target.value

        let nuevo = this.addTime(start, 90)

        var evento = [{ title: "evento", daysOfWeek: this.state.day, startTime: start, endTime: nuevo }]
        this.setState({ startTime: start, endTime: nuevo, evento: evento })
        this.pushArray(evento)

    }
    handleEndChange = (event) => {
        var fin = event.target.value
        var evento = [{ title: "evento", daysOfWeek: this.state.day, startTime: this.state.startTime, endTime: fin }]
        this.setState({ endTime: fin, evento: evento })
        this.pushArray(evento)
    }
    getDateClick = (event) => {
        let startTime = event.startTime
        let day = event.day
        let date = event.date
        let minutes = 90
        let nuevo = new Date(date.getTime() + minutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        // console.log(nuevo)
        this.setState({ startTime: startTime, day: day, endTime: nuevo })

    }
    addTime(time, minutes) {
        let now = new Date("January 25, 1994 " + time)
        let nuevo = new Date(now.getTime() + minutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        // console.log(now)
        console.log(nuevo)
        return nuevo;
    }

    onSubmit(datos) {
        console.log(datos)
        /*
        (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
            }, 500)
            resetForm();
            setSubmitting(false);
     
     
        }*/
    }

    render() {
        var message = "you selected" + this.state.selectedSemestre;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="input-row">
                        <label htmlFor="semestre">Semestre </label>
                        <select
                            type="text"
                            name="semestre"
                            id="semestre"
                            placeholder="semestre"
                            value={this.state.selectedSemestre}
                            onChange={this.handleSemestreChange}
                        >
                            <option disabled={true} value="0">Seleccione Semestre</option>
                            {this.state.semestres.map(item =>
                                <option key={item.id} value={item.value} data-mencion={item.mencion}>
                                    {item.nombre}
                                </option>)}
                        </select>

                        {this.state.selectedSemestre > 6 &&
                            <div>
                                <label htmlFor="mencion">Mencion </label>
                                <select
                                    type="text"
                                    name="mencion"
                                    id="mencion"
                                    placeholder="mencion"
                                    value={this.state.selectedMencion}
                                    onChange={this.handleMencionChange}
                                >
                                    <option disabled={true} value="">Seleccione Mencion</option>
                                    <option value="control">Control</option>
                                    <option value="sistemas">Sistemas</option>
                                    <option value="telecomunicaciones">Telecomunicaciones</option>
                                </select>
                            </div>

                        }
                    </div>
                    <div className="input-row">
                        <label htmlFor="ambiente">Ambiente:</label>
                        <select
                            type="text"
                            name="ambiente"
                            id="ambiente"
                            placeholder="ambiente"
                            value={this.state.selectedAmbiente}
                            onChange={this.handleAmbienteChange}

                        >
                            {this.state.ambientes.map(item =>
                                <option key={item.id} value={item.id}>
                                    {item.nombre}
                                </option>)}
                        </select>
                    </div>
                    <div className="input-row">
                        <label htmlFor="materia">Materia:</label>
                        <select
                            type="text"
                            name="materia"
                            id="materia"
                            placeholder="materia"
                        >
                            {this.state.materias.map(item =>
                                <option key={item.id}>
                                    {item.nombre}
                                </option>)}
                        </select>
                    </div>
                    <div className="input-row">
                        <label htmlFor="nivel">Nivel</label>
                        <select
                            type="text"
                            name="nivel"
                            id="nivel"
                            placeholder="Docencia/Auxiliatura"
                            value={this.state.selectedNivel}
                            onChange={this.handleNivelChange}
                        >

                            <option value="docente">Docencia</option>
                            <option value="auxiliar">Auxiliatura</option>
                        </select>

                        <label htmlFor="responsable">Responsable:</label>
                        <select
                            type="text"
                            name="responsable"
                            id="responsable"
                            placeholder="responsable"
                            defaultValue={this.state.selectedResponsable}
                            onChange={this.handleResponsableChange}
                        >
                            {this.state.responsables.map(item =>
                                <option key={item.id} value={item.id}>
                                    {item.titulo} {item.ap_paterno} {item.nombre}
                                </option>)}
                        </select>
                    </div>

                    <div className="input-row">
                        <label htmlFor="tipo">Tipo</label>
                        <select
                            type="text"
                            name="tipo"
                            id="tipo"
                            placeholder="teoria/laboratorio"
                        >

                            <option >Teoria</option>
                            <option>Laboratorio</option>
                        </select>
                    </div>
                    <div className="input-row">
                        <div>
                            <label htmlFor="day">Dia:</label>
                            <select type="number"
                                name="day"
                                id="day"
                                placeholder={this.state.day}
                                value={this.state.day}
                                onChange={this.handleDayChange}>
                                <option value="" disabled={true}>Seleccione dia</option>
                                <option value="1">Lunes</option>
                                <option value="2">Martes</option>
                                <option value="3">Miercoles</option>
                                <option value="4">Jueves</option>
                                <option value="5">Viernes</option>
                                <option value="6">Sabado</option>
                            </select>
                        </div>
                        {this.state.day > 0 &&
                            <div>
                                <label htmlFor="startTime">Hora de inicio:</label>
                                <input type="time"
                                    name="startTime"
                                    id="startTime"
                                    placeholder={this.state.startTime}
                                    value={this.state.startTime}
                                    onChange={this.handleStartChange}>
                                </input>

                                <label htmlFor="endTime">Hora de fin:</label>
                                <input type="time"
                                    name="endTime"
                                    id="endTime"
                                    placeholder={this.state.endTime}
                                    value={this.state.endTime}
                                    onChange={this.handleEndChange}>
                                </input>
                            </div>
                        }

                    </div>
                    <div>
                        <div className="input-row">
                            <button type="submit" disabled={this.state.isSubmitting}>Submit</button>
                        </div>
                    </div>

                    {/* <pre>{JSON.stringify(this.state.choqueAmbiente, null, 2)}</pre>
                    <pre>{JSON.stringify(this.state.choqueSemestre, null, 2)}</pre> */}
                    {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
                </form>
                <div className="container">
                    <Calendario fuente={this.state.eventos} getDateClick={this.getDateClick} />
                </div>
            </div >


        )
    }

}