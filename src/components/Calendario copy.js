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
            EventInput: []
        }
    }

    //fetch data
    async componentDidMount() {
        const url = "https://api.randomuser.me"
        const url1 = "http://127.0.0.1:8000/api/clases/all"
        const response = await fetch(url1);
        const data = await response.json();
        this.setState({ clases: data.results, loading: false })
        const eventos = [
            {
                title: "Exito 1",
                start: "2020-01-24T15:00:00",
                end: "2020-01-24T16:00:00",
                allDay: 'false'
            },
            {
                groupId:'25',
                title: "modelo",
                startTime: '15:00:00',
                endTime: '19:00:00',
                daysOfWeek: '[1,3]',
                color:'green'
            }
        ]
        this.setState({
            // EventInput:data.results,
            EventInput: eventos,
            loading: false
        })
        console.log(this.state.clases);
        // console.log(data.results)
    }


    render() {
        const events = [
            {
                title: "Exito 1",
                start: "2020-01-24T15:00:00",
                end: "2020-01-24T16:00:00",
                allDay: 'false'
            },
            {
                groupId:'25',
                title: "modelo",
                startTime: '9:00:00',
                endTime: '10:00:00',
                daysOfWeek: '[1,3]',
                color:'green'
            }
        ]
        /*
        const formato=[
            {hour:numeric,
            minute:2-distributeHeight,
        meridiem:short}
        ]
        */
        if (this.state.loading) {
            return <div>cargando todavia</div>
        }

        if (!this.state.clases.length)
            return <div>No se encontro datos</div>

        return (
            <FullCalendar
                defaultView="timeGridWeek"
                plugins={[timeGrid]}
                //events='https://fullcalendar.io/demo-events.json?overlay-day'
                // events={events}
                events={this.state.clases}
                forceEventDuration='true'
                
                defaultDate={this.props.fecha}
                hiddenDays='0'
                // navLinks='true' // can click day/week names to navigate views
                // editable='true'
                //eventLimit='false' // allow "more" link when too many events
                //eje del tiempo
                minTime='07:00'
                maxTime='23:00'
                slotDuration='00:15:00'
                slotLabelInterval='0:45'
                height='auto'
                nowIndicator='true'
            // width='parent'
                allDaySlot='false'
            // nowIndicator='true'
            /*
            // Hay que averiguar su funcionamiento
            columnFormat={
                 month = 'dddd',    // Monday, Wednesday, etc
                 week = 'dddd, MMM dS', // Monday 9/7
                 day = 'dddd, MMM dS'  // Monday 9/7
            }
            */

            />
        )
    }
}
