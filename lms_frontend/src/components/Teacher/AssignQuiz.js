import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import CheckQuizinCourse from './CheckQuizinCourse'
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'
function AllQuiz() {
    const [quizData,setquizData]=useState([]);
    const [courseData,setcourseData]=useState([]);
    const teacherId=localStorage.getItem('teacherId');
    const {course_id}=useParams();
    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/teacher-quiz/'+teacherId)
        .then((res)=>{
            setquizData(res.data);
        });
        }catch(error){
            console.log(error);
        }

        try{
        axios.get(baseUrl+'/course/'+course_id)
        .then((res)=>{
                setcourseData(res.data);
        });
        }catch(error){
            console.log(error);
        }

    },[]);

    // Assign quiz to course
    const assignQuiz = (quiz_id) => {
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('course', course_id);
        _formData.append('quiz', quiz_id);

        try {
            axios.post(baseUrl+'/quiz-assign-course/',_formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if(res.status===200||res.status===201){
                    window.location.reload();
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Assign Quiz | <span className="text-primary">{courseData.title}</span></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row,index) =>
                                        <tr>
                                            <td>
                                                <Link to={`/all-questions/`+row.id}>{row.title}</Link>
                                            </td>
                                                <CheckQuizinCourse quiz={row.id} course={course_id} />
                                            </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AllQuiz;