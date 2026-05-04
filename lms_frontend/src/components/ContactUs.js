import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/contact/';

function ContactUs(){
    const [ContactData, setContactData]=useState({
        'full_name':'',
        'email':'',
        'query_txt':'',
        'status':''
    });
    //Change Element value
    const handleChange=(event)=>{
        setContactData({
            ...ContactData,
            [event.target.name]:event.target.value
        })
    }
    // End

    // Submit Form
    const submitForm=()=> {
        const contactFormData=new FormData();
        contactFormData.append("full_name", ContactData.full_name)
        contactFormData.append("email", ContactData.email)
        contactFormData.append("query_txt", ContactData.query_txt)

        try{
            axios.post(baseUrl,contactFormData).then((response)=> {
                setContactData({
                    'full_name':'',
                    'email':'',
                    'query_txt':'',
                    'status':'success'
                });
            });
        }catch(error){
            console.log(error);
            setContactData({'status':'error'})
        }

    };
    // End

    useEffect(()=>{
        document.title='Contact Us';
    });

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-8 offset-2">
                    {ContactData.status=='success' && <p class="text-success">Thanks for your contacting us</p>}
                    {ContactData.status=='error' && <p class="text-danger">Something wrong happened!!</p>}
                    <div className="card">
                        <h5 className="card-header">Связаться с нами</h5>
                        <div className="card-body">
                            {/* <form> */}
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Имя</label>
                                    <input value={ContactData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">E-mail</label>
                                    <input value={ContactData.email} onChange={handleChange} name="email" type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Запрос</label>
                                    <textarea rows="10" value={ContactData.query_txt} onChange={handleChange} name="query_txt" className="form-control"></textarea>
                                </div>
                                <button onClick={submitForm} type="submit" className="btn btn-primary">Отправить</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;