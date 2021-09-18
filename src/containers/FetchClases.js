import React, { Component } from 'react'

 class FetchClases extends Component {
    //state
    state = {
        loading: true,
        clases:[],
        eventos:[]
        
    };

    
    //fetch data
    async componentDidMount() {
        const url = "https://api.randomuser.me"
        const url1 = "http://127.0.0.1:8000/ambientes/1"
        // const url2 = "http://192.168.100.44:8000/ambientes/1"
        const response = await fetch(url1);
        const data = await response.json();
        this.setState({ clases: data, loading: false })
        console.log(data);  
           
    }
      
    traduccion(){
       
    }
    mapeo() {
        var inSemestre = 2;
        var inMencion = 'telecomunicaciones';
        var inAmbiente='Aula-306';
        if (!inAmbiente) {
            if (inSemestre < 7) {
                const semestres = this.state.clases.filter(clase => clase.semestre === inSemestre);
                this.setState({ test: semestres })
            }
            else {
                switch (inMencion) {
                    case 'control':
                        const control = this.state.clases.filter(clase => clase.semestre === inSemestre && clase.control === "si");
                        this.setState({ test: control })
                        return "control";
                    case 'sistemas':  
                        const sistemas = this.state.clases.filter(clase => clase.semestre === inSemestre && clase.sistemas === "si");
                        this.setState({ test: sistemas })
                    case 'telecomunicaciones':
                        const telecomunicaciones = this.state.clases.filter(clase => clase.semestre === inSemestre && clase.telecomunicaciones == "si");
                        this.setState({ test: telecomunicaciones })
                    default:
                        return "opcion invalida";
                }

            }
        }
        else{
            const ambiente = this.state.clases.filter(clase=>clase.ambiente == inAmbiente);
            this.setState({test:ambiente});
        }

        //const ambientes = this.state.clases.filter(clase=>clase.ambiente == "Aula-306",clase.mencion);
        //this.setState({test:semestres})
        console.log(this.state.test);
        return "exito";

    }
    render() {
        if (this.state.loading) {
            return <div>cargando todavia</div>
        }
        
        if (!this.state.clases.length)
            return <div>No se encontro datos</div>
        

        return (
            <div>
                Cargo
                {/* {this.state.clases} */}
            </div>

        );
    }
}