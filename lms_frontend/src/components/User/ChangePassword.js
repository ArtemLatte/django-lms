import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function ChangePassword() {
  const [studentData, setStudentData] = useState({
    password: '',
  });
  const studentId = localStorage.getItem('studentId');

  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('password', studentData.password);

    try {
      axios
        .post(baseUrl + '/student/change-password/' + studentId + '/', studentFormData)
        .then((response) => {
          if (response.status == 200) {
            window.location.href = '/user-logout';
          } else {
            alert('Oops... Some error occured');
          }
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: 'error' });
    }
  };

  useEffect(() => {
    document.title = 'Смена пароля';
  }, []);

  // Исправлено: проверяем studentLoginStatus, а не teacherLoginStatus
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  if (studentLoginStatus !== 'true') {
    window.location.href = '/user-login';
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-4">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="card-title mb-0">
                <i className="bi bi-key-fill me-2"></i>
                Настройки профиля | Смена пароля
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="mb-3 row align-items-center">
                <label htmlFor="inputPassword" className="col-sm-3 col-form-label fw-bold">
                  <i className="bi bi-lock me-1"></i>Новый пароль
                </label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-key-fill text-muted"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={studentData.password}
                      onChange={handleChange}
                      className="form-control"
                      id="inputPassword"
                      placeholder="Введите новый пароль"
                    />
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="text-end">
                <button className="btn btn-primary rounded-pill px-4" onClick={submitForm}>
                  <i className="bi bi-save me-2"></i>Сохранить пароль
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangePassword;