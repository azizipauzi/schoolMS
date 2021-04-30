import React, { Component } from 'react'
import StudentsService from '../services/StudentsService'

class ViewStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stdid: this.props.match.params.id,
            student: {}
        }
    }

    componentDidMount() {
        StudentsService.getStudentsById(this.state.stdid).then(res => {
            this.setState({ student: res.data });
        })
    }

    back() {
        this.props.history.push('/students');
    }

    render() {
        return (
            <div>
                <form>
                    <br></br>
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">Student Details</h3>
                        <div className="card-body">
                            <div className="form-group">
                                <label> First Name: </label>
                                <div><input name="firstName" className="form-control" value={this.state.student.stdfname} readOnly="true" /></div>
                            </div>
                            <div className="form-group">
                                <label> Last Name: </label>
                                <div><input name="firstName" className="form-control" value={this.state.student.stdlname} readOnly="true" /></div>
                            </div>
                            <div className="form-group">
                                <label> Course: </label>
                                <div><input name="firstName" className="form-control" value={this.state.student.stdcourse} readOnly="true" /></div>                                    
                            </div>
                        </div>
                        <button className="btn btn-danger" onClick={this.back.bind(this)} style={{ textAlign: "center", width: "20%", marginLeft: "40%" }}>Back</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ViewStudentComponent