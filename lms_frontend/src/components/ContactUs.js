import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/contact/';

function ContactUs() {
  const [ContactData, setContactData] = useState({
    full_name: '',
    email: '',
    query_txt: '',
    status: '',
  });

  const handleChange = (event) => {
    setContactData({
      ...ContactData,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = () => {
    const contactFormData = new FormData();
    contactFormData.append('full_name', ContactData.full_name);
    contactFormData.append('email', ContactData.email);
    contactFormData.append('query_txt', ContactData.query_txt);

    try {
      axios.post(baseUrl, contactFormData).then((response) => {
        setContactData({
          full_name: '',
          email: '',
          query_txt: '',
          status: 'success',
        });
      });
    } catch (error) {
      console.log(error);
      setContactData({ status: 'error' });
    }
  };

  const listStyle = {
    listStyle: 'none',
  };

  useEffect(() => {
    document.title = 'Связаться с нами';
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row g-4">
        {/* Форма обратной связи */}
        <div className="col-lg-7">
          {ContactData.status === 'success' && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              Спасибо, ваше сообщение отправлено!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
          {ContactData.status === 'error' && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Что-то пошло не так. Попробуйте позже.
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}

          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="card-title mb-0">
                <i className="bi bi-envelope-paper-fill me-2"></i>
                Связаться с нами
              </h5>
            </div>
            <div className="card-body p-4">
              <div className="mb-3">
                <label htmlFor="full_name" className="form-label fw-bold">
                  <i className="bi bi-person me-1"></i>Имя
                </label>
                <input
                  value={ContactData.full_name}
                  onChange={handleChange}
                  name="full_name"
                  type="text"
                  className="form-control rounded-pill"
                  id="full_name"
                  placeholder="Введите ваше имя"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  <i className="bi bi-envelope me-1"></i>E-mail
                </label>
                <input
                  value={ContactData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="form-control rounded-pill"
                  id="email"
                  placeholder="example@mail.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="query_txt" className="form-label fw-bold">
                  <i className="bi bi-chat-dots me-1"></i>Запрос
                </label>
                <textarea
                  rows="6"
                  value={ContactData.query_txt}
                  onChange={handleChange}
                  name="query_txt"
                  className="form-control rounded-3"
                  id="query_txt"
                  placeholder="Опишите ваш вопрос или предложение..."
                ></textarea>
              </div>
              <button onClick={submitForm} type="submit" className="btn btn-primary rounded-pill px-4 py-2">
                <i className="bi bi-send me-2"></i>Отправить
              </button>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="col-lg-4 offset-lg-1">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100 bg-light">
            <div className="card-body p-4">
              <h3 className="border-bottom pb-3 mb-4">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                Адрес
              </h3>
              <ul className="m-0 p-0" style={listStyle}>
                <li className="mb-3 d-flex">
                  <i className="bi bi-building fs-5 text-primary me-3"></i>
                  <div>
                    <label className="fw-bold d-block">Адрес:</label>
                    <span className="text-muted">Киренского 7, ауд. 320</span>
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-telephone fs-5 text-primary me-3"></i>
                  <div>
                    <label className="fw-bold d-block">Номер:</label>
                    <span className="text-muted">+7 (123) 456-78-90</span>
                  </div>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-envelope fs-5 text-primary me-3"></i>
                  <div>
                    <label className="fw-bold d-block">Почта:</label>
                    <span className="text-muted">Красноярск, 669988</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;