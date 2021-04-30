import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div style={{ textAlign: "center", position: "fixed", bottom: "0", left: "0", width: "100%", backgroundColor: "#563d7c" }}>
                <footer className="footer">
                    <span style={{ color: "white" }}>All Rights Reserved 2021</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent