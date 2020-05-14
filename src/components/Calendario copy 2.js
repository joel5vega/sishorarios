import React, { Component } from "react"
//import { EventInput } from '@fullcalendar/core'
//import all from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGrid from '@fullcalendar/daygrid'
import timeGrid from '@fullcalendar/timegrid'
import list from '@fullcalendar/list'
import interaction from '@fullcalendar/interaction'
import '../main.scss'


export default class Calendario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            clases: [],
            EventInput: [],
            test:this.props.fuente
            // test:"http://127.0.0.1:8000/clases/show"

        }
    }

    //fetch data
    async componentDidMount() {
        const url1 = "http://127.0.0.1:8000/clases/show"

        const response = await fetch(url1);
        const data = await response.json();
        this.setState({ clases: data.results, loading: false })
        //this.mapeo()

        //console.log(this.state.clases)
    }
    actualizar() {
        const eventos = [
            {
                title: "Exito 1",
                start: "2020-01-24T15:00:00",
                end: "2020-01-24T16:00:00",
                allDay: 'false'
            },
            {
                groupId: '25',
                title: "modelo",
                startTime: '15:00:00',
                endTime: '19:00:00',
                daysOfWeek: '[1,3]',
                color: 'green'
            }
        ]
        this.setState({ EventInput: eventos, loading: false })
        //console.log(this.state.EventInput)
    }

    mapeo() {
        var inSemestre = 2;
        var inMencion = 'telecomunicaciones';
        var inAmbiente='Aula-306';
        if (!inAmbiente) {
            if (inSemestre < 7) {
                const semestres = this.state.clases.filter(clase => clase.semestre == inSemestre);
                this.setState({ test: semestres })
            }
            else {
                switch (inMencion) {
                    case 'control':
                        const control = this.state.clases.filter(clase => clase.semestre == inSemestre && clase.control == "si");
                        this.setState({ test: control })
                        return "control";
                    case 'sistemas':
                        const sistemas = this.state.clases.filter(clase => clase.semestre == inSemestre && clase.sistemas == "si");
                        this.setState({ test: sistemas })
                    case 'telecomunicaciones':
                        const telecomunicaciones = this.state.clases.filter(clase => clase.semestre == inSemestre && clase.telecomunicaciones == "si");
                        this.setState({ test: telecomunicaciones })
                    default:
                        return "opcion invalida";
                }

            }
        }
        else{
            const ambiente = this.state.clases.filter(clase=>clase.ambiente == inAmbiente);
            this.setState({test:ambiente});
        }

        //const ambientes = this.state.clases.filter(clase=>clase.ambiente == "Aula-306",clase.mencion);
        //this.setState({test:semestres})
        console.log(this.state.test);
        return "exito";

    }

    render() {


        if (this.state.loading) {
            return <div>cargando todavia</div>
        }
/*
        if (!this.state.clases.length)
            return <div>No se encontro datos</div>
*/
        return (
            <FullCalendar

                //defaultView="timeGridWeek"
                plugins={[timeGrid,dayGrid]}
                
                allDaySlot='false'
                //allDayText="prueba"
                events={this.state.test}
                defaultDate={this.props.fecha}
                hiddenDays='0'
                //ocultar tiempo
                displayEventTime='false'
                // navLinks='true' // can click day/week names to navigate views
                editable='true'
                //eje del tiempo
                minTime='07:00'
                maxTime='23:00'
                slotDuration='00:45:00' 
                //slotLabelInterval='0:45'
                height='auto'
            //nowIndicator='true'
            // width='parent'

            // nowIndicator='true'


            />
        )
    }
}
