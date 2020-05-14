import React, { Component } from 'react'

export default class FetchRandomUser extends Component {

    //state
    state = {
        loading:true,
        person: null,
    };

    //fetch data
    async componentDidMount(){
        const url = "https://api.randomuser.me"
        const url1 = "http://127.0.0.1:8000/api/clases"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({person:data.results[0],loading:false})
        console.log(data.results[0]);
    }
    render() {
        return (
            <div>
                {this.state.loading || !this.state.person ?(
                <div>loading</div> )
                :(<div>
                    <div>{this.state.person.name.first}</div>
                </div>
                )}
            </div>
        )
    }
}
