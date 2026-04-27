import { useParams, useSearchParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const siteUrl = 'http://127.0.0.1:8000/'
const baseUrl = 'http://127.0.0.1:8000/api'
function CourseDetail() {
    const [courseData,setcourseData]=useState([]);
    const [chapterData,setchapterData]=useState([]);
    const [teacherData,setteacherData]=useState([]);
    const [relatedcourseData,setrelatedcourseData]=useState([]);
    let {course_id}=useParams();
    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/course/'+course_id)
        .then((res)=>{
                setcourseData(res.data);
                setchapterData(res.data.course_chapters);
                setteacherData(res.data.teacher);
                setrelatedcourseData(JSON.parse(res.data.related_videos));
        });
        }catch(error){
            console.log(error);
        }
    },[]);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title} />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="fw-bold">Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link></p>
                    <p className="fw-bold">Techs: {courseData.techs}</p>
                    <p className="fw-bold">Duration: 3 hours 30 minutes</p>
                    <p className="fw-bold">Total Enrolled: 450 students</p>
                    <p className="fw-bold">Rating: 4.5/5</p>
                </div>
            </div>
            { /* Course Videos */}
            <div className="card mt-4">
                    <h5 className="card-header">
                        In this course
                    </h5 >
                    <ul className="list-group list-group-flush">
                    {chapterData .map((chapter,index) =>
                        <li className="list-group-item">{chapter.title}
                            <span className="float-end">
                                <span className="me-5">1 Hour 30 Minutes</span>
                                <button className="btn btn-sm btn-danger" data-bs-toggle="modal" 
                                data-bs-target="#videoModal1"><i className="bi-youtube"></i></button>
                            </span>
                            {/* Video Modal Start*/}
                            <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="ratio ratio-16x9">
                                            <iframe src={chapter.video} title={chapter.title} allowfullscreen>
                                            </iframe>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        )}
                    </ul>
            </div>

            <h3 className='pb-1 mb-4 mt-5'>Related Courses </h3>
            <div className='row mb-4'>
            {relatedcourseData.map((rcourse,index) =>
                <div className='col-md-3'>
                    <div className="card">
                    <Link target="__blank" to={`/detail/${rcourse.pk}`}><img src={`${siteUrl}media/${rcourse.fields.featured_img}`} 
                    className="card-img-top" alt={rcourse.fields.title} /></Link>
                    <div className="card-body">
                        <h5 className="card-title"><Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link></h5>
                    </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default CourseDetail;