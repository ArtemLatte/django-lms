import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const siteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api';

function CourseDetail() {
  const [courseData, setcourseData] = useState([]);
  const [chapterData, setchapterData] = useState([]);
  const [teacherData, setteacherData] = useState([]);
  const [relatedcourseData, setrelatedcourseData] = useState([]);
  const [techListData, settechListData] = useState([]);
  const [userLoginStatus, setuserLoginStatus] = useState();
  const [enrollStatus, setenrollStatus] = useState();
  const [ratingStatus, setratingStatus] = useState();
  const [courseViews, setcourseViews] = useState(0);
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [AvgRating, setAvgRating] = useState(0);
  let { course_id } = useParams();
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    // Fetch Courses
    try {
      axios.get(baseUrl + '/course/' + course_id).then((res) => {
        setcourseData(res.data);
        setchapterData(res.data.course_chapters);
        setteacherData(res.data.teacher);
        setrelatedcourseData(JSON.parse(res.data.related_videos));
        settechListData(res.data.tech_list);
        if (res.data.course_rating != '' && res.data.course_rating != null) {
          setAvgRating(res.data.course_rating);
        }
      });

      axios.get(baseUrl + '/update-view/' + course_id).then((res) => {
        setcourseViews(res.data.views);
      });
    } catch (error) {
      console.log(error);
    }

    // Fetch enroll status
    try {
      axios
        .get(baseUrl + '/fetch-enroll-status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool == true) {
            setenrollStatus('success');
          }
        });
    } catch (error) {
      console.log(error);
    }

    // Fetch rating status
    try {
      axios
        .get(baseUrl + '/fetch-rating-status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool == true) {
            setratingStatus('success');
          }
        });
    } catch (error) {
      console.log(error);
    }

    try {
      axios
        .get(baseUrl + '/fetch-favorite-status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool == true) {
            setFavoriteStatus('success');
          } else {
            setFavoriteStatus('');
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus == 'true') {
      setuserLoginStatus('success');
    }
  }, []);

  const enrollCourse = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);

    try {
      axios
        .post(baseUrl + '/student-enroll-course/', _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              title: 'You have successfully enrolled in this course',
              icon: 'success',
              toast: true,
              timer: 10000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setenrollStatus('success');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const markAsFavorite = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    _formData.append('status', true);

    try {
      axios
        .post(baseUrl + '/student-add-favorite-course/', _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: 'This course has been added in your wish list',
              icon: 'success',
              toast: true,
              timer: 3000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setFavoriteStatus('success');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = (pk) => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    _formData.append('status', false);

    try {
      axios
        .get(baseUrl + '/student-remove-favorite-course/' + course_id + '/' + studentId, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: 'This course has been removed from your wish list',
              icon: 'success',
              toast: true,
              timer: 3000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            });
            setFavoriteStatus('');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [ratingData, setratingData] = useState({
    rating: '',
    reviews: '',
  });

  const handleChange = (event) => {
    setratingData({
      ...ratingData,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = () => {
    const _formRatingData = new FormData();
    _formRatingData.append('course', course_id);
    _formRatingData.append('student', studentId);
    _formRatingData.append('rating', ratingData.rating);
    _formRatingData.append('reviews', ratingData.reviews);

    try {
      axios
        .post(baseUrl + '/course-rating/' + course_id, _formRatingData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Swal.fire({
              title: 'Rating has been saved',
              icon: 'success',
              toast: true,
              timer: 5000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            });
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 pb-5">
      <div className="row g-4">
        {/* Левая колонка: изображение */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              src={courseData.featured_img}
              className="card-img-top"
              alt={courseData.title}
              style={{ objectFit: 'cover', height: 'auto' }}
            />
          </div>
        </div>

        {/* Правая колонка: информация о курсе */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <div className="card-body">
              <h3 className="card-title mb-3">
                <i className="bi bi-book-fill me-2 text-primary"></i>
                {courseData.title}
              </h3>
              <p className="card-text text-muted">{courseData.description}</p>

              <hr />

              <p className="fw-bold">
                <i className="bi bi-person-circle me-2 text-secondary"></i>
                Автор:{' '}
                <Link to={`/teacher-detail/${teacherData.id}`} className="text-decoration-none">
                  {teacherData.full_name}
                </Link>
              </p>

              <p className="fw-bold">
                <i className="bi bi-code-slash me-2 text-secondary"></i>
                Технологии:&nbsp;
                {techListData.map((tech, index) => (
                  <Link
                  key={index}
                  to={`/course/${courseData.category?.id}/${tech.trim()}`}
                  className="badge bg-warning text-dark rounded-pill me-1 text-decoration-none"
                >
                  {tech.trim()}
                </Link>
                ))}
              </p>

              <p className="fw-bold">
                <i className="bi bi-clock-history me-2 text-secondary"></i>
                Продолжительность: 3 Часа 30 Минут
              </p>

              <p className="fw-bold">
                <i className="bi bi-people me-2 text-secondary"></i>
                Всего студентов: {courseData.total_enrolled_students} Студент(ов)
              </p>

              <p className="fw-bold">
                <i className="bi bi-star-fill me-2 text-warning"></i>
                Рейтинг: {AvgRating}/5
                {enrollStatus === 'success' && userLoginStatus === 'success' && (
                  <>
                    {ratingStatus != 'success' && (
                      <button
                        className="btn btn-outline-success btn-sm ms-2 rounded-pill"
                        data-bs-toggle="modal"
                        data-bs-target="#ratingModal"
                      >
                        <i className="bi bi-pencil-square me-1"></i>Оценить курс
                      </button>
                    )}
                    {ratingStatus == 'success' && (
                      <small className="badge bg-info text-dark ms-2 rounded-pill">
                        <i className="bi bi-check-circle me-1"></i>Вы уже записаны на этот курс
                      </small>
                    )}

                    {/* Модальное окно для оценки */}
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0 shadow-lg">
                          <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="ratingModalLabel">
                              <i className="bi bi-star me-2"></i>Оценить курс {courseData.title}
                            </h5>
                            <button
                              type="button"
                              className="btn-close btn-close-white"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body p-4">
                            <div className="mb-3">
                              <label htmlFor="ratingSelect" className="form-label fw-bold">
                                <i className="bi bi-star-fill text-warning me-1"></i>Рейтинг
                              </label>
                              <select
                                onChange={handleChange}
                                className="form-select rounded-pill"
                                name="rating"
                                id="ratingSelect"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="reviewsTextarea" className="form-label fw-bold">
                                <i className="bi bi-chat-dots me-1"></i>Комментарий
                              </label>
                              <textarea
                                onChange={handleChange}
                                className="form-control rounded-3"
                                name="reviews"
                                rows="5"
                                id="reviewsTextarea"
                                placeholder="Поделитесь своим мнением о курсе..."
                              ></textarea>
                            </div>
                            <button
                              type="button"
                              onClick={formSubmit}
                              className="btn btn-primary rounded-pill px-4"
                            >
                              <i className="bi bi-save me-2"></i>Сохранить
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </p>

              <p className="fw-bold">
                <i className="bi bi-eye me-2 text-secondary"></i>
                Просмотрено: {courseViews} раз(а)
              </p>

              {enrollStatus === 'success' && userLoginStatus === 'success' && (
                <div className="alert alert-success rounded-pill">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <span>Вы уже записаны на этот курс</span>
                </div>
              )}

              {userLoginStatus === 'success' && enrollStatus !== 'success' && (
                <button onClick={enrollCourse} type="button" className="btn btn-success rounded-pill px-4">
                  <i className="bi bi-cart-plus me-2"></i>Запишитесь на этот курс
                </button>
              )}

              {userLoginStatus === 'success' && favoriteStatus !== 'success' && (
                <button
                  onClick={markAsFavorite}
                  title="Добавить в любимые курсы"
                  type="button"
                  className="btn btn-outline-danger rounded-pill me-2"
                >
                  <i className="bi bi-heart"></i> В избранное
                </button>
              )}

              {userLoginStatus === 'success' && favoriteStatus === 'success' && (
                <button
                  onClick={() => removeFavorite()}
                  title="Удалить из любимых курсов"
                  type="button"
                  className="btn btn-danger rounded-pill me-2"
                >
                  <i className="bi bi-heart-fill me-1"></i> В избранном
                </button>
              )}

              {userLoginStatus !== 'success' && (
                <Link to="/user-login" className="btn btn-warning rounded-pill">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Авторизируйтесь для записи на курс
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Список глав (доступен только при записи) */}
      {enrollStatus === 'success' && userLoginStatus === 'success' && (
        <div className="card mt-5 border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-primary text-white py-3">
            <h5 className="card-title mb-0">
              <i className="bi bi-play-circle me-2"></i>В этом курсе
            </h5>
          </div>
          <div className="list-group list-group-flush">
            {chapterData.map((chapter, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-camera-video me-2 text-primary"></i>
                  <span className="fw-medium">{chapter.title}</span>
                </div>
                <div>
                  <span className="badge bg-secondary rounded-pill me-3">
                    <i className="bi bi-clock me-1"></i> 1 ч 30 мин
                  </span>
                  <button
                    className="btn btn-sm btn-danger rounded-circle"
                    data-bs-toggle="modal"
                    data-bs-target={`#videoModal-${index}`}
                  >
                    <i className="bi bi-youtube"></i>
                  </button>
                </div>

                {/* Модальное окно для видео */}
                <div
                  className="modal fade"
                  id={`videoModal-${index}`}
                  tabIndex="-1"
                  aria-labelledby={`videoModalLabel-${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content rounded-4 border-0 shadow-lg">
                      <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title" id={`videoModalLabel-${index}`}>
                          <i className="bi bi-play-btn me-2"></i>
                          {chapter.title}
                        </h5>
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body p-0">
                        <div className="ratio ratio-16x9">
                          <iframe
                            src={chapter.video}
                            title={chapter.title}
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Похожие курсы */}
      <h3 className="mt-5 mb-4">
        <i className="bi bi-diagram-3 me-2 text-primary"></i>
        Похожие курсы
      </h3>
      <div className="row g-4">
        {relatedcourseData.map((rcourse, index) => (
          <div className="col-md-3" key={index}>
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden course-card">
              <Link target="_blank" to={`/detail/${rcourse.pk}`}>
                <img
                  src={`${siteUrl}media/${rcourse.fields.featured_img}`}
                  className="card-img-top"
                  alt={rcourse.fields.title}
                  style={{ height: '160px', objectFit: 'cover' }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">
                  <Link
                    to={`/detail/${rcourse.pk}`}
                    className="text-decoration-none text-dark"
                  >
                    {rcourse.fields.title}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseDetail;