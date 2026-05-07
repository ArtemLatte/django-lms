import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CheckQuizStatusStudent from './CheckQuizStatusStudent';

const baseUrl = 'http://127.0.0.1:8000/api';

function CourseQuizList() {
  const studentId = localStorage.getItem('studentId');
  const [quizData, setQuizData] = useState([]);
  const { course_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-assigned-quiz/' + course_id).then((res) => {
        setQuizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [course_id]);

  useEffect(() => {
    document.title = 'LMS | Список квизов';
  }, []);

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
                <i className="bi bi-question-circle-fill me-2"></i>
                Список квизов
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">
                        <i className="bi bi-file-text me-1"></i>Квиз
                      </th>
                      <th className="pe-4 text-end">
                        <i className="bi bi-gear me-1"></i>Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizData.map((row, index) => (
                      <tr key={index}>
                        <td className="ps-4">
                          <i className="bi bi-quote me-2 text-primary"></i>
                          {row.quiz.title}
                        </td>
                        <td className="pe-4 text-end">
                          <CheckQuizStatusStudent quiz={row.quiz.id} student={studentId} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {quizData.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-journal-x display-1 text-muted"></i>
                  <p className="mt-3 text-muted">К этому курсу пока не добавлено ни одного квиза.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CourseQuizList;