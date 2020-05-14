import React, { Component } from 'react'

export default class FetchClases extends Component {
    //state
    state = {
        loading: true,
        clases: [],
    };

    
    //fetch data
    async componentDidMount() {
        const url = "https://api.randomuser.me"
        const url1 = "http://127.0.0.1:8000/api/clases/all"
        const response = await fetch(url1);
        const data = await response.json();
        // this.setState({ clases: data.results, loading: false })
        this.setState({ clases: data.results, loading: false })
        console.log(data.results);  
        // return data;      
    }
    
    render() {
        if (this.state.loading) {
            return <div>cargando todavia</div>
        }
        
        if (!this.state.clases.length)
            return <div>No se encontro datos</div>
        

        // Con este parametro mapearemos el array creado 
        const claseJsx = this.state.clases.map(clase => (
            // se debe poner una key q identifique cuando se mapea un array
            <div key={clase.id}>
                <div>{clase.dia}</div>
                <div>{clase.horaini}</div>
                <div>{clase.horafin}</div>
            </div>
        ))
        return (
            <div>
                {this.state.clases}
            </div>

        );
    }
}