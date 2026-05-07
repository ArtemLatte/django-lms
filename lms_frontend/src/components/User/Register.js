import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/student/';

function Register() {
  const navigate = useNavigate();
  const [studentData, setstudentData] = useState({
    full_name: '',
    email: '',
    password: '',
    username: '',
    interested_categories: '',
    status: '',
    otp_digit: '',
  });

  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const otp_digit = Math.floor(100000 + Math.random() * 900000);
    const studentFormData = new FormData();
    studentFormData.append('full_name', studentData.full_name);
    studentFormData.append('email', studentData.email);
    studentFormData.append('password', studentData.password);
    studentFormData.append('username', studentData.username);
    studentFormData.append('interested_categories', studentData.interested_categories);
    studentFormData.append('otp_digit', otp_digit);
    try {
      axios.post(baseUrl, studentFormData).then((response) => {
        navigate('/verify-student/' + response.data.id);
      });
    } catch (error) {
      console.log(error);
      setstudentData({ status: 'error' });
    }
  };

  useEffect(() => {
    document.title = 'Регистрация студента';
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white text-center py-4">
              <i className="bi bi-person-plus-fill fs-1"></i>
              <h4 className="mt-2 mb-0">Образование Онлайн</h4>
              <p className="mb-0 opacity-75">Регистрация студента</p>
            </div>
            <div className="card-body p-4">
              {studentData.status === 'success' && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <span>Спасибо за регистрацию!</span>
                </div>
              )}
              {studentData.status === 'error' && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span>Что-то пошло не так. Попробуйте позже.</span>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="full_name" className="form-label fw-bold">
                  <i className="bi bi-person me-1"></i>Имя
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-person-fill text-muted"></i>
                  </span>
                  <input
                    type="text"
                    name="full_name"
                    onChange={handleChange}
                    className="form-control border-start-0"
                    id="full_name"
                    placeholder="Иванов Иван"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  <i className="bi bi-envelope me-1"></i>E-mail
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-at text-muted"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="form-control border-start-0"
                    id="email"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">
                  <i className="bi bi-person-badge-fill me-1"></i>Имя пользователя (псевдоним)
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-person-badge me-1"></i>
                  </span>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    className="form-control border-start-0"
                    id="username"
                    placeholder="ivan_2025"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  <i className="bi bi-lock me-1"></i>Пароль
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-key-fill text-muted"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control border-start-0"
                    id="password"
                    placeholder="Придумайте пароль"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="interested_categories" className="form-label fw-bold">
                  <i className="bi bi-star me-1"></i>Интересы
                </label>
                <textarea
                  name="interested_categories"
                  onChange={handleChange}
                  className="form-control rounded-3"
                  id="interested_categories"
                  rows="3"
                  placeholder="Например: Python, JavaScript, ИИ"
                ></textarea>
                <div id="emailHelp" className="form-text mt-1">
                  <i className="bi bi-info-circle me-1"></i>
                  Php, Python, Javascript, и т.д.
                </div>
              </div>

              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
              >
                <i className="bi bi-person-plus me-2"></i>Зарегистрироваться
              </button>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0 text-muted">
                  Уже есть аккаунт?{' '}
                  <a href="/user-login" className="text-primary fw-bold text-decoration-none">
                    Войти
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;