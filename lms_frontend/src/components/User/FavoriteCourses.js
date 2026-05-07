import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function FavoriteCourses() {
  const [courseData, setCourseData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-favorite-courses/' + studentId).then((res) => {
        console.log(res.data);
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = 'LMS | Любимые курсы';
  }, [studentId]);

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-4">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-danger text-white py-3">
              <h5 className="card-title mb-0">
                <i className="bi bi-heart-fill me-2"></i>
                Любимые курсы
                {courseData.length > 0 && (
                  <span className="badge bg-light text-dark ms-2 rounded-pill">{courseData.length}</span>
                )}
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">
                        <i className="bi bi-book me-1"></i>Название курса
                      </th>
                      <th className="pe-4">
                        <i className="bi bi-person me-1"></i>Автор
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
                            <i className="bi bi-file-text-fill text-danger me-1"></i>
                            {row.course.title}
                          </Link>
                        </td>
                        <td className="pe-4">
                          <Link
                            to={`/teacher-detail/${row.course.teacher.id}`}
                            className="text-decoration-none"
                          >
                            <i className="bi bi-person-badge me-1 text-secondary"></i>
                            {row.course.teacher.full_name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {courseData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-heartbreak display-1 text-muted"></i>
                  <p className="mt-3 text-muted">У вас пока нет любимых курсов.</p>
                  <Link to="/all-courses" className="btn btn-outline-danger rounded-pill">
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

export default FavoriteCourses;