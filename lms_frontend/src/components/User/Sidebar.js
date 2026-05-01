import {Link} from 'react-router-dom';

function Sidebar(){
    return (
        <div className="card">
            <div className="list-group list-group-flush">
                <Link to="/user-dashboard" className="list-group-item list-group-item-action">Дашборд</Link>
                <Link to="/my-courses" className="list-group-item list-group-item-action">Мои курсы</Link>
                <Link to="/favorite-courses" className="list-group-item list-group-item-action">Любимые курсы</Link>
                <Link to="/recommended-courses" className="list-group-item list-group-item-action">Рекомендуемые курсы</Link>
                <Link to="/my-assignments" className="list-group-item list-group-item-action">Assignments</Link>
                <Link to="/profile-setting" className="list-group-item list-group-item-action">Настройки профиля</Link>
                <Link to="/change-password" className="list-group-item list-group-item-action">Сменить пароль</Link>
                <Link to="/user-logout" className="list-group-item list-group-item-action text-danger">Выйти</Link>
            </div>
        </div>
    )
}

export default Sidebar;