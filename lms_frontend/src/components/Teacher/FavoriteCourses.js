import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
function FavoriteCourses() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Любимые курсы</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Автор</th>
                                        <th>Создан</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>Php Development</td>
                                    <td><Link to="/">Имя Фамилия</Link></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm active">Удалить</button>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FavoriteCourses;