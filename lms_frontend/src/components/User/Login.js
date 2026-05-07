import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Login() {
  const navigate = useNavigate();
  const [studentLoginData, setstudentLoginData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, seterrorMsg] = useState('');

  const handleChange = (event) => {
    setstudentLoginData({
      ...studentLoginData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const StudentFormData = new FormData();
    StudentFormData.append('email', studentLoginData.email);
    StudentFormData.append('password', studentLoginData.password);
    try {
      axios.post(baseUrl + '/student-login', StudentFormData).then((res) => {
        if (res.data.bool == true) {
          if (res.data.login_via_otp == true) {
            navigate('/verify-student/' + res.data.student_id);
          } else {
            localStorage.setItem('studentLoginStatus', true);
            localStorage.setItem('studentId', res.data.student_id);
            navigate('/user-dashboard');
          }
        } else {
          seterrorMsg(res.data.msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  if (studentLoginStatus == 'true') {
    window.location.href = '/user-dashboard';
  }

  useEffect(() => {
    document.title = 'Студенческий вход';
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white text-center py-4">
              <i className="bi bi-mortarboard-fill fs-1"></i>
              <h4 className="mt-2 mb-0">Образование Онлайн</h4>
              <p className="mb-0 opacity-75">Вход для студентов</p>
            </div>
            <div className="card-body p-4">
              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label fw-bold">
                  <i className="bi bi-envelope me-1"></i>E-mail
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-envelope-fill text-muted"></i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={studentLoginData.email}
                    onChange={handleChange}
                    className="form-control border-start-0"
                    id="emailInput"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="passwordInput" className="form-label fw-bold">
                  <i className="bi bi-lock me-1"></i>Пароль
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-key-fill text-muted"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={studentLoginData.password}
                    onChange={handleChange}
                    className="form-control border-start-0"
                    id="passwordInput"
                    placeholder="Введите пароль"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>Войти
              </button>

              <div className="text-center mt-4">
                <Link to="/user-forgot-password" className="text-danger text-decoration-none">
                  <i className="bi bi-question-circle me-1"></i>Забыли пароль?
                </Link>
              </div>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0 text-muted">
                  Нет аккаунта?{' '}
                  <Link to="/user-register" className="text-primary fw-bold text-decoration-none">
                    Зарегистрироваться
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;