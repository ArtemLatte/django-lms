import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Category() {
  const [categoryData, setcategoryData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + '/category/').then((res) => {
        setcategoryData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4 mb-5">
      <h3 className="pb-1 mb-4">
        <i className="bi bi-grid-3x3-gap-fill me-2"></i>Все категории
      </h3>

      <div className="row g-4 mb-4">
        {categoryData &&
          categoryData.map((row, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden category-card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-folder-fill text-primary fs-2 me-3"></i>
                    <h5 className="card-title mb-0">
                      <Link
                        to={`/course/${row.id}/${row.title}`}
                        className="text-decoration-none text-dark"
                      >
                        {row.title}
                      </Link>
                    </h5>
                  </div>
                  <p className="card-text text-muted">
                    <i className="bi bi-book me-1"></i>
                    {row.total_courses} {row.total_courses === 1 ? 'курс' : row.total_courses < 5 ? 'курса' : 'курсов'}
                  </p>
                  {row.description && (
                    <p className="card-text small text-secondary">{row.description}</p>
                  )}
                  <Link
                    to={`/course/${row.id}/${row.title}`}
                    className="btn btn-outline-primary btn-sm mt-2 rounded-pill"
                  >
                    Перейти <i className="bi bi-arrow-right-short"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Пагинация закомментирована в оригинале — оставляем как есть */}
    </div>
  );
}

export default Category;