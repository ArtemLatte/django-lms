import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function StudentAssignments() {
  const [assignmentData, setAssignmentData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/my-assignments/' + studentId).then((res) => {
        console.log(res.data);
        setAssignmentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = 'LMS | Мои задания';
  }, [studentId]);

  const markAsDone = (assignment_id, title, detail, student, teacher) => {
    const _formData = new FormData();
    _formData.append('student_status', true);
    _formData.append('title', title);
    _formData.append('detail', detail);
    _formData.append('student', student);
    _formData.append('teacher', teacher);

    try {
      axios
        .put(baseUrl + '/update-assignments/' + assignment_id, _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            window.location.reload();
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
            <div className="card-header bg-success text-white py-3">
              <h5 className="card-title mb-0">
                <i className="bi bi-journal-check me-2"></i>
                Мои задания
                {assignmentData.length > 0 && (
                  <span className="badge bg-light text-dark ms-2 rounded-pill">{assignmentData.length}</span>
                )}
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">
                        <i className="bi bi-file-text me-1"></i>Название
                      </th>
                      <th>
                        <i className="bi bi-info-circle me-1"></i>Описание
                      </th>
                      <th>
                        <i className="bi bi-person-badge me-1"></i>Преподаватель
                      </th>
                      <th className="pe-4 text-end">
                        <i className="bi bi-gear me-1"></i>Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentData.map((row, index) => (
                      <tr key={index}>
                        <td className="ps-4 fw-medium">
                          <i className="bi bi-pencil-square me-2 text-success"></i>
                          {row.title}
                        </td>
                        <td>{row.detail || '—'}</td>
                        <td>
                          <Link
                            to={`/teacher-detail/${row.teacher.id}`}
                            className="text-decoration-none"
                          >
                            <i className="bi bi-person-circle me-1 text-secondary"></i>
                            {row.teacher.full_name}
                          </Link>
                        </td>
                        <td className="pe-4 text-end">
                          {row.student_status === false && (
                            <button
                              onClick={() =>
                                markAsDone(
                                  row.id,
                                  row.title,
                                  row.detail,
                                  row.student.id,
                                  row.teacher.id
                                )
                              }
                              className="btn btn-success btn-sm rounded-pill"
                            >
                              <i className="bi bi-check-lg me-1"></i>Отметить выполненным
                            </button>
                          )}
                          {row.student_status === true && (
                            <span className="badge bg-success rounded-pill px-3 py-2">
                              <i className="bi bi-check-circle-fill me-1"></i>Выполнено
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {assignmentData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-inbox display-1 text-muted"></i>
                  <p className="mt-3 text-muted">У вас пока нет заданий.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudentAssignments;