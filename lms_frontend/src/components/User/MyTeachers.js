import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function MyTeachers() {
  const [teacherData, setTeacherData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-my-teachers/' + studentId).then((res) => {
        setTeacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = 'Мои учителя';
  }, [studentId]);

  const [groupMsgData, setGroupMsgData] = useState({
    msg_text: '',
  });
  const [groupsuccessMsg, setGroupSuccessMsg] = useState('');
  const [grouperrorMsg, setGroupErrorMsg] = useState('');

  const [msgData, setMsgData] = useState({
    msg_text: '',
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event) => {
    setMsgData({
      ...msgData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = (teacher_id) => {
    const _formData = new FormData();
    _formData.append('msg_text', msgData.msg_text);
    _formData.append('msg_from', 'student');

    try {
      axios.post(baseUrl + '/send-message/' + teacher_id + '/' + studentId, _formData).then((res) => {
        if (res.data.bool == true) {
          setMsgData({ msg_text: '' });
          setSuccessMsg(res.data.msg);
          setErrorMsg('');
        } else {
          setSuccessMsg('');
          setErrorMsg(res.data.msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const groupHandleChange = (event) => {
    setGroupMsgData({
      ...groupMsgData,
      [event.target.name]: event.target.value,
    });
  };

  const groupFormSubmit = () => {
    const _formData = new FormData();
    _formData.append('msg_text', groupMsgData.msg_text);
    _formData.append('msg_from', 'student');

    try {
      axios.post(baseUrl + '/send-group-message-from-student/' + studentId, _formData).then((res) => {
        if (res.data.bool == true) {
          setGroupMsgData({ msg_text: '' });
          setGroupSuccessMsg(res.data.msg);
          setGroupErrorMsg('');
        } else {
          setGroupSuccessMsg('');
          setGroupErrorMsg(res.data.msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-4">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="bi bi-people-fill me-2"></i>Мои учителя
              </h5>
              <button
                type="button"
                className="btn btn-light btn-sm rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#groupMsgModal"
              >
                <i className="bi bi-chat-dots-fill me-1"></i>Отправить всем
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">
                        <i className="bi bi-person-badge me-1"></i>Имя
                      </th>
                      <th className="pe-4 text-end">
                        <i className="bi bi-chat me-1"></i>Действие
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherData.map((row, index) => (
                      <tr key={index}>
                        <td className="ps-4">
                          <Link
                            to={`/teacher-detail/${row.teacher.id}`}
                            className="text-decoration-none fw-medium"
                          >
                            <i className="bi bi-person-circle me-2 text-primary"></i>
                            {row.teacher.full_name}
                          </Link>
                        </td>
                        <td className="pe-4 text-end">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target={`#msgModal${index}`}
                            className="btn btn-outline-primary btn-sm rounded-pill"
                            title="Написать сообщение"
                          >
                            <i className="bi bi-chat-fill me-1"></i>Сообщение
                          </button>

                          {/* Модальное окно для переписки */}
                          <div
                            className="modal fade"
                            id={`msgModal${index}`}
                            tabIndex="-1"
                            aria-labelledby={`msgModalLabel${index}`}
                            aria-hidden="true"
                          >
                            <div className="modal-dialog modal-fullscreen">
                              <div className="modal-content rounded-4 border-0 shadow-lg">
                                <div className="modal-header bg-primary text-white">
                                  <h5 className="modal-title" id={`msgModalLabel${index}`}>
                                    <i className="bi bi-chat-dots-fill me-2"></i>
                                    Диалог с <span className="text-warning">{row.teacher.full_name}</span>
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body p-0">
                                  <div className="row g-0 h-100">
                                    <div className="col-md-8 border-end">
                                      <MessageList teacher_id={row.teacher.id} student_id={studentId} />
                                    </div>
                                    <div className="col-md-4 p-3">
                                      {successMsg && (
                                        <div className="alert alert-success alert-sm">
                                          <i className="bi bi-check-circle me-1"></i> {successMsg}
                                        </div>
                                      )}
                                      {errorMsg && (
                                        <div className="alert alert-danger alert-sm">
                                          <i className="bi bi-exclamation-triangle me-1"></i> {errorMsg}
                                        </div>
                                      )}
                                      <form>
                                        <div className="mb-3">
                                          <label htmlFor={`msgText_${index}`} className="form-label fw-bold">
                                            <i className="bi bi-pencil-square me-1"></i>Сообщение
                                          </label>
                                          <textarea
                                            onChange={handleChange}
                                            value={msgData.msg_text}
                                            name="msg_text"
                                            className="form-control rounded-3"
                                            rows="5"
                                            id={`msgText_${index}`}
                                            placeholder="Введите ваше сообщение..."
                                          ></textarea>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => formSubmit(row.teacher.id)}
                                          className="btn btn-primary rounded-pill px-4"
                                        >
                                          <i className="bi bi-send me-2"></i>Отправить
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {teacherData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-people display-1 text-muted"></i>
                  <p className="mt-3 text-muted">У вас пока нет учителей.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Модальное окно для группового сообщения всем учителям */}
      <div
        className="modal fade"
        id="groupMsgModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="groupMsgModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow-lg">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="groupMsgModalLabel">
                <i className="bi bi-chat-dots me-2"></i>Отправить сообщение всем учителям
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              {groupsuccessMsg && (
                <div className="alert alert-success">
                  <i className="bi bi-check-circle me-1"></i> {groupsuccessMsg}
                </div>
              )}
              {grouperrorMsg && (
                <div className="alert alert-danger">
                  <i className="bi bi-exclamation-triangle me-1"></i> {grouperrorMsg}
                </div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="groupMsgText" className="form-label fw-bold">
                    <i className="bi bi-chat-text-fill me-1"></i>Сообщение
                  </label>
                  <textarea
                    onChange={groupHandleChange}
                    value={groupMsgData.msg_text}
                    name="msg_text"
                    className="form-control rounded-3"
                    rows="8"
                    id="groupMsgText"
                    placeholder="Введите сообщение для всех учителей..."
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={groupFormSubmit}
                  className="btn btn-primary rounded-pill px-4"
                >
                  <i className="bi bi-send me-2"></i>Отправить всем
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTeachers;