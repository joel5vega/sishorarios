import React, { Component } from "react";

export default class CrearClase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materias: [],
            url: "http://127.0.0.1:8000",
            data: [],
            show: false,
            menciones: ['control', 'sistemas'],
            pensum: "", semestre: "", sigla: "", nombre: "", mencion: "", tipo: "", paralelo: ""
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <div className="form-row align-items-center">
                        <label className="col-auto">Pensum</label>
                        <select name="pensum" onChange={this.handleChange} required>
                            <option value="" disabled={true}></option>
                            <option>...</option>
                        </select>
                        <label className="col-auto" htmlFor="semestre">Semestre</label>
                        <select name="semestre" value={this.props.semestre} onChange={this.handleChange}>
                            <option>1</option>
                        </select>
                    </div>
                    <div className="form-row align-items-center">
                        <label className="col-auto">Sigla</label>
                        <input type="text" className="col-3" name="sigla"
                            value={this.props.sigla} onChange={this.handleChange} />
                        <label className="col-auto">Nombre</label>
                        <input
                            type="text"
                            className="col-6"
                            name="nombre"
                            value={this.props.nombre}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-row align-items-center">
                        <label className="col-auto">Mencion</label>
                        {this.state.menciones.map(item =>
                            <div className="col-auto" key={item} >
                                <div className="control checkbox">
                                    <input type="checkbox" name={item} onChange={this.handleCheckChange} />
                                    <label className="checkbox">{item}</label>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="form-row align-items-center">
                        <label className="col-auto">Tipo</label>
                        <select value={this.props.tipo}
                            name="tipo" onChange={this.handleChange}>
                            <option>Labo/TEo</option>
                        </select>
                        <label className="col-auto" htmlFor="paralelo">Paralelo</label>
                        <select
                            name="paralelo" value={this.props.paralelo}
                            onChange={this.handleChange}>
                            <option>A/B</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}


{/*
    {keys.map(key => {
        return(
        <div className="col-auto">
                                                
<label className="col-4">{key}</label>
<input
    type="text"
    value={this.props.dato[key]}
    name={key}
    className="col-auto"
    onChange={this.handleChange}
    required />
</div> 
)
})}
*/}
