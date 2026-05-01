import {Link} from 'react-router-dom';

function TeacherSidebar(){
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/teacher-dashboard" className="list-group-item list-group-item-action">Дашборд</Link>
                <Link to="/teacher-courses" className="list-group-item list-group-item-action">Мои курсы</Link>
                <Link to="/add-course" className="list-group-item list-group-item-action">Добавить курс</Link>
                <Link to="/teacher-users" className="list-group-item list-group-item-action">Мои студенты</Link>
                <Link to="/quiz" className="list-group-item list-group-item-action">Quiz</Link>
                <Link to="/add-quiz" className="list-group-item list-group-item-action">Add Quiz</Link>
                <Link to="/teacher-profile-setting" className="list-group-item list-group-item-action">Настройки профиля</Link>
                <Link to="/teacher-change-password" className="list-group-item list-group-item-action">Сменить пароль</Link>
                <Link to="/teacher-logout" className="list-group-item list-group-item-action text-danger">Выйти</Link>
            </div>
        </div>
    )
}

export default TeacherSidebar;