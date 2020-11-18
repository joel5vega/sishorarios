import React, { Component } from "react";
import Calendario from "../components/Calendario";
import ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import '../fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../css/home.css";
import Button from "../components/button";

//temporal
import Lista from "../components/Lista";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "http://127.0.0.1:8000",
      fuente: "http://127.0.0.1:8000/index?periodo=1",
      selectedPeriodo: ""
    }

  }

  printPDF = () => {
    const domElement = document.getElementById("root");
    html2canvas(domElement, {
      onclone: document => {
        document.getElementById("print").style.visibility = "hidden";
      }
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf({
        orientation: 'landscape'

      });
      // 180,160
      pdf.addImage(imgData, "JPEG", 5, 5, 265, 200);
      pdf.save(`${new Date().toISOString()} Horario.pdf`);
    });
    alert("Se empezo la descarga de su documento PDF")
  };
  getDateClick = (event) => {
    let startTime = event.startTime
    let day = event.day.toString()
    let date = event.date
    let minutes = 90
    let fin = new Date(date.getTime() + minutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    // console.log(nuevo)
    var evento = [{ title: "evento", daysOfWeek: day, startTime: startTime, endTime: fin }]
    console.log(evento)

  }

  render() {
    const lista = {
      titulo: "este es el titulo",
      modo: "admin",
      tipo: "materia",
      datos: [
        {
          id: 5,
          sigla: "esta es la sigla",
          nombre: "este es el nombre",
          libro: "Biblia",
          capacidad: 10
        }
        ,
        {
          id: 2,
          sigla: "Joel",
          nombre: "Dayelin",
          libro: "Amor"
        },
        {
          id: 3,
          sigla: "prueba",
          nombre: "examen",
          libro: "Timoteo"
        }
      ]

    }

    return (
      <div>
        <div>
          <div>
            {/* <Lista {...lista} /> */}
          </div>

          {/* <div className="col-auto">
            <button id="print" onClick={this.printPDF}>
              <FontAwesomeIcon icon={'file-pdf'} size="1x" />
            </button>
            <small className="sr-only">Exportar a PDF</small>
          </div> */}

        </div >


        {/* <div className="col-auto center-block">
          <div id="title">
            <h2>{this.props.titulo}</h2>
          </div>
          <div className="col-auto">
            <Button href="/clase" label="Clase" />
          </div>
          <div className="col-auto">
            <Button href="/ambiente" label="Ambiente" />
          </div>
          <div className="col-auto">
            <Button href="/materia" label="Materia" />
          </div>
          <div className="col-auto">
            <Button href="/responsable" label="Responsable" />
          </div>
          <div className="col-auto">
            <Button href="/lista" label="Lista" />
          </div>
        </div>
 */}

      </div >

    );

  }

}

export default Home;