import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: "#563d7c" }}>
                        <div><a href="http://localhost:3000/" className="navbar-brand" style={{ color: "white" }}>School Management System</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent