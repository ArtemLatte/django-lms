import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherLogin(){
    const [teacherLoginData,setteacherLoginData]=useState({
        email: '',
        password: ''
    });

    const [errorMsg,seterrorMsg]=useState('');

    const handleChange=(event)=> {
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const teacherFormData = new FormData;
        teacherFormData.append('email',teacherLoginData.email)
        teacherFormData.append('password',teacherLoginData.password)
        try{
            axios.post(baseUrl+'/teacher-login',teacherFormData)
                    .then((res)=>{
                        if(res.data.bool==true){
                            localStorage.setItem('teacherLoginStatus',true);
                            localStorage.setItem('teacherId',res.data.teacher_id);
                            window.location.href='/teacher-dashboard';
                        }else{
                            seterrorMsg('Invalid Email Or Password!!')
                        }
                    });
        }catch(error){
            console.log(error);
        }
        
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus=='true'){
        window.location.href='/teacher-dashboard';
    }

    useEffect(()=> {
        document.title='Teacher Login'
    });
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Авторизация | Учитель</h5>
                        <div className="card-body">
                                {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">E-mail</label>
                                    <input type="email" name='email' value={teacherLoginData.email} 
                                    onChange={handleChange} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Пароль</label>
                                    <input type="password" name='password' value={teacherLoginData.password}
                                    className="form-control" onChange={handleChange} id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Запомнить меня</label>
                                </div>
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Войти</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin;