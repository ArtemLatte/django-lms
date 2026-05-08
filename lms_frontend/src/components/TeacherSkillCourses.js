import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherSkillCourses() {
  const [courseData, setCourseData] = useState([]);
  const { skill_name, teacher_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + '/course/?skill_name=' + skill_name + '&teacher=' + teacher_id)
        .then((res) => {
          setCourseData(res.data.results);
        });
    } catch (error) {
      console.log(error);
    }
  }, [skill_name, teacher_id]);

  return (
    <div className="container mt-4 mb-5">
      <h3 className="pb-1 mb-4">
        <i className="bi bi-tag me-2 text-primary"></i>
        Курсы по навыку: <span className="text-primary">{skill_name}</span>
      </h3>

      {courseData && courseData.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="bi bi-info-circle me-2"></i>
          По данному навыку пока нет курсов.
        </div>
      ) : (
      <div className="row g-4 mb-4">
            {courseData.map((course, index) => (
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
                    <Link
                      to={`/detail/${course.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {course.title}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Пагинация закомментирована в оригинале — оставляем как есть */}
    </div>
  );
}

export default TeacherSkillCourses;