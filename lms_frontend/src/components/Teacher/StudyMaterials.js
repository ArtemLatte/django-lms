import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'

function StudyMaterials(){
    const [studyData,setstudyData]=useState([]);
    const [totalResult,settotalResult]=useState(0);
    const {course_id}=useParams();

    //Fetch courses when page load
    useEffect(()=> {
        try{
        axios.get(baseUrl+'/study-materials/'+course_id)
        .then((res)=>{
                settotalResult(res.data.length)
                setstudyData(res.data);
        });
        }catch(error){
            console.log(error);
        }
    },[]);

    //Delete data
    const handleDeleteClick = (study_id) => {
        Swal.fire({
            title: 'Внимание',
            text: 'Вы уверены, что хотите удалить эти данные?',
            icon: 'info',
            confirmButtonText: 'Продолжить',
            cancelButtonText: 'Отмена',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/study-material/'+study_id)
                    .then((res)=>{
                    Swal.fire('success', 'Data has been deleted');
                        try{
                            axios.get(baseUrl+'/study-materials/'+course_id)
                            .then((res)=>{
                                    settotalResult(res.data.length)
                                    setstudyData(res.data);
                            });
                            }catch(error){
                                console.log(error);
                        }
                    });
                }catch(error){
                    Swal.fire('Ошибка', 'Данные не были удалены');
                }
            }else{
                Swal.fire('Действие отменено', 'Данные не были удалены');
            }
        });
    }

    const downloadFile = (file_url) => {
        window.location.href = file_url
    }

    return(
         <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Материалы для изучения (всего материалов: {totalResult}) <Link className="btn btn-success btn-sm float-end" to={'/add-study/'+course_id}>Добавить материалы</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Название</th>
                                        <th>Обучающий материал</th>
                                        <th>Замечания</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studyData.map((row,index) =>
                                    <tr>
                                        <td>{row.title}</td>
                                        <td>
                                            <button className='btn btn-outline-primary' onClick={()=>downloadFile(row.upload)}>Скачать файл</button>
                                        </td>
                                        <td>{row.remarks}</td>
                                        <td>
                                            <button onClick={()=>handleDeleteClick(row.id)} to={'/delete-chapter/'+row.id} className="btn btn-sm btn-danger ms-1"><i class="bi
                                            bi-trash"></i></button>
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

export default StudyMaterials;