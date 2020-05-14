import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NavItem extends Component {
    render() {
        const { handleSelect } = this.props

        return (
            <div className="search-container">
                <input className="search-input" type="text" />
                <button className="search-btn" onClick={handleSelect}>ambiente</button>
            </div>
        )
    }

}

NavItem.propTypes={
    handleSelect:PropTypes.func.isRequired
}