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
    const {  view } = this.props;
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
        columnHeaderFormat={{ weekday: "long" }}
        // columnHeaderFormat={{ weekday: "short" }}//corto
        //Para que la altura se ajuste a la de la pantalla
        // contentHeight='auto'
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
        }}
        //idioma
        locale="es"
        //EVENTOS
        events={this.props.fuente}
        //para poner datos especificos en el cuadro
        eventRender={this.EventDetail}
        hiddenDays="0"
        allDaySlot={false}
        navLinks="true" // can click day/week names to navigate views
        editable="true"
        //eje del tiempo
        minTime="7:00"
        maxTime="21:00"
        slotDuration="00:45:00"
        height="auto"
        nowIndicator={true}
        // aspectRatio={5}
        dateClick={this.dateClick}
        eventClick={this.eventClick}
      />
    );
  }
  EventDetail = ({ event, el }) => {
    console.log(this.props.view);
    const {
      // semestre,
      paralelo,
      ambiente,
      tituloResponsable,
      responsable,
    } = event.extendedProps;
    // extendedProps is used to access additional event properties.
    const content = (
      <div>
        <div className="texto-peque">
          {ambiente}
          <br />
          {event.title} {paralelo}
          <br />
          {tituloResponsable} {responsable}
        </div>
      </div>
    );
    const contentMinimal = (
      <div>
        <div className="texto-peque">
          {event.extendedProps.ambiente}
          <br />
          {event.title}
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
      minute: "2-digit",
    });
    let date = event.date;
    // console.log("horaIni:  "+horaini)
    let evento = { day: day, startTime: horaini, date: date };
    // console.log(evento)
    getDateClick(evento);
    // return evento
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
      return "green";
    } else return "blue";
  };
}
