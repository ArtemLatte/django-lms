import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';


function ProfileSetting(){
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div  className='card'>
                        <h5 className='card-header'>Настройки профиля | Изменить профиль</h5>
                        <div className='card-body'>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Имя</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">E-mail</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Фото профиля</label>
                                <div class="col-sm-10">
                                <input type="file" class="form-control" id="inputPassword"/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
                                <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputPassword"/>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Интересы</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" id="staticEmail"/>
                                </div>
                            </div>
                            <hr />
                            <button className='btn btn-primary'>Сохранить</button>
                        </div>
                    </div>
                    
                </section>
            </div>
        </div>
    )
}

export default ProfileSetting;