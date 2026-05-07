import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function PopularTeachers() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    axios.get(baseUrl + '/teacher/').then((response) => {
      setTeacher(response.data);
    });
  }, []);

  console.log(teacher);

  return (
    <div className="container mt-4 mb-5">
      <h3 className="pb-1 mb-4">
        <i className="bi bi-person-badge me-2"></i>Лучшие учителя
      </h3>

      <div className="row g-4 mb-4">
        {/* 8 статических карточек учителей (без изменений в логике отображения) */}
        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <Link to="/detail/1">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1" className="text-decoration-none text-dark">
                  Преподаватель
                </Link>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <a href="#">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#" className="text-decoration-none text-dark">
                  Преподаватель
                </a>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <a href="#">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#" className="text-decoration-none text-dark">
                  Преподаватель
                </a>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <a href="#">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#" className="text-decoration-none text-dark">
                  Преподаватель
                </a>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <Link to="/detail/1">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1" className="text-decoration-none text-dark">
                  Преподаватель
                </Link>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <Link to="/detail/1">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1" className="text-decoration-none text-dark">
                  Преподаватель
                </Link>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <Link to="/detail/1">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1" className="text-decoration-none text-dark">
                  Преподаватель
                </Link>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden teacher-card text-center">
            <Link to="/detail/1">
              <img
                src="teacher.png"
                className="card-img-top rounded-circle mx-auto mt-3"
                alt="Преподаватель"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1" className="text-decoration-none text-dark">
                  Преподаватель
                </Link>
              </h5>
            </div>
            <div className="card-footer bg-white border-top-0">
              <div className="d-flex justify-content-center align-items-center small text-muted">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>Рейтинг: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Пагинация (статические ссылки) */}
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

export default PopularTeachers;