import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'

function TeacherDashboard(){
    const [dashbarData,setdashbarData]=useState([]);
    const teacherId=localStorage.getItem('teacherId');
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/teacher/dashboard/'+teacherId)
        .then((res)=>{
            setdashbarData(res.data);
        });
        }catch(error){
            console.log(error);
        }
    },[]);
  return (
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar />
            </aside>
            <section className='col-md-9'>
                <div className='row mt-3'>
                  <h4>Dashboard</h4>
                  <div className='col-md-4 mt-3'>
                    <div className='card border-primary'>
                      <h5 className='card-header bg-warning text-white'>Total Courses</h5>
                      <div className='card-body'>
                        <h3><Link to="/teacher-courses" className='text-warning'>{dashbarData.total_teacher_courses} <i class="bi bi-journals text-warning"></i></Link></h3>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 mt-3'>
                    <div className='card border-primary'>
                      <h5 className='card-header bg-success text-white'>Total Students</h5>
                      <div className='card-body'>
                        <h3><Link to="/teacher-users" className='text-success'>{dashbarData.total_teacher_students} <i class="bi bi-people-fill"></i></Link></h3>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 mt-3'>
                    <div className='card border-primary'>
                      <h5 className='card-header bg-info text-white'>Total Chapters</h5>
                      <div className='card-body'>
                        <h3><Link to="/teacher-courses">{dashbarData.total_teacher_chapters} <i class="bi bi-stickies-fill"></i></Link></h3>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
        </div>


    </div>
  )
}

export default TeacherDashboard;