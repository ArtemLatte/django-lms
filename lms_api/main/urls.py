from django.urls import path
from . import views

urlpatterns = [
    #Teacher
    path("teacher/", views.TeacherList.as_view()),
    path("teacher/<int:pk>/", views.TeacherDetail.as_view()),
    path('teacher-login',views.teacher_login),
    #Category
    path("category/", views.CategoryList.as_view()),
    # Course
    path("course/", views.CourseList.as_view()),
    #Specific Course Chapter
    path("course-chapters/<int:course_id>", views.CourseChapterList.as_view()),
    # Specific Chapter
    path("chapter/<int:pk>", views.ChapterDetailView.as_view()),
    # Teacher Courses
    path("teacher-courses/<int:teacher_id>", views.TeacherCourseList.as_view()),
    # Course Detail
    path("teacher-course-detail/<int:pk>", views.TeacherCourseDetail.as_view()),
]