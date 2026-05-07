import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function CheckQuizStatusStudent(props) {
  const [quizData, setQuizData] = useState({ bool: false }); // начальное значение
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`)
        .then((res) => {
          setQuizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [props.quiz, props.student]); // добавлены зависимости

  useEffect(() => {
    document.title = 'LMS | Все квизы';
  }, []);

  return (
    <div className="d-inline-block">
      {quizData.bool === true && (
        <Link
          className="btn btn-success btn-sm rounded-pill px-3"
          to={`/take-quiz/${props.quiz}`}
        >
          <i className="bi bi-pencil-square me-1"></i>Пройти квиз
        </Link>
      )}
      {quizData.bool === false && (
        <span className="badge bg-success rounded-pill px-3 py-2">
          <i className="bi bi-check-circle-fill me-1"></i>Выполнен
        </span>
      )}
    </div>
  );
}

export default CheckQuizStatusStudent;