import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [searchString, setsearchString] = useState({
    search: '',
  });
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');

  const handleChange = (event) => {
    setsearchString({
      ...searchString,
      [event.target.name]: event.target.value,
    });
  };

  const searchCourse = () => {
    if (searchString.search !== '') {
      window.location.href = '/search/' + searchString.search;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Образование Онлайн
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Форма поиска остаётся на своём месте (вне collapse) */}
        <form className="d-flex me-lg-3" role="search" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input
              name="search"
              onChange={handleChange}
              className="form-control"
              type="search"
              placeholder="Искать курсы..."
              aria-label="Search"
            />
            <button
              onClick={searchCourse}
              className="btn btn-warning"
              type="button"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">
              <i className="bi bi-house-door me-1"></i>Главная
            </Link>
            <Link className="nav-link" to="/category">
              <i className="bi bi-grid me-1"></i>Категории
            </Link>
            <Link className="nav-link" to="/all-courses">
              <i className="bi bi-book me-1"></i>Курсы
            </Link>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-badge me-1"></i>Преподаватель
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                {teacherLoginStatus !== 'true' && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/teacher-login">
                        <i className="bi bi-box-arrow-in-right me-2"></i>Авторизация
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/teacher-register">
                        <i className="bi bi-person-plus me-2"></i>Регистрация
                      </Link>
                    </li>
                  </>
                )}
                {teacherLoginStatus === 'true' && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/teacher-dashboard">
                        <i className="bi bi-speedometer2 me-2"></i>Дашборд
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/teacher-logout">
                        <i className="bi bi-door-closed me-2"></i>Выйти
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-people me-1"></i>Студент
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                {studentLoginStatus !== 'true' && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/user-login">
                        <i className="bi bi-box-arrow-in-right me-2"></i>Авторизация
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user-register">
                        <i className="bi bi-person-plus me-2"></i>Регистрация
                      </Link>
                    </li>
                  </>
                )}
                {studentLoginStatus === 'true' && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/user-dashboard">
                        <i className="bi bi-speedometer2 me-2"></i>Дашборд
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user-logout">
                        <i className="bi bi-door-closed me-2"></i>Выйти
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;