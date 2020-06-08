import React, { Component } from "react";
import NavItem from "../components/NavItem";
class Home extends Component {

  render() {

    return (

      <div className='container'>

        <h2>HOME</h2>

        <div className='container' onClick={console.log("cambio")}>
          {/* <NavItem handleSelect={this.handleSelect} /> */}
        </div>
        


      </div>

    );

  }

}

export default Home;