import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'

function ShowAssignment(){
    const [assignmentData,setassignmentData]=useState([]);
    const [totalResult,settotalResult]=useState(0);
    const {student_id}=useParams(); 
    const {teacher_id}=useParams(); 

    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id)
        .then((res)=>{
                settotalResult(res.data.length)
                setassignmentData(res.data);
        });
        }catch(error){
            console.log(error);
        }
    },[]);

    // //Delete data
    // const handleDeleteClick = (chapter_id) => {
    //     Swal.fire({
    //         title: 'Confirm',
    //         text: 'Are you sure you want to delete this data?',
    //         icon: 'info',
    //         confirmButtonText: 'Continue',
    //         showCancelButton:true
    //     }).then((result)=>{
    //         if(result.isConfirmed){
    //             try{
    //                 axios.delete(baseUrl+'/chapter/'+chapter_id)
    //                 .then((res)=>{
    //                 Swal.fire('success', 'Data has been deleted');
    //                     try{
    //                         axios.get(baseUrl+'/course-chapters/'+course_id)
    //                         .then((res)=>{
    //                                 settotalResult(res.data.length)
    //                                 setchapterData(res.data);
    //                         });
    //                         }catch(error){
    //                             console.log(error);
    //                     }
    //                 });
    //             }catch(error){
    //                 Swal.fire('error', 'Data has not been deleted!!');
    //             }
    //         }else{
    //             Swal.fire('error', 'Data has not been deleted!!');
    //         }
    //     });
    // }

    return(
         <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Assignments ({totalResult}) 
                            <Link className="btn btn-success btn-sm float-end" 
                            to={`/add-assignment/${student_id}/${teacher_id}`}>Add Assignment</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Student Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignmentData .map((row,index) =>  
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>
                                            {row.student_status==false && 
                                                <span className='badge bg-warning'>Pending</span>
                                            }
                                            {row.student_status==true && 
                                                <span className='badge bg-success'>Completed</span>
                                            }
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

export default ShowAssignment;