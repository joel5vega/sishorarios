import React, { Component } from "react";
import axios from "axios";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";

export default class EditarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //url: "http://sishorarios.azurewebsites.net/public/api/",
      url:"http://localhost:8000/api/",
      selected: { tipo: "default", responsable: { responsable_id: "default" } },
      modo: "crear"
    };
  }
  componentDidMount() {
    //recibimos el dato desde props
    console.log("sdfsdfff fs df")
    if (this.props.datos) {
      this.setState({ selected: this.props.datos });
      if (this.props.modo == true) {
        this.setState({ modo: "editar" })
        if (this.props.datos.tipo && !this.props.datos.tipo == "docente") {
          this.setState({
            selected: {
              ...this.state.selected.responsable,
              responsable: { responsable_id: "default" }
            }
          })
        }

      } else {
        console.log(this.state.selected)
        this.setState({
          selected: {

            responsable: { responsable_id: "default" }
          }
        })
      }

    }

  }
  handleChange = (evento) => {
    const target = evento.target;
    const value = target.value;
    const name = target.name;
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    if (this.props.onChange) {
      this.props.onChange(evento);
    }

    console.log(name + " esjjj: " + value);
  };

  async handleFormSubmit(event) {
    event.preventDefault();
    var {
      name,
      email,
      password,
      c_password,
      tipo,
      responsable,
    } = this.state.selected;
    console.log(this.state.selected);
    var url = this.state.url+
      "users?email=" +
      email +
      "&name=" +
      name +
      "&password=" +
      password +
      "&c_password=" +
      c_password +
      "&tipo=" +
      tipo +
      "&responsable=" +
      responsable;

    axios.post(url).then((response) => {
      console.log(response);
      alert("Registro exitoso");
      this.props.history.push("/");
    });
  }
  render() {
    var {
      name,
      email,
      tipo,
      responsable,
      password,
      c_password,

    } = this.state.selected;
    // const responsable_id = 1
    const responsable_id = this.state.selected.responsable.responsable_id
    const { modo } = this.state
    const tipos = [
      { id: "docente", nombre: "Docente" },
      { id: "administrativo", nombre: "Administrativo" },
    ];
    return (
      <div className="tarjeta-big">
        <form onSubmit={(event) => this.handleFormSubmit(event)}>
          <div className="tarjeta-big">
            <div className="tarjeta">
              <InputControlado

                label="Nombre"
                nombre="name"
                valor={name}
                handleChange={this.handleChange}
              />
            </div>
            <div className="tarjeta">
              <InputControlado
                label="Correo electronico"
                nombre="email"
                valor={email}
                handleChange={this.handleChange}
              />
            </div>
          </div>
          {modo == "crear" &&
            <div className="tarjeta-big">
              <div className="tarjeta">
                <InputControlado
                  tipo="password"
                  label="Contraseña"
                  value={password}
                  onChange={this.handleChange}
                />
                <InputControlado
                  tipo="password"
                  label="Confirme la Contraseña"
                  value={c_password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          }
          <div className="tarjeta-big">
            <div className="tarjeta">
              <SelectControlado
                label="Tipo"
                value={tipo}
                name="tipo"
                handleChange={this.handleChange}
                datos={tipos}
              />

              {this.state.selected.tipo === "docente" && (
                <SelectControlado
                  label="Responsable"
                  value={responsable_id}
                  name="responsable"
                  handleChange={this.handleChange}
                  datos={this.props.responsables}
                />
              )}
            </div>
          </div>

          <div >
            {modo == "crear" &&
              <button type="submit" className="btn btn-primary btn-block">
                Registrar
              </button>
            }
          </div>
        </form>
      </div>
    );
  }
}
