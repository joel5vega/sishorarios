import React, { Component } from "react";
import { Link } from 'react-router-dom';
export default class Button extends Component {
    constructor(props) {
        super(props)
        
    }
    render() {

        return (
            <div className="container">
                <button>
                    <Link to={this.props.href} >
                        {this.props.label}
              </Link>
                </button>
            </div>

        )
    }
}
