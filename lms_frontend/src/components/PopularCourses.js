import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/popular-courses/';

function PopularCourses() {
  const [courseData, setCourseData] = useState([]);
  const [nextUrl, setnextUrl] = useState();
  const [previousUrl, setpreviousUrl] = useState();

  useEffect(() => {
    document.title = 'LMS | Популярные курсы';
  }, []);

  useEffect(() => {
    fetchData(baseUrl);
  }, []);

  const paginationHandler = (url) => {
    fetchData(url);
  };

  function fetchData(url) {
    try {
      axios.get(url).then((res) => {
        setnextUrl(res.data.next);
        setpreviousUrl(res.data.previous);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-4 mb-5">
      <h3 className="pb-1 mb-4">
        <i className="bi bi-graph-up me-2"></i>Популярные курсы
      </h3>

      <div className="row g-4 mb-4">
        {courseData &&
          courseData.map((row, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden course-card">
                <Link to={`/detail/${row.course.id}`}>
                  <img
                    src={row.course.featured_img}
                    className="card-img-top"
                    alt={row.course.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link
                      to={`/detail/${row.course.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {row.course.title}
                    </Link>
                  </h5>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <div className="d-flex justify-content-between align-items-center small text-muted">
                    <span>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {row.rating}/5
                    </span>
                    <span>
                      <i className="bi bi-eye me-1"></i>
                      {row.course.course_views} раз(а)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Пагинация */}
      {(previousUrl || nextUrl) && (
        <nav aria-label="Page navigation" className="mt-5">
          <ul className="pagination justify-content-center">
            {previousUrl && (
              <li className="page-item">
                <button
                  className="page-link rounded-pill px-4 me-2"
                  onClick={() => paginationHandler(previousUrl)}
                >
                  <i className="bi bi-arrow-left me-2"></i>Назад
                </button>
              </li>
            )}
            {nextUrl && (
              <li className="page-item">
                <button
                  className="page-link rounded-pill px-4"
                  onClick={() => paginationHandler(nextUrl)}
                >
                  Далее<i className="bi bi-arrow-right ms-2"></i>
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default PopularCourses;