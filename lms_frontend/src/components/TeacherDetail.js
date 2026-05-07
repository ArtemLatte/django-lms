import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherDetail() {
  const [teacherData, setteacherData] = useState([]);
  const [courseData, setcourseData] = useState([]);
  const [skillList, setskillList] = useState([]);
  let { teacher_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + '/teacher/' + teacher_id).then((res) => {
        setteacherData(res.data);
        setcourseData(res.data.teacher_courses);
        setskillList(res.data.skill_list);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const icon_style = {
    fontSize: '28px',
    width: '40px',
    height: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s',
  };

  return (
    <div className="container mt-4 pb-5">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <img
              src={teacherData.profile_img}
//              src="../logo512.png"
              className="card-img-top"
              alt="Фото профиля"
              style={{ objectFit: 'cover', width: '100%', aspectRatio: '1/1' }}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">
                <i className="bi bi-person-badge me-2 text-primary"></i>
                {teacherData.full_name}
              </h3>
              <p className="card-text text-muted">{teacherData.detail}</p>

              <p className="fw-bold">
                <i className="bi bi-trophy-fill me-2 text-warning"></i>
                Навыки:&nbsp;
                {skillList.map((skill, index) => (
                  <Link
                    key={index}
                    to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`}
                    className="badge bg-warning text-dark rounded-pill me-1 mb-1 text-decoration-none"
                  >
                    <i className="bi bi-tag me-1"></i>
                    {skill.trim()}
                  </Link>
                ))}
              </p>

              <p className="fw-bold">
                <i className="bi bi-book me-2 text-secondary"></i>
                Последний курс:{' '}
                <Link to="/category/php" className="text-decoration-none">
                  ReactJs Course
                </Link>
              </p>

              <div className="mt-3">
                {teacherData.vk_url && (
                  <a
                    href={teacherData.vk_url}
                    className="btn btn-outline-secondary rounded-circle me-2"
                    style={icon_style}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-vk"></i>
                  </a>
                )}
                {teacherData.rutub_url && (
                  <a
                    href={teacherData.rutub_url}
                    className="btn btn-outline-danger rounded-circle me-2"
                    style={icon_style}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-camera-reels-fill"></i>
                  </a>
                )}
                {teacherData.max_url && (
                  <a
                    href={teacherData.max_url}
                    className="btn btn-outline-info rounded-circle me-2"
                    style={icon_style}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-globe2"></i>
                  </a>
                )}
                {teacherData.website_url && (
                  <a
                    href={teacherData.website_url}
                    className="btn btn-outline-success rounded-circle me-2"
                    style={icon_style}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-browser-chrome"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Список курсов преподавателя */}
      <div className="card mt-5 border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-primary text-white py-3">
          <h5 className="card-title mb-0">
            <i className="bi bi-list-check me-2"></i>
            Список курсов
          </h5>
        </div>
        <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <Link
              key={index}
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action d-flex align-items-center"
            >
              <i className="bi bi-play-circle-fill me-3 text-primary"></i>
              {course.title}
              <i className="bi bi-chevron-right ms-auto text-muted"></i>
            </Link>
          ))}
          {courseData.length === 0 && (
            <div className="list-group-item text-muted">
              <i className="bi bi-info-circle me-2"></i>
              У преподавателя пока нет курсов.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;