import {Link} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:8000/api'

function AddCourse(){
    const [cats,setCats]=useState([]);
    const [courseData,setCourseData]=useState({
        category: '',
        title:'',
        description:'',
        f_img:'',
        techs:''
    })

    useEffect(()=> {
          try{
            axios.get(baseUrl+'/category')
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
        })
    }

    const handleFileChange=(event)=>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        })
    }

    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', 1);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        if (courseData.f_img) {
            _formData.append('featured_img', courseData.f_img);
        }
        _formData.append('techs', courseData.techs);

        try {
            axios.post(baseUrl + "/course/", _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => { 
            console.log(res.data); 
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
                    <div  className='card'>
                        <h5 className='card-header'> Add Course</h5>
                        <div className='card-body'>
                            <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Category</label>
                                    <select name="category" onChange={handleChange} className="form-control">
                                        {cats.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                            <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Title</label>
                                    <input name="title" type="text" onChange={handleChange} id="title" className="form-control" />
                            </div>
                            <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Description</label>
                                    <textarea name="description" onChange={handleChange} className="form-control"></textarea>
                            </div>
                            <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Featured Image</label>
                                    <input name="f_img" type="file" onChange={handleFileChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Technologies</label>
                                    <textarea name="techs" onChange={handleChange} className="form-control" placeholder="Php, Python, Javascript, HTML, CSS" 
                                    id="techs"></textarea>
                            </div>
                            <button type="button" onClick={formSubmit} className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    )
}

export default AddCourse;