import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function MyCourses() {
  const [courseData, setcourseData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-enrolled-courses/' + studentId).then((res) => {
        console.log(res.data);
        setcourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

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
                <i className="bi bi-book-fill me-2"></i>
                Мои курсы
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">
                        <i className="bi bi-file-text me-1"></i>Название курса
                      </th>
                      <th>
                        <i className="bi bi-person me-1"></i>Автор
                      </th>
                      <th className="pe-4 text-end">
                        <i className="bi bi-gear me-1"></i>Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.map((row, index) => (
                      <tr key={index}>
                        <td className="ps-4">
                          <Link
                            to={`/detail/${row.course.id}`}
                            className="text-decoration-none fw-medium"
                          >
                            <i className="bi bi-file-text-fill me-1"></i>
                            {row.course.title}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/teacher-detail/${row.course.teacher.id}`}
                            className="text-decoration-none"
                          >
                            <i className="bi bi-person-badge me-1 text-secondary"></i>
                            {row.course.teacher.full_name}
                          </Link>
                        </td>
                        <td className="pe-4 text-end">
                          <Link
                            className="btn btn-sm btn-warning rounded-pill me-2"
                            to={`/course-quiz/${row.course.id}`}
                          >
                            <i className="bi bi-question-circle me-1"></i>Квизы
                          </Link>
                          <Link
                            className="btn btn-sm btn-primary rounded-pill"
                            to={`/user/study-materials/${row.course.id}`}
                          >
                            <i className="bi bi-mortarboard me-1"></i>Материалы
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {courseData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-journal-x display-1 text-muted"></i>
                  <p className="mt-3 text-muted">Вы ещё не записаны ни на один курс</p>
                  <Link to="/all-courses" className="btn btn-outline-primary rounded-pill">
                    <i className="bi bi-search me-2"></i>Найти курсы
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;