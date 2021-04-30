import React, { Component } from 'react'
import StudentsService from '../services/StudentsService';

class CreateStudentComponent extends Component {        
    
    constructor(props) {
        super(props)

        this.state = {            
            id: this.props.match.params.id,
            stdfname: '',
            stdlname: '',
            stdcourse: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeCourseHandler = this.changeCourseHandler.bind(this);
        this.saveOrUpdateStudent = this.saveOrUpdateStudent.bind(this);
    }
   
    componentDidMount() {
    
        if (this.state.id === '_add') {
            return
        } else {
            StudentsService.getStudentsById(this.state.id).then((res) => {
                let student = res.data;
                this.setState({
                    stdfname: student.stdfname,
                    stdlname: student.stdlname,
                    stdcourse: student.stdcourse
                });
            });
        }
    }

    saveOrUpdateStudent = (e) => {
        //alert("stdcourse value : " + this.state.stdcourse);
        e.preventDefault();
        let student = { stdfname: this.state.stdfname, stdlname: this.state.stdlname, stdcourse: this.state.stdcourse};
        //console.log('student => ' + JSON.stringify(student));
        
        if (this.state.id === '_add') {
            StudentsService.createStudents(student).then(res => {
                this.props.history.push('/students');
            });
        } else {
            StudentsService.updateStudents(student, this.state.id).then(res => {
                this.props.history.push('/students');
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ stdfname: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ stdlname: event.target.value });
    }

    changeCourseHandler = (event) => {
        this.setState({ stdcourse: event.target.value });
    }

    cancel() {
        this.props.history.push('/students');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Student</h3>
        } else {
            return <h3 className="text-center">Update Student</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.stdfname} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.stdlname} onChange={this.changeLastNameHandler} />
                                    </div>                     
                                    <div className="form-group">
                                        <label> Course: </label>
                                        <select class="form-control" value={this.state.stdcourse} onChange={this.changeCourseHandler}>
                                            <option value="">Please Select</option>
                                            <option value="Pure Science">Pure Science</option>
                                            <option value="Science Computer">Science Computer</option>
                                            <option value="Account">Account</option>
                                        </select>
                                    </div>

                                    <div style={{ textAlign: "center" }}>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateStudent}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    </div>
                                    </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateStudentComponent