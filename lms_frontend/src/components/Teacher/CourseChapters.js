import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'
function CourseChapters(){
    const [chapterData,setchapterData]=useState([]);
    const {course_id}=useParams(); 

    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/course-chapters/'+course_id)
        .then((res)=>{
                setchapterData (res.data);
        });
        }catch(error){
            console.log(error);
        }
    },[]);

    return(
         <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Chapters</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData .map((chapter,index) =>  
                                    <tr>
                                        <td><Link to="#">{chapter.title}</Link></td>
                                        <td>
                                            <video controls width="250">
                                                <source src={chapter.video.url} type="video/webm" />

                                                <source src={chapter.video.url}  type="video/mp4" />

                                                Sorry, your browser doesn't support embeded videos.
                                            </video>
                                        </td>
                                        <td>{chapter.remarks}</td>
                                        <td>
                                            <button className="btn btn-danger">Delete</button>
                                            <button className="btn btn-info ms-1">Edit</button>
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

export default CourseChapters;