import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function RecommendedCourses() {
  const [courseData, setCourseData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-recommended-courses/' + studentId).then((res) => {
        setCourseData(res.data.results);
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
          <div className="card">
            <div className="card-header bg-warning text-white">
              <h5 className="card-title mb-0">
                <i className="bi bi-stars text-white me-2"></i>
                Рекомендуемые курсы
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
                        <i className="bi bi-book me-1"></i>Название
                      </th>
                      <th className="pe-4">
                        <i className="bi bi-code-slash me-1"></i>Технологии
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.map((row, index) => (
                      <tr key={index}>
                        <td className="ps-4">
                          <Link
                            to={`/detail/${row.id}`}
                            className="text-decoration-none fw-medium"
                          >
                            <i className="bi bi-play-circle-fill me-2 text-warning"></i>
                            {row.title}
                          </Link>
                        </td>
                        <td className="pe-4">
                          {row.techs ? (
                            row.techs.split(',').map((tech, i) => (
                              <span key={i} className="badge bg-light text-dark me-1">
                                {tech.trim()}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {courseData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-compass display-1 text-muted"></i>
                  <p className="mt-3 text-muted">Пока нет рекомендованных курсов.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RecommendedCourses;