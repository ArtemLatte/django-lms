import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function StudyMaterials() {
  const [studyData, setstudyData] = useState([]);
  const [totalResult, settotalResult] = useState(0);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + '/user/study-materials/' + course_id).then((res) => {
        settotalResult(res.data.length);
        setstudyData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [course_id]);

  const downloadFile = (file_url) => {
    window.location.href = file_url;
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-4">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-primary text-white py-3">
              <h5 className="card-title mb-0">
                <i className="bi bi-journal-bookmark-fill me-2"></i>
                Материалы для изучения
                {totalResult > 0 && <span className="badge bg-light text-dark ms-2 rounded-pill">{totalResult}</span>}
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">
                        <i className="bi bi-file-text me-1"></i>Название
                      </th>
                      <th>
                        <i className="bi bi-info-circle me-1"></i>Подробности
                      </th>
                      <th>
                        <i className="bi bi-download me-1"></i>Обучающий материал
                      </th>
                      <th className="pe-4">
                        <i className="bi bi-pencil me-1"></i>Примечания
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studyData.map((row, index) => (
                      <tr key={index}>
                        <td className="ps-4 fw-medium">
                          <i className="bi bi-file-earmark me-2 text-primary"></i>
                          {row.title}
                        </td>
                        <td>{row.description || '—'}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm rounded-pill"
                            onClick={() => downloadFile(row.upload)}
                          >
                            <i className="bi bi-cloud-arrow-down me-1"></i>Скачать файл
                          </button>
                        </td>
                        <td className="pe-4">{row.remarks || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {studyData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-folder-x display-1 text-muted"></i>
                  <p className="mt-3 text-muted">Для этого курса пока нет учебных материалов.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StudyMaterials;