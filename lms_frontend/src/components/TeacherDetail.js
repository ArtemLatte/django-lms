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

    const icon_style={
        'font-size':'30px'
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src="../logo512.png" className="img-thumbnail" alt="Фото профиля" />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>{teacherData.detail}</p>
                    <p className="fw-bold">Навыки:&nbsp;
                    {skillList.map((skill,index) =>
                        <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning ms-1">{skill.trim()}</Link>
                    )}
                    </p>
                    <p>
                    <p className="fw-bold">Последний курс: <Link to="/category/php">ReactJs Course</Link></p>
                    {teacherData.vk_url &&
                    <a href={teacherData.vk_url} style={icon_style}><img src="/vk.svg" width={50}/></a>
                    }
                    {teacherData.rutub_url &&
                    <a href={teacherData.rutub_url} className='ms-2' style={icon_style}><img src="/rutube.svg" width={40}/></a>
                    }
                    {teacherData.max_url &&
                    <a href={teacherData.max_url} className='ms-2' style={icon_style}><img src="/max.svg" width={35}/></a>
                    }
                    {teacherData.website_url &&
                    <a href={teacherData.website_url} className='ms-2' style={icon_style}><img src="/web.svg" width={35}/></a>
                    }
                    </p>
                </div>
            </div>
            { /* Course Videos */}
            <div className="card mt-4">
                    <h5 class="card-header">
                        Список курсов
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