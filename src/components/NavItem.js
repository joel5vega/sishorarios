import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NavItem extends Component {
    constructor(props){
        super(props)

        this.state = {search: ''}
    }

    handleChange = (e) =>{
        // console.log(e.target.value)
        this.setState({search:e.target.value})
    }
    render() {
        const { handleSelect } = this.props

        return (
            <div className="search-container">
                <input 
                value={this.state.search}
                onChange={this.handleChange}
                className="search-input" 
                type="text" />
                <button className="search-btn" onClick={()=>handleSelect(this.state.search)}>ambiente</button>
            </div>
        )
    }

}

NavItem.propTypes={
    handleSelect:PropTypes.func.isRequired
}