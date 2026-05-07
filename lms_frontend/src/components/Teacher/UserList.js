import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import MessageList from './MessageList';
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

    const [groupMsgData,setgroupMsgData]=useState({
        msg_text:'',
    });

    const [groupsuccessMsg,setgroupsuccessMsg]=useState('');
    const [grouperrorMsg,setgrouperrorMsg]=useState('');

    const [msgData,setmsgData]=useState({
        msg_text:'',
    });

    const [successMsg,setsuccessMsg]=useState('');
    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event)=>{
        setmsgData({
            ...msgData,
            [event.target.name]:event.target.value
        });
    }

    const formSubmit = (student_id) => {
        const _formData = new FormData();
        _formData.append('msg_text', msgData.msg_text);
        _formData.append('msg_from', 'teacher');

        try {
            axios.post(baseUrl + "/send-message/"+teacherId+'/'+student_id, _formData)
            .then((res) => {
                if(res.data.bool==true){
                    setmsgData({
                        'msg_text':'',
                    });
                    setsuccessMsg(res.data.msg);
                    seterrorMsg('');
                }else{
                    setsuccessMsg('');
                    seterrorMsg(res.data.msg);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const grouphandleChange=(event)=>{
        setgroupMsgData({
            ...groupMsgData,
            [event.target.name]:event.target.value
        });
    }

    const groupformSubmit = () => {
        const _formData = new FormData();
        _formData.append('msg_text', groupMsgData.msg_text);
        _formData.append('msg_from', 'teacher');

        try {
            axios.post(baseUrl + "/send-group-message/"+teacherId, _formData)
            .then((res) => {
                if(res.data.bool==true){
                    setgroupMsgData({
                        'msg_text':'',
                    });
                    setgroupsuccessMsg(res.data.msg);
                    setgrouperrorMsg('');
                }else{
                    setgroupsuccessMsg('');
                    setgrouperrorMsg(res.data.msg);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Список всех студентов
                            <button type="button" className="btn btn-primary float-end btn-small" data-bs-toggle="modal" 
                            data-bs-target="#groupMsgModal">
                                Отправить Сообщение
                            </button>
                        </h5>
                        <div className="modal fade" id="groupMsgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Отправить сообщение всем студентам</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {groupsuccessMsg && <p className='text-success'>{groupsuccessMsg}</p>}
                                {grouperrorMsg && <p className='text-danger'>{grouperrorMsg}</p>}
                                <form>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Сообщение</label>
                                    <textarea onChange={grouphandleChange} value={groupMsgData.msg_text} name="msg_text" className='form-control' rows="10"></textarea>
                                </div>
                                <button type="button" onClick={groupformSubmit} className="btn btn-primary">Отправить</button>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>


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
                                        <td>
                                            <Link to={`/show-assignment/${row.student.id}/${teacherId}`} className='btn btn-sm btn-warning mb-2 me-2'>Assignments</Link>
                                            <Link to={`/add-assignment/${row.student.id}/${teacherId}`} 
                                            className='btn btn-sm btn-success mb-2 me-2'>Add Assignment</Link>
                                            <button data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} className='btn btn-sm btn-dark mb-2' title='Send Message'><i className="bi bi-chat-fill"></i></button>

{/*Message Modal*/}
<div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
            <span className='text-danger'>{row.student.full_name}</span>
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="row">
            <div className='col-md-8 mb-2 col-12 border-end'>
                <MessageList teacher_id={teacherId} student_id={row.student.id} />
            </div>
            <div className='col-md-4 col-12'>
            {successMsg && <p className='text-success'>{successMsg}</p>}
            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
            <form>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Message</label>
                <textarea onChange={handleChange} value={msgData.msg_text} name="msg_text" className='form-control' rows="10"></textarea>
              </div>
              <button type="button" onClick={()=>formSubmit(row.student.id)} className="btn btn-primary">Send</button>
            </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

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