import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/student/';
function Register(){
    const navigate = useNavigate();
    const [studentData, setstudentData]=useState({
        'full_name':'',
        'email':'',
        'password':'',
        'username':'',
        'interested_categories':'',
        'status':'',
        'otp_digit':'',
    });

    //Change Element value
    const handleChange=(event)=>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.value
        })
    }
    // End

    // Submit Form
    const submitForm=()=> {
        const otp_digit = Math.floor(100000+Math.random() * 900000)
        const studentFormData=new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("password", studentData.password)
        studentFormData.append("username", studentData.username)
        studentFormData.append("interested_categories", studentData.interested_categories)
        studentFormData.append("otp_digit", otp_digit)
        try{
            axios.post(baseUrl,studentFormData).then((response)=> {
            navigate('/verify-student/'+response.data.id);
            // window.location.href='/verify-teacher/'+response.data.id;
//                setteacherData({
//                    'full_name':'',
//                    'email':'',
//                    'password':'',
//                    'qualification':'',
//                    'mobile_no':'',
//                    'skills':'',
//                    'status':'success'
//                });
            });
        }catch(error){
            console.log(error);
            setstudentData({'status':'error'})
        }

    };
    // End

    useEffect(()=>{
        document.title='Student Register';
    });


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {studentData.status=='success' && <p class="text-success">Thanks for your registration</p>}
                    {studentData.status=='error' && <p class="text-danger">Something wrong happened!!</p>}
                    <div className="card">
                        <h5 className="card-header">Регистрация | Студент</h5>
                        <div className="card-body">
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Имя</label>
                                <input type="text" name='full_name' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">E-mail</label>
                                <input type="email" name='email' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Имя пользователя (псевдоним)</label>
                                <input type="text" name='username' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Пароль</label>
                                <input type="password" name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Интересы</label>
                                <textarea name='interested_categories' onChange={handleChange} className="form-control"></textarea>
                                <div id="emailHelp" class="form-text">Php, Python, Javascript, и тд.</div>
                            </div>
                            <button type="submit" onClick={submitForm} className="btn btn-primary">Зарегистрироваться</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;