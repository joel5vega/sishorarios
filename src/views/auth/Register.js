import React, { Component } from "react";
import axios from "axios";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { tipo: "default", responsable: { responsable_id: "default" } },
      modo: "crear"
    };
  }
  componentDidMount() {
    //recibimos el dato desde props
    if (this.props.datos) {
      this.setState({ selected: this.props.datos });
      if (this.props.modo == true) {
        this.setState({ modo: "editar" })
        if (this.props.datos.tipo) {
          if (!this.props.datos.tipo == "docente") {
            this.setState({
              selected: {
                ...this.state.selected.responsable,
                responsable: { responsable_id: "default" }
              }
            })
          }
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
    console.log(name + " esjjj: " + value);
    this.setState({ selected: { ...this.state.selected, [name]: value } });
    if (this.props.onChange) {
      this.props.onChange(evento);
    }

    
  };

  async handleFormSubmit(event) {
    console.log("submit")
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
    var url =
      "http://localhost:8000/api/users?email=" +
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
      <div>
        <div className="tarjetas-titulo">Registrar</div>
        <div  className="formulario">
          <div className="itemSecundario">
            <div className="itemInfo">
              <InputControlado

                label="Nombre"
                nombre="name"
                valor={name}
                handleChange={this.handleChange}
              />
            </div>
            <div className="itemInfo">
              <InputControlado
                label="Correo electronico"
                nombre="email"
                valor={email}
                handleChange={this.handleChange}
              />
            </div>
          </div>
          {/* {modo == "crear" && */}
            <div className="itemSecundario">
              <div className="itemInfo">
                <InputControlado
                  tipo="password"
                  label="Contraseña"
                  nombre="password"
                  valor={password}
                  handleChange={this.handleChange}
                />
              </div>
              <div className="itemInfo">
                <InputControlado
                  tipo="password"
                  nombre="c_password"
                  label="Confirme la Contraseña"
                  valor={c_password}
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          {/* } */}
          <div className="itemSecundario">
            <div className="itemInfo">
              <SelectControlado
                label="Tipo"
                value={tipo}
                name="tipo"
                handleChange={this.handleChange}
                datos={tipos}
              />

              {this.state.selected.tipo === "docente" && (
                <div className="itemInfo">
                  <SelectControlado
                    label="Responsable"
                    value={responsable_id}
                    name="responsable"
                    handleChange={this.handleChange}
                    datos={this.props.responsables}
                  />
                </div>
              )}
            </div>
          </div>

        
        </div>.
          <div  className="tarjetas-titulo">
            {modo == "crear" &&
              <button type="submit" className="btn btn-primary btn-block"
                onClick={(event) => this.handleFormSubmit(event)}>
                Registrar
              </button>
            }
          </div>
      </div>
    );
  }
}
