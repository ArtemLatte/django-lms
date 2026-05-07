import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/course/';

function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  const [nextUrl, setnextUrl] = useState();
  const [previousUrl, setpreviousUrl] = useState();

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
        <i className="bi bi-grid-3x3-gap-fill me-2"></i>Все курсы
      </h3>

      <div className="row g-4 mb-4">
        {courseData &&
          courseData.map((course, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden course-card">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link
                      to={`/detail/${course.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {course.title}
                    </Link>
                  </h5>
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

export default AllCourses;