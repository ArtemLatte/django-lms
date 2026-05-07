import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function TakeQuiz() {
  const studentId = localStorage.getItem('studentId');
  const [questionData, setQuestionData] = useState([]);
  const { quiz_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + '/quiz-questions/' + quiz_id + '/1').then((res) => {
        setQuestionData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [quiz_id]);

  useEffect(() => {
    document.title = 'LMS | Прохождение квиза';
  }, []);

  const submitAnswer = (question_id, right_ans) => {
    const _formData = new FormData();
    _formData.append('student', studentId);
    _formData.append('quiz', quiz_id);
    _formData.append('question', question_id);
    _formData.append('right_ans', right_ans);

    try {
      axios
        .post(baseUrl + '/attempt-quiz/', _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            try {
              axios
                .get(baseUrl + '/quiz-questions/' + quiz_id + '/next-question/' + question_id)
                .then((res) => {
                  setQuestionData(res.data);
                });
            } catch (error) {
              console.log(error);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row g-4">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9">
          <div className="d-flex align-items-center mb-4">
            <i className="bi bi-pencil-square fs-3 text-primary me-2"></i>
            <h4 className="mb-0">Прохождение квиза</h4>
          </div>

          {questionData.length === 0 ? (
            <div className="card border-0 shadow-sm rounded-4 text-center py-5">
              <i className="bi bi-trophy display-1 text-muted"></i>
              <p className="mt-3 text-muted">Квиз завершён! Спасибо за участие.</p>
              <Link to="/my-courses" className="btn btn-outline-primary rounded-pill mt-2">
                <i className="bi bi-arrow-left me-2"></i>Назад к курсам
              </Link>
            </div>
          ) : (
            questionData.map((row, index) => (
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4" key={index}>
                <div className="card-header bg-primary text-white py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-question-circle-fill me-2"></i>
                    Вопрос {index + 1}: {row.question}
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <button
                        onClick={() => submitAnswer(row.id, row.ans1)}
                        className="btn btn-outline-primary w-100 py-3 rounded-4 text-start quiz-option-btn"
                      >
                        <i className="bi bi-1-circle me-2"></i>
                        {row.ans1}
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        onClick={() => submitAnswer(row.id, row.ans2)}
                        className="btn btn-outline-primary w-100 py-3 rounded-4 text-start quiz-option-btn"
                      >
                        <i className="bi bi-2-circle me-2"></i>
                        {row.ans2}
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        onClick={() => submitAnswer(row.id, row.ans3)}
                        className="btn btn-outline-primary w-100 py-3 rounded-4 text-start quiz-option-btn"
                      >
                        <i className="bi bi-3-circle me-2"></i>
                        {row.ans3}
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        onClick={() => submitAnswer(row.id, row.ans4)}
                        className="btn btn-outline-primary w-100 py-3 rounded-4 text-start quiz-option-btn"
                      >
                        <i className="bi bi-4-circle me-2"></i>
                        {row.ans4}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default TakeQuiz;