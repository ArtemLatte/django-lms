import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
function MyTeachers() {
    const [teacerData,setteacerData]=useState([]);
    const studentId=localStorage.getItem('studentId');

    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/fetch-my-teachers/' + studentId)
        .then((res)=>{
                setteacerData(res.data);
        });
        }catch(error){
            console.log(error);
        }
        document.title='My Teachers'
    },[]);
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Мои Учителя</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Имя</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teacerData.map((row,index) =>
                                    <tr>
                                        <td><Link to={`/teacher-detail/`+row.teacher.id}>{row.teacher.full_name}</Link></td>
                                        <td><i className='bi bi-chat-fill'></i></td>
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

export default MyTeachers;