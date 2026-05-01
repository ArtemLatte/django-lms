import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function UserList() {
    const [StudentData,setStudentData]=useState([]);

    const teacherId=localStorage.getItem('teacherId');
    //Fetch students when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/fetch-all-enrolled-students/' + teacherId)
        .then((res)=>{
                console.log(res.data)
                setStudentData(res.data);
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
                        <h5 className="card-header">Список всех студентов</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Имя</th>
                                        <th>E-mail</th>
                                        <th>Имя пользователя</th>
                                        <th>Заинтересованные категории</th>
                                        <th>Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {StudentData.map((row,index) =>
                                    <tr>
                                        <td>{row.student.full_name}</td>
                                        <td>{row.student.email}</td>
                                        <td>{row.student.username}</td>
                                        <td>
                                            {row.student.interested_categories}
                                        </td>
                                        <td className='text-nowrap'>
                                            <Link to={`/show-assignment/${row.student.id}/${teacherId}`} className='btn btn-sm btn-warning'>Assignments</Link>
                                            <Link to={`/add-assignment/${row.student.id}/${teacherId}`} 
                                            className='btn btn-sm btn-success ms-2'>Add Assignment</Link>
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

export default UserList;