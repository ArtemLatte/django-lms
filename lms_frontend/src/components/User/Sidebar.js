import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Sidebar() {
  const [notifData, setnotifData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/student/fetch-all-notifications/' + studentId).then((res) => {
        console.log(res);
        setnotifData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="list-group list-group-flush">
        <Link
          to="/user-dashboard"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-speedometer2 me-3 text-primary"></i>
          Дашборд
        </Link>
        <Link
          to="/my-courses"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-book-fill me-3 text-primary"></i>
          Мои курсы
        </Link>
        <Link
          to="/my-teachers"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-people-fill me-3 text-primary"></i>
          Мои преподаватели
        </Link>
        <Link
          to="/favorite-courses"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-heart-fill me-3 text-danger"></i>
          Любимые курсы
        </Link>
        <Link
          to="/recommended-courses"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-stars me-3 text-warning"></i>
          Рекомендуемые курсы
        </Link>
        <Link
          to="/my-assignments"
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <span>
            <i className="bi bi-journal-check me-3 text-success"></i>
            Задания
          </span>
          <span className="badge bg-danger rounded-pill">{notifData.length}</span>
        </Link>
        <Link
          to="/profile-setting"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-person-gear me-3 text-secondary"></i>
          Настройки профиля
        </Link>
        <Link
          to="/change-password"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <i className="bi bi-key-fill me-3 text-warning"></i>
          Сменить пароль
        </Link>
        <Link
          to="/user-logout"
          className="list-group-item list-group-item-action d-flex align-items-center text-danger"
        >
          <i className="bi bi-box-arrow-right me-3"></i>
          Выйти
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;