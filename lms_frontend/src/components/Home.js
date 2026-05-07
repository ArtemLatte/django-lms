import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Home() {
  const [courseData, setCourseData] = useState([]);
  const [popularcourseData, setPopularcourseData] = useState([]);
  const [popularteacherData, setteacherData] = useState([]);
  const [testimonialData, settestimonialData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + '/course/?result=4').then((res) => {
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/popular-courses/?popular=1').then((res) => {
        setPopularcourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/popular-teachers/?popular=1').then((res) => {
        setteacherData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/student-testimonial').then((res) => {
        settestimonialData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4 mb-5">
      {/* Latest Courses */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="pb-1 mb-0">
          <i className="bi bi-clock-history me-2"></i>Последние курсы
        </h3>
        <Link to="/all-courses" className="btn btn-outline-primary btn-sm">
          Смотреть все <i className="bi bi-arrow-right-short"></i>
        </Link>
      </div>
      <div className="row g-4 mb-5">
        {courseData &&
          courseData.map((course, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden course-card">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${course.id}`} className="text-decoration-none text-dark">
                      {course.title}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Popular Courses */}
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
        <h3 className="pb-1 mb-0">
          <i className="bi bi-graph-up me-2"></i>Популярные курсы
        </h3>
        <Link to="/popular-courses" className="btn btn-outline-primary btn-sm">
          Смотреть все <i className="bi bi-arrow-right-short"></i>
        </Link>
      </div>
      <div className="row g-4 mb-5">
        {popularcourseData &&
          popularcourseData.map((row, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden course-card">
                <Link to={`/detail/${row.course.id}`}>
                  <img
                    src={row.course.featured_img}
                    className="card-img-top"
                    alt={row.course.title}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${row.course.id}`} className="text-decoration-none text-dark">
                      {row.course.title}
                    </Link>
                  </h5>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <div className="d-flex justify-content-between align-items-center small text-muted">
                    <span>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {row.rating}/5
                    </span>
                    <span>
                      <i className="bi bi-eye me-1"></i>
                      {row.course.course_views} раз(а)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Popular Teachers */}
      <div className="d-flex justify-content-between align-items-center mb-4 mt-5">
        <h3 className="pb-1 mb-0">
          <i className="bi bi-person-badge me-2"></i>Лучшие преподаватели
        </h3>
        <Link to="/popular-teachers" className="btn btn-outline-primary btn-sm">
          Смотреть все <i className="bi bi-arrow-right-short"></i>
        </Link>
      </div>
      <div className="row g-4 mb-5">
        {popularteacherData &&
          popularteacherData.map((teacher, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden text-center teacher-card">
                <Link to={`/teacher-detail/${teacher.id}`}>
                  <img
                    src={teacher.profile_img}
                    className="card-img-top rounded-circle mx-auto mt-3"
                    alt={teacher.full_name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/teacher-detail/${teacher.id}`} className="text-decoration-none text-dark">
                      {teacher.full_name}
                    </Link>
                  </h5>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <div className="small text-muted">
                    <i className="bi bi-book me-1"></i> Курсов: {teacher.total_teacher_courses}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Student Testimonial */}
      <h3 className="mb-4 mt-5">
        <i className="bi bi-chat-quote me-2"></i>Отзывы студентов
      </h3>
      <div
        id="carouselExampleIndicators"
        className="carousel slide bg-gradient-dark text-white py-5 rounded-4 shadow-lg"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {testimonialData &&
            testimonialData.map((row, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : undefined}
              ></button>
            ))}
        </div>

        <div className="carousel-inner">
          {testimonialData &&
            testimonialData.map((row, i) => (
              <div
                key={i}
                className={
                  i === 0
                    ? 'carousel-item text-center active'
                    : 'carousel-item text-center'
                }
              >
                <div className="container">
                  <i className="bi bi-quote display-1 opacity-50"></i>
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p className="fs-4 fst-italic">"{row.reviews}"</p>
                    </blockquote>
                    <figcaption className="blockquote-footer text-white-50">
                      <i className="bi bi-person-circle me-1"></i> {row.student.full_name} •{' '}
                      <cite title="Source Title">{row.course.title}</cite>
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Home;