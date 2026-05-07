import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function VerifyStudent() {
  const navigate = useNavigate();
  const { student_id } = useParams();
  const [studentData, setstudentData] = useState({
    otp_digit: '',
  });
  const [errorMsg, seterrorMsg] = useState('');

  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('otp_digit', studentData.otp_digit);
    try {
      axios
        .post(baseUrl + '/verify-student/' + student_id + '/', studentFormData)
        .then((res) => {
          if (res.data.bool == true) {
            localStorage.setItem('studentLoginStatus', true);
            localStorage.setItem('studentId', res.data.student_id);
            navigate('/user-dashboard');
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
    navigate('/user-dashboard');
  }

  useEffect(() => {
    document.title = 'Подтверждение студента';
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white text-center py-4">
              <i className="bi bi-shield-lock-fill fs-1"></i>
              <h4 className="mt-2 mb-0">Подтверждение</h4>
              <p className="mb-0 opacity-75">Введите 6-значный код</p>
            </div>
            <div className="card-body p-4">
              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="otp_digit" className="form-label fw-bold">
                  <i className="bi bi-pin me-1"></i>Код подтверждения
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-qr-code text-muted"></i>
                  </span>
                  <input
                    type="number"
                    name="otp_digit"
                    value={studentData.otp_digit}
                    onChange={handleChange}
                    className="form-control border-start-0"
                    id="otp_digit"
                    placeholder="Введите 6 цифр"
                    maxLength="6"
                  />
                </div>
                <div className="form-text mt-2">
                  <i className="bi bi-envelope-paper me-1"></i>
                  Код был отправлен на вашу электронную почту
                </div>
              </div>

              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
              >
                <i className="bi bi-check-lg me-2"></i>Подтвердить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyStudent;