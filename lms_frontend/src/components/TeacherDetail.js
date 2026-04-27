import {Link} from 'react-router-dom'
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api'

function TeacherDetail() {
    const [teacherData,setteacherData]=useState([]);
    const [courseData,setcourseData]=useState([]);
    const [skillList,setskillList]=useState([]);
    let {teacher_id}=useParams();

    useEffect(()=> {
        try{
        axios.get(baseUrl+'/teacher/'+teacher_id)
        .then((res)=>{
                setteacherData(res.data);
                setcourseData(res.data.teacher_courses);
                setskillList(res.data.skill_list);
        });
        }catch(error){
            console.log(error);
        }
    },[]);
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src="../logo512.png" className="img-thumbnail" alt="Teacher Image" />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
                    <p className="fw-bold">Skills:&nbsp;
                    {skillList.map((skill,index) =>
                        <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning ms-1">{skill.trim()}</Link>
                    )}
                    </p>
                    <p className="fw-bold">Recent Course: <Link to="/category/php">ReactJs Course</Link></p>
                    <p className="fw-bold">Rating: 4.5/5</p>
                </div>
            </div>
            { /* Course Videos */}
            <div className="card mt-4">
                    <h5 class="card-header">
                        Course List
                    </h5 >
                    <div class="list-group list-group-flush">
                        {courseData.map((course, index) => 
                            <Link to={`/detail/${course.id}`} class="list-group-item list-group-item-action">{course.title}</Link>
                        )}
                    </div>
            </div>
        </div>
    );
}


export default TeacherDetail;