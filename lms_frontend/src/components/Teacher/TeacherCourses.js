import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'
function TeacherCourses() {
    const [courseData,setCourseData]=useState([]);

    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/teacher-courses/1')
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
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Total Enrolled</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course,index) =>  
                                    <tr>
                                        <td>{course.title}</td>
                                        <td><Link to="/">123</Link></td>
                                        <td>
                                            <button className="btn btn-danger btn-sm">Delete</button>
                                            <Link class="btn btn-success btn-sm ms-2" to="/add-chapter/2">Add Chapter</Link>
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