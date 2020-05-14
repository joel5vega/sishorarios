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
            loading: false,
            clases: [],
            fuente: this.props.fuente
            // test:"http://127.0.0.1:8000/clases/show"
        }
    }


    render() {
        if (this.state.loading) {
            return <div>cargando todavia</div>
        }

        return (
            <FullCalendar

                plugins={[timeGrid, dayGrid, interaction, list]}
                defaultView="timeGridWeek"

                //EVENTOS
                events={this.props.fuente}
                //defaultDate={this.props.fecha}
                hiddenDays='0'
                allDaySlot={false}
                //ocultar tiempo
                // displayEventTime='false'
                navLinks='true' // can click day/week names to navigate views
                editable='true'
                //eje del tiempo
                minTime='07:00'
                maxTime='23:00'
                slotDuration='00:45:00'
                height='auto'
                nowIndicator='true'
                width='parent'

            />
        )
    }
}
