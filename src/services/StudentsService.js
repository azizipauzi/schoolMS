import axios from 'axios';

const STUDENTS_API_BASE_URL = "http://localhost:8080/api/students";

class StudentsService {

    getStudents() {
        return axios.get(STUDENTS_API_BASE_URL);
    }

    createStudents(student) {
        return axios.post(STUDENTS_API_BASE_URL, student);
    }

    getStudentsById(studentId) {
        return axios.get(STUDENTS_API_BASE_URL + '/' + studentId);
    }

    updateStudents(student, studentId) {
        return axios.put(STUDENTS_API_BASE_URL + '/' + studentId, student);
    }

    deleteStudents(studentId) {
        return axios.delete(STUDENTS_API_BASE_URL + '/' + studentId);
    }

    findByCourse(course) {       
        return axios.get(STUDENTS_API_BASE_URL + '?course=' + course);
    }
}

export default new StudentsService()