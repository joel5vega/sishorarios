import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { EventInput } from '@fullcalendar/core'
//import all from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import list from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
import "../main.scss";

export default class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      clases: [],
      fuente: this.props.fuente,
      width: window.innerWidth,
      view: "timeGridWeek",
    };
  }

  render() {
    const { view } = this.props;
    if (this.state.loading) {
      return <div>cargando todavia</div>;
    }
    if (this.state.fuente === "undefined") {
      return <div>No se encuentra fuente</div>;
    }

    return (
      <FullCalendar
        plugins={[timeGrid, dayGrid, interaction, list]}
        // defaultView="timeGridWeek"
        defaultView={view}
        //para ocultar el encabezado
        header={false}
        //Para simplificar los dias 'long' nos dara el nombre completo
        // columnHeaderFormat={{ weekday: "long" }}
        columnHeaderFormat={{ weekday: "short" }}//corto
        //Para que la altura se ajuste a la de la pantalla
        // contentHeight='auto'
        height='auto'
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
        }}
        //idioma
        locale="es"
        //EVENTOS
        events={this.props.fuente}
        //para evitar superposicion de elementos
        slotEventOverlap={false}
        eventOverlap={false}
        //para evitar cambiar con pantalla tactil
        longPressDelay="1000"
        //para poner datos especificos en el cuadro
        eventRender={this.EventDetail}
        hiddenDays="0"
        allDaySlot={false}
        navLinks="true" // can click day/week names to navigate views
        editable="true"
        //eje del tiempo
        
        minTime="7:30"
        maxTime="21:00"
        // slotDuration="00:30:00"
        slotLabelInterval="00:30:00"
        
        nowIndicator={true}
        // aspectRatio={5}
        dateClick={this.dateClick}
        eventClick={this.eventClick}
        eventDrop={this.eventDrop}
      />
    );
  }
  EventDetail = ({ event, el }) => {
    // console.log(this.props.view);
    const {
      // semestre,
      paralelo,
      ambiente,
      tituloResponsable,
      responsable,
    } = event.extendedProps;
    // extendedProps is used to access additional event properties.
    const content = (
      <div className="dato-cal">
        <div className="dato-cal-sigla">
          {event.title}-{paralelo}
        </div>
        <div className="dato-cal-responsable">
          {tituloResponsable}.{responsable}
        </div>
        <div className="dato-cal-ambiente">{ambiente}</div>
      </div>
    );
    const contentMinimal = (
      <div className="dato-cal">
        <div className="dato-cal-ambiente">
          {event.extendedProps.ambiente}
          <br />
        </div>
        <div className="dato-cal-sigla">
          {event.title}-{paralelo}
        </div>
      </div>
    );
    if (this.props.view === "timeGridWeek") {
      ReactDOM.render(content, el);
    } else {
      ReactDOM.render(contentMinimal, el);
    }

    return el;
  };
  dateClick = (event) => {
    const { getDateClick } = this.props;
    // console.log(event)
    //Dia
    let day = event.date.getDay();
    //hora inicio
    let horaini = event.date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",hour12:false
    });
    let date = event.date;
    // console.log("horaIni:  "+horaini)
    let evento = { day: day, startTime: horaini, date: date };
    console.log(evento);
    getDateClick(evento);
    // return evento
  };
  eventDrop = (eventDrop) => {
    // alert("paro");
    var event=eventDrop.event
    console.log(eventDrop);
    
    //Dia
    let day = event.start.getDay();
    
    //hora inicio
    let horaini = event.start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",hour12:false
    });
    let horafin = event.end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",hour12:false
    });
    let date = event.start.getUTCDate();
    // console.log("horaIni:  "+horaini)
    
    let evento = { day: day, startTime: horaini,endTime:horafin ,date: date };
    console.log(evento);
    
    // console.log(day);
  };
  eventClick = (event) => {
    // console.log("hacer click en el evento")
    const { eventClick } = this.props;
    // console.log(event);
    eventClick(event);
    //mostrar datos extras
    // console.log(event.event.extendedProps.semestre);
    //obtener datos
    // console.log(event.event.start.getDay());
    // console.log(event.event.start.toLocaleTimeString());
    // console.log(event.event.end.toLocaleTimeString());
  };

  DefinirColor = ({ event }) => {
    // extendedProps is used to access additional event properties.
    if ((event.tipo = "teoria")) {
      return "var(--color-second-1)";
    } else return "var(--color-second-2)";
  };
}
