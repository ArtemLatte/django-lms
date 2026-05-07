import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Dashboard() {
  useEffect(() => {
    document.title = 'LMS | Панель студента';
  }, []);

  const [dashbarData, setDashbarData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/student/dashboard/' + studentId).then((res) => {
        setDashbarData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-4">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="d-flex align-items-center mb-4">
            <i className="bi bi-speedometer2 fs-3 text-primary me-2"></i>
            <h4 className="mb-0">Панель управления</h4>
          </div>

          <div className="row g-4">
            {/* Всего курсов */}
            <div className="col-md-6 col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden stats-card">
                <div className="card-header bg-warning text-white py-3">
                  <i className="bi bi-cart-check-fill me-2"></i>
                  Всего курсов
                </div>
                <div className="card-body text-center py-4">
                  <h3 className="display-6 fw-bold mb-0">
                    <Link
                      to="/my-courses"
                      className="text-warning text-decoration-none"
                    >
                      {dashbarData.enrolled_courses || 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Любимых курсов */}
            <div className="col-md-6 col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden stats-card">
                <div className="card-header bg-danger text-white py-3">
                  <i className="bi bi-heart-fill me-2"></i>
                  Любимых курсов
                </div>
                <div className="card-body text-center py-4">
                  <h3 className="display-6 fw-bold mb-0">
                    <Link
                      to="/favorite-courses"
                      className="text-danger text-decoration-none"
                    >
                      {dashbarData.favorite_courses || 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Выполнено заданий */}
            <div className="col-md-6 col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden stats-card">
                <div className="card-header bg-success text-white py-3">
                  <i className="bi bi-journal-check me-2"></i>
                  Выполнено заданий
                </div>
                <div className="card-body text-center py-4">
                  <h3 className="display-6 fw-bold mb-0">
                    <Link
                      to="/my-assignments"
                      className="text-success text-decoration-none"
                    >
                      {dashbarData.complete_assignments || 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>

            {/* Выполняется заданий */}
            <div className="col-md-6 col-lg-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden stats-card">
                <div className="card-header bg-primary text-white py-3">
                  <i className="bi bi-journal-x me-2"></i>
                  Выполняется заданий
                </div>
                <div className="card-body text-center py-4">
                  <h3 className="display-6 fw-bold mb-0">
                    <Link
                      to="/my-assignments"
                      className="text-primary text-decoration-none"
                    >
                      {dashbarData.pending_assignments || 0}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;