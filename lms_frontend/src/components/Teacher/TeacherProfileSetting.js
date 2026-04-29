import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherProfileSetting(){
    const [teacherData, setteacherData]=useState({
        'full_name':'',
        'email':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status':'',
        'profile_img':'',
        'p_img':'',
    });
    const teacherId=localStorage.getItem('teacherId');
    // Fetch categories when page load
    useEffect(()=>{
        // Fetch current teacher data
        try{
        axios.get(baseUrl+'/teacher/'+teacherId)
        .then((res)=>{
            setteacherData({
                full_name:res.data.full_name,
                email:res.data.email,
                qualification:res.data.qualification,
                mobile_no:res.data.mobile_no,
                skills:res.data.skills,
                profile_img:res.data.profile_img,
                p_img:'',
            });
        });
        }catch(error){
            console.log(error);
        }
        // End

    },[]);

    //Change Element value
    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        })
    }
    // End

    const handleFileChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.files[0]
        });
    }

    // Submit Form
    const submitForm=()=> {
        const teacherFormData=new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("skills", teacherData.skills)
        if (teacherData.p_img!=''){
            teacherFormData.append('profile_img', teacherData.p_img, teacherData.p_img.name);
        }

        try{
            axios.put(baseUrl+'/teacher/'+teacherId+'/',teacherFormData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response)=> {
                if(response.status==200){
                    Swal.fire({
                        title: 'Data has been updated',
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                }
            });
        }catch(error){
            console.log(error);
            setteacherData({'status':'error'})
        }

    };
    // End

    useEffect(()=>{
        document.title='Teacher Profile';
    });

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus!='true'){
        window.location.href='/teacher-login'
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div  className='card'>
                        <h5 className='card-header'> Profile Settings</h5>
                      <div className='card-body'>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Full Name</label>
                                <div class="col-sm-10">
                                <input type="text" name="full_name" value={teacherData.full_name} onChange={handleChange} class="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input type="email" name="email" value={teacherData.email} onChange={handleChange} class="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                    <label for="video" class="col-sm-2 col-form-label">Profile Image</label>
                                    <div class="col-sm-10">
                                    <input name="p_img" id="video" type="file" onChange={handleFileChange} className="form-control" />
                                    {teacherData.profile_img &&
                                        <p className="mt-2"><img src={teacherData.profile_img} width="300" alt={teacherData.full_name} /></p>
                                    }
                                    </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Skills</label>
                                <div class="col-sm-10">
                                <textarea className='form-control' name="skills" value={teacherData.skills} onChange={handleChange}></textarea>
                                <div id='emailHelp' class='form-text'>Php, Python, JavaScript, etc</div>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Qualification</label>
                                <div class="col-sm-10">
                                <textarea className='form-control' name="qualification" value={teacherData.qualification} onChange={handleChange}></textarea>
                                <div id='emailHelp' class='form-text'>BCA | MCA</div>
                                </div>
                            </div>
                            <hr />
                            <button className='btn btn-primary' onClick={submitForm}>Update</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherProfileSetting;