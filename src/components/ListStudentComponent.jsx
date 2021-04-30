import React, { Component } from 'react'
import StudentsService from '../services/StudentsService'

class ListStudentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            students: [],
            currentTutorial: null,
            currentIndex: -1,
            searchCourse: ""
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.retrieveStudents = this.retrieveStudents.bind(this);       
        this.searchCourse = this.searchCourse.bind(this);
    }

    onChangeCourse(e) {
        const searchCourse = e.target.value;

        this.setState({
            searchCourse: searchCourse
        });
    }

    retrieveStudents() {
        StudentsService.getStudents()
            .then(response => {
                this.setState({
                    students: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }   

    searchCourse() {
        console.log("this.searchCourse : " + this.state.searchCourse);
        StudentsService.findByCourse(this.state.searchCourse)
            .then(response => {
                this.setState({
                    students: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteStudent(id) {
        StudentsService.deleteStudents(id).then(res => {
            this.setState({ students: this.state.students.filter(student => student.stdid !== id) });
        });
    }
    viewStudent(id) {
        this.props.history.push(`/view-student/${id}`);
    }
    editStudent(id) {
        this.props.history.push(`/add-student/${id}`);
    }
    addStudent() {
        this.props.history.push('/add-student/_add');
    }

    componentDidMount() {
        this.retrieveStudents();
    }        

    render() {
        const { searchCourse, students } = this.state;
        return (
            <div>
                <h2 className="text-center">Students List</h2>               
                <br></br>
                <div className="row">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search by course" value={searchCourse} onChange={this.onChangeCourse} />
                        <div className="input-group col-md-6" style={{ paddingLeft: "2px"}}>
                            <button className="btn btn-outline-secondary" type="button" onClick={this.searchCourse}> Search </button>
                        </div>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={this.addStudent} style={{ float: "right" }}> Add Student </button>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row">                                        
                    <table className="table table-striped table-bordered" id="example">

                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}> First Name</th>
                                <th style={{ textAlign: "center" }}> Last Name</th>
                                <th style={{ textAlign: "center" }}> Course</th>
                                <th style={{ textAlign: "center" }}> Actions</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            {
                                students && students.map(
                                    student =>
                                        <tr key={student.stdid}>
                                            <td style={{ width: "25%" }}> {student.stdfname} </td>
                                            <td style={{ width: "25%" }}> {student.stdlname}</td>
                                            <td style={{ width: "25%" }}> {student.stdcourse}</td>
                                            <td style={{ textAlign: "center", width: "25%" }}>
                                                <button onClick={() => this.viewStudent(student.stdid)} className="btn btn-info">View </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editStudent(student.stdid)} className="btn btn-info">Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStudent(student.stdid)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )                                
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default ListStudentComponent