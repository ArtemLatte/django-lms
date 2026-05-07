import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Search() {
  const [courseData, setCourseData] = useState([]);
  const { searchstring } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + '/search-courses/' + searchstring).then((res) => {
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <h3 className="pb-1 mb-4">
        <i className="bi bi-search me-2"></i>
        Найдено для <span className="text-primary">{searchstring}</span>
      </h3>

      {courseData && courseData.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle me-2"></i>
          По вашему запросу ничего не найдено. Попробуйте другие ключевые слова.
        </div>
      ) : (
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
      )}

      {/* Статическая пагинация (только стилизация, логика не меняется) */}
      <nav aria-label="Page navigation" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link rounded-pill px-4 me-2" href="#">
              <i className="bi bi-arrow-left me-2"></i>Назад
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-pill px-3" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-pill px-3" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-pill px-3" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-pill px-4 ms-2" href="#">
              Вперед<i className="bi bi-arrow-right ms-2"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Search;