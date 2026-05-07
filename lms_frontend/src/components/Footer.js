import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Footer() {
  const [pagesData, setpagesData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + '/pages/').then((res) => {
        setpagesData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Логотип / о проекте */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-4">
              <i className="bi bi-mortarboard-fill me-2"></i>Образование Онлайн
            </h5>
            <p className="small text-white-50">
              Платформа для онлайн-обучения с лучшими курсами и преподавателями.
              Учитесь в любое время и в любом месте.
            </p>
            <div className="mt-3">
              <a href="#" className="text-white me-3" aria-label="Facebook">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-white me-3" aria-label="Twitter">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-white me-3" aria-label="Instagram">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-white" aria-label="YouTube">
                <i className="bi bi-youtube fs-5"></i>
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className="col-md-2 mb-4">
            <h6 className="text-uppercase mb-4">Навигация</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">
                  <i className="bi bi-house-door me-2"></i>Главная
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/all-courses" className="text-white-50 text-decoration-none">
                  <i className="bi bi-book me-2"></i>Курсы
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category" className="text-white-50 text-decoration-none">
                  <i className="bi bi-grid me-2"></i>Категории
                </Link>
              </li>
            </ul>
          </div>

          {/* Полезные ссылки (динамические страницы + FAQ + Contact) */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-4">Информация</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/faq" className="text-white-50 text-decoration-none">
                  <i className="bi bi-question-circle me-2"></i>FAQs
                </Link>
              </li>
              {pagesData &&
                pagesData.map((row, index) => (
                  <li className="mb-2" key={index}>
                    <Link
                      to={`/page/${row.id}${row.url}`}
                      className="text-white-50 text-decoration-none"
                    >
                      <i className="bi bi-file-text me-2"></i>{row.title}
                    </Link>
                  </li>
                ))}
              <li className="mb-2">
                <Link to="/contact-us" className="text-white-50 text-decoration-none">
                  <i className="bi bi-envelope me-2"></i>Связаться с нами
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-4">Контакты</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-white-50">
                <i className="bi bi-geo-alt me-2"></i> г. Красноярск, ул. Киренского, 7
              </li>
              <li className="mb-2 text-white-50">
                <i className="bi bi-envelope me-2"></i> info@obrazovanie.ru
              </li>
              <li className="mb-2 text-white-50">
                <i className="bi bi-telephone me-2"></i> +7 (727) 123-45-67
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя линия с копирайтом */}
        <div className="border-top border-secondary pt-3 mt-3 text-center">
          <p className="mb-0 text-white-50 small">
            © 2026 КИ22-14Б. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;