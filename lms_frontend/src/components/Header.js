import {Link} from 'react-router-dom';

function Header() {
  const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus=localStorage.getItem('studentLoginStatus');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Образование Онлайн</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">Главная</Link>
            <Link className="nav-link" to="/all-courses">Курсы</Link>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Учитель
              </a>
              <ul className="dropdown-menu">
                {teacherLoginStatus!=='true' &&
                      <>
                      <li><Link className="dropdown-item" to="/teacher-login">Авторизация</Link></li>
                      <li><Link className="dropdown-item" to="/teacher-register">Регистрация</Link></li>
                      </>
                }
                {teacherLoginStatus==='true' &&
                    <>
                    <li><Link className="dropdown-item" to="/teacher-dashboard">Дашборд</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-logout">Выйти</Link></li>
                    </>
                }
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Студент
              </a>
              <ul className="dropdown-menu">
                {studentLoginStatus!== 'true' && 
                    <>
                    <li><Link className="dropdown-item" to="/user-login">Авторизация</Link></li>
                    <li><Link className="dropdown-item" to="/user-register">Регистрация</Link></li>
                    </>
                }
                {studentLoginStatus==='true' && 
                    <>
                    <li><Link className="dropdown-item" to="/user-dashboard">Дашборд</Link></li>
                    <li><Link className="dropdown-item" to="/user-logout">Выйти</Link></li>
                    </>
                }
              </ul>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
