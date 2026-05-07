import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function ProfileSetting() {
  const [studentData, setStudentData] = useState({
    full_name: '',
    email: '',
    username: '',
    interested_categories: '',
    profile_img: '',
    p_img: '',
    login_via_otp: '',
  });
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/student/' + studentId + '/').then((res) => {
        setStudentData({
          full_name: res.data.full_name,
          email: res.data.email,
          username: res.data.username,
          interested_categories: res.data.interested_categories,
          profile_img: res.data.profile_img,
          p_img: '',
          login_via_otp: res.data.login_via_otp,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.files[0],
    });
  };

  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('full_name', studentData.full_name);
    studentFormData.append('email', studentData.email);
    studentFormData.append('username', studentData.username);
    studentFormData.append('interested_categories', studentData.interested_categories);
    studentFormData.append('login_via_otp', studentData.login_via_otp);
    if (studentData.p_img) {
      studentFormData.append('profile_img', studentData.p_img, studentData.p_img.name);
    }

    try {
      axios
        .put(baseUrl + '/student/' + studentId + '/', studentFormData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              title: 'Данные обновлены',
              icon: 'success',
              toast: true,
              timer: 3000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
      setStudentData({ status: 'error' });
    }
  };

  useEffect(() => {
    document.title = 'Мой профиль';
  }, []);

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
                <i className="bi bi-person-gear me-2"></i>
                Настройки профиля
              </h5>
            </div>
            <div className="card-body p-4">
              {/* Имя */}
              <div className="mb-3 row">
                <label htmlFor="full_name" className="col-sm-3 col-form-label fw-bold">
                  <i className="bi bi-person me-1"></i>Имя
                </label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-person-fill text-muted"></i>
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      value={studentData.full_name}
                      onChange={handleChange}
                      className="form-control"
                      id="full_name"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-3 col-form-label fw-bold">
                  <i className="bi bi-envelope me-1"></i>E-mail
                </label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-envelope-fill text-muted"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={studentData.email}
                      onChange={handleChange}
                      className="form-control"
                      id="email"
                    />
                  </div>
                </div>
              </div>

              {/* Фото профиля */}
              <div className="mb-3 row">
                <label htmlFor="profile_img" className="col-sm-3 col-form-label fw-bold">
                  <i className="bi bi-camera me-1"></i>Фото профиля
                </label>
                <div className="col-sm-9">
                  <input
                    name="p_img"
                    id="profile_img"
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {studentData.profile_img && (
                    <div className="mt-3">
                      <img
                        src={studentData.profile_img}
                        width="150"
                        className="rounded-circle shadow-sm"
                        alt={studentData.full_name}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-3 col-form-label fw-bold">
                  <i className="bi bi-person-badge me-1"></i>Username
                </label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-at text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={studentData.username}
                      onChange={handleChange}
                      id="username"
                    />
                  </div>
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    Php, Python, JavaScript, и др.
                  </div>
                </div>
              </div>

              {/* Интересы */}
              <div className="mb-3 row">
                <label htmlFor="interested_categories" className="col-sm-3 col-form-label fw-bold">
                  <i className="bi bi-star me-1"></i>Интересы
                </label>
                <div className="col-sm-9">
                  <textarea
                    className="form-control rounded-3"
                    name="interested_categories"
                    value={studentData.interested_categories}
                    onChange={handleChange}
                    id="interested_categories"
                    rows="3"
                  ></textarea>
                  <div className="form-text">
                    <i className="bi bi-tags me-1"></i>
                    Php, Python, JavaScript, и т.д.
                  </div>
                </div>
              </div>

              {/* Двухфакторная аутентификация */}
              <div className="mb-3 row">
                <label htmlFor="login_via_otp" className="col-sm-3 col-form-label fw-bold">
                  <i className="bi bi-shield-lock me-1"></i>2FA
                </label>
                <div className="col-sm-9">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-qr-code text-muted"></i>
                    </span>
                    <input
                      type="text"
                      name="login_via_otp"
                      value={studentData.login_via_otp}
                      onChange={handleChange}
                      className="form-control"
                      id="login_via_otp"
                      placeholder="Включить / выключить"
                    />
                  </div>
                  <div className="form-text">
                    <i className="bi bi-question-circle me-1"></i>
                    Введите "True" или "False"
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="text-end">
                <button className="btn btn-primary rounded-pill px-4" onClick={submitForm}>
                  <i className="bi bi-save me-2"></i>Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileSetting;