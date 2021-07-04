import React, { Component } from "react";
import InputControlado from "../../components/InputControlado";
import SelectControlado from "../../components/SelectControlado";
import CheckControlado from "../../components/CheckControlado";

export default class CrearMateria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: "",
            menciones: { 3: false, 4: false },
            // mencionesSeleccionadas: { 2: false, 3: false, 4: false },
            selected: {
                sigla: "ETN-",
                nombre: "",
                semestre: "default",
                tipo: "default",
                pensum: "default",
                menciones: { 2: false, 3: false, 4: false },
            }

        };
    }
    componentDidMount() {
        if (this.props.datos) {
            this.setState({ selected: this.props.datos })
            if (!this.props.datos.menciones) {
                this.setState({
                    selected: {
                        ...this.state.selected,
                        menciones: { 2: false, 3: false, 4: false }, 
                    }
                })
            }
            // console.log(this.props.datos.menciones)
            // this.checkMenciones(this.props.datos.menciones)
        }

    }
    checkMenciones = (menciones) => {
        var mencionesSeleccionadas = {}
        menciones.map((mencion) => {
            mencionesSeleccionadas = { ...mencionesSeleccionadas, [mencion.id]: true }
        })
        this.setState({
            mencionesSeleccionadas: mencionesSeleccionadas,
            selected: { ...this.state.selected, menciones: mencionesSeleccionadas }
        })
        console.log(mencionesSeleccionadas)
        return (mencionesSeleccionadas)
    }
    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({
            selected: {
                ...this.state.selected,
                [name]: value,
            }
        })
        console.log(name)
        console.log(value)
        this.props.onChange(event);
    }
    handleCheckChange = (event) => {
        const { name, checked } = event.target
        this.setState({
            mencionesSeleccionadas: {
                ...this.state.mencionesSeleccionadas,
                [name]: checked,
            },
            selected: {
                ...this.state.selected,
                ["menciones"]: {
                    ...this.state.selected.menciones,
                    [name]: checked,
                }
            },
        })
        this.props.onCheckChange(event);
    }
    render() {
        var { sigla, nombre, tipo, semestre, pensum, menciones } = this.state.selected
        //  var menciones = this.state.menciones
        var { mencionesSeleccionadas } = this.state
        // var {menciones}=this.props.datos.menciones
        var listaMenciones = this.props.menciones
        var pensums = [this.props.pensums]
        const semestres = [
            { id: "1", nombre: "1" },
            { id: "2", nombre: "2" },
            { id: "3", nombre: "3" },
            { id: "4", nombre: "4" },
            { id: "5", nombre: "5" },
            { id: "6", nombre: "6" },
            { id: "7", nombre: "7" },
            { id: "8", nombre: "8" },
            { id: "9", nombre: "9" },
            { id: "10", nombre: "10" },
        ];
        const tipos = [
            {
                id: "teoria", nombre: "Teoria"
            },
            {
                id: "laboratorio", nombre: "Laboratorio"
            }
        ]
        return <div className="tarjetas">
            <div className="tarjeta-big">
                <div className="tarjeta">
                    <InputControlado
                        label="Sigla"
                        nombre="sigla"
                        valor={sigla}
                        handleChange={this.handleChange}
                    />
                </div>
                <div className="tarjeta">
                    <InputControlado
                        label="Nombre"
                        nombre="nombre"
                        valor={nombre}
                        handleChange={this.handleChange}
                    />
                </div>

                <div className="tarjeta">
                    <SelectControlado
                        label="Semestre"
                        value={semestre}
                        name="semestre"
                        handleChange={this.handleChange}
                        datos={semestres}
                    />
                </div>
            </div>
            <div className="tarjeta-big">
                <div className="tarjeta">
                    <SelectControlado
                        label="Tipo"
                        value={tipo}
                        name="tipo"
                        handleChange={this.handleChange}
                        datos={tipos}
                    />
                </div>
                <div className="tarjeta">
                    <SelectControlado
                        label="Pensum"
                        value={pensum}
                        name="pensum"
                        handleChange={this.handleChange}
                        datos={pensums}
                    />
                </div>
            </div>
            <div className="tarjeta-big">
                <div className="tarjeta">
                    <CheckControlado
                        label="Menciones"
                        value={menciones}
                        name="mencion"
                        handleChange={this.handleCheckChange}
                        datos={listaMenciones}
                    />
                </div>
            </div>
        </div>;
    }
}
