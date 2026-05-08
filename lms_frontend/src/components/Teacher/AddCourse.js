import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function AddCourse(){
    const [cats,setCats]=useState([]);
    const [courseData,setCourseData]=useState({
        category: '',
        title:'',
        description:'',
        f_img:'',
        techs:''
    });

    useEffect(()=>{
        try{
        axios.get(baseUrl+'/category/')
        .then((res)=>{
            setCats(res.data);
        });
        }catch(error){
            console.log(error);
        }
    },[]);

    const handleChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
    }

    const formSubmit=()=>{
        const teacherId=localStorage.getItem('teacherId');
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', teacherId);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        _formData.append('techs', courseData.techs);

        if (courseData.f_img){
            _formData.append('featured_img', courseData.f_img);
        }

        try {
            axios.post(baseUrl+'/course/',_formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => { 
            // console.log(res.data);
            window.location.href='/add-course';
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
                <div className="col-md-9">
                    <div  className='card'>
                        <h5 className='card-header'>Добавить курс</h5>
                        <div className='card-body'>
                            <form>
                            <div className="mb-3">
                                    <label for="title" className="form-label">Категория</label>
                                    <select
                                        name="category"
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Выберите категорию</option>

                                        {cats.map((category,index)=>(
                                            <option key={index} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                            <div className="mb-3">
                                    <label for="title" className="form-label">Название</label>
                                    <input type="text" name="title" onChange={handleChange} id="title" className="form-control" />
                            </div>
                            <div className="mb-3">
                                    <label for="description" className="form-label">Описание</label>
                                    <textarea name="description" onChange={handleChange} className="form-control" id="description"></textarea>
                            </div>
                            <div className="mb-3">
                                    <label for="video" className="form-label">Изображение</label>
                                    <input name="f_img" id="video" type="file" onChange={handleFileChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                    <label for="techs" className="form-label">Технологии</label>
                                    <textarea name="techs" onChange={handleChange} className="form-control" id="techs" placeholder="Php, Python, Javascript, HTML, CSS"></textarea>
                            </div>
                            <button type="button" onClick={formSubmit} className='btn btn-primary'>Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse;