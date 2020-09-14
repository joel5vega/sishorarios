import React, { Component } from "react";
import Calendario from "../components/Calendario";
import ReactDOM from "react-dom";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import '../fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../css/home.css";

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


    return (
      <div>
        <div className="row align-items-center">
          <div className="col-auto col-md-offset-5">
            <div id="periodo">
              {/* <h3>{this.props.periodo}</h3> */}
              <h1>Sistema de horarios</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="col-auto center-block">

            <div id="title">
              <h2>{this.props.titulo}</h2>
              <button variant="contained" color="primary" href={"clase"} >Clases</button>
            </div>
          </div>


          {/* <div className="col-auto">
            <button id="print" onClick={this.printPDF}>
              <FontAwesomeIcon icon={'file-pdf'} size="1x" />
            </button>
            <small className="sr-only">Exportar a PDF</small>
          </div> */}

        </div>

        <div id='calendario' >
          {/* <Calendario fuente={this.props.fuente} getDateClick={this.getDateClick} /> */}
        </div>



      </div >

    );

  }

}

export default Home;