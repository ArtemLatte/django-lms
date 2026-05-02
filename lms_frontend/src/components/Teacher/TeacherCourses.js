import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'
function TeacherCourses() {
    const [courseData,setCourseData]=useState([]);

    const teacherId=localStorage.getItem('teacherId');
    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/teacher-courses/'+teacherId)
        .then((res)=>{
                setCourseData(res.data);
        });
        }catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Мои курсы</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Баннер</th>
                                        <th>Кол. студентов</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course,index) =>  
                                    <tr>
                                        <td>
                                            <Link to={`/all-chapters/`+course.id}>{course.title}</Link>
                                            <hr />
                                            {course.course_rating && 
                                                <span>Рейтинг: {course.course_rating}/5</span>
                                            }
                                            {!course.course_rating && 
                                                <span>Рейтинг: 0/5</span>
                                            }
                                            
                                        </td>
                                        <td><img src={course.featured_img} width="80" className='rounded' alt={course.title} /></td>
                                        <td><Link to={`/enrolled-students/`+course.id}>{course.total_enrolled_students}</Link></td>
                                        <td>
                                            <Link class="btn btn-info btn-sm" to={`/edit-course/`+course.id}>Изменить</Link>
                                            <Link class="btn btn-success btn-sm ms-2" to={`/add-chapter/`+course.id}>Добавить модуль</Link>
                                            <Link class="btn btn-warning btn-sm ms-2" to={`/assign-quiz/`+course.id}>Assign Quiz</Link>
                                            <button className="btn btn-danger btn-sm ms-2">Удалить</button>
                                        </td>
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

export default TeacherCourses;