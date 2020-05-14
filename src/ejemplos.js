/*
  constructor()
  {
    super();
    this.state={
      nombre:"", 
      tipo:"",
    }
  }

  //subir contenido por post
  submit()
    {
      console.log(this.state)
      fetch('http://127.0.0.1:8000/api/clases',{
        method:'get',
        body:JSON.stringify(
          this.state
        ),
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        }
      }).then(function(response){
        response.json().then(function(resp){
          console.log(resp)
        })
      })
    }
  
 render() {
    return (
      <div className="App">
        <h1>Test API</h1>
        <input type="text" onChange={(item)=>{this.setState({email:item.target.value})}}/>
        <br/>
        <input type="password" onChange={(item)=>{this.setState({password:item.target.value})}}/>
        <br/>
        <button onClick={()=>{this.submit()}}>Login</button>
      </div>
    )
  }

*/



