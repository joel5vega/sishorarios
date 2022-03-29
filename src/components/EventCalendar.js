import React, { Component } from "react"
import {EventInput} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import timeGrid from '@fullcalendar/timegrid'
import dayGrid from '@fullcalendar/daygrid'
//import Calendar from '@fullcalendar/core'
import FetchClases from '../containers/FetchClases'
import '../App.css'
import '../main.scss'


 class EventCalendar extends Component {

    state = {
        loading: true,
        clases: [],
    };

/*
    //fetch data
    async componentDidMount() {
        const url = "https://api.randomuser.me"
        const response = await fetch(url1);
        const data = await response.json();
        // this.setState({ clases: data.results, loading: false })
        this.setState({ clases: data.results, loading: false })
        console.log(data.results);
        // return data;      
    }
    */







    render() {
        /*
        if (this.state.loading) {
            return <div>cargando todavia</div>
        }

        if (!this.state.clases.length)
            return <div>No se encontro datos</div>
        */
        

        return (
            <FullCalendar
                //defaultView="dayGridWeek"
                plugins={[timeGrid]}
                //events='https://fullcalendar.io/demo-events.json'
                events={this.props.eventos}
                
                // Hay que averiguar su funcionamiento
                // columnFormat={
                //     month = 'dddd',    // Monday, Wednesday, etc
                //     week = 'dddd, MMM dS', // Monday 9/7
                //     day = 'dddd, MMM dS'  // Monday 9/7
                // }
                // defaultDate={this.props.fecha}
                hiddenDays='0'
                navLinks='true' // can click day/week names to navigate views
                editable='true'
                eventLimit='true' // allow "more" link when too many events
                minTime='06:00'
                maxTime='22:00'
                slotDuration='00:30:00'
                
                height = 'parent'
                widht = 'parent'

                    />
        )
                }
}
