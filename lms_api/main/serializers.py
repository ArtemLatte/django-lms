from rest_framework import serializers
from . import models
from django.contrib.flatpages.models import FlatPage
from django.core.mail import send_mail

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id', 'full_name', 'email', 'vk_url', 'rutub_url', 'max_url', 'website_url', 'password', 'qualification', 'mobile_no', 'skills', 'otp_digit', 'login_via_otp', 'profile_img', 'teacher_courses', 'skill_list', 'total_teacher_courses']
        
    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

    def create(self, validate_data):
        email = self.validated_data['email']
        otp_digit = self.validated_data['otp_digit']
        instance = super(TeacherSerializer, self).create(validate_data)
        send_mail(
            'Verify Account',
            'Please verify your account',
            'lms-project@mail.ru',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is </p><p>{otp_digit}</p>'
        )
        return instance

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['total_teacher_courses','total_teacher_chapters','total_teacher_students']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description', 'total_courses']

        def __init__(self, *args, **kwargs):
            super(CategorySerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            if request and request.method == 'POST' or request.method == 'PUT' or request.method == 'PATCH':
                print('Method is POST')
                self.Meta.depth = 0
                print(self.Meta.depth)
            else:
                print(f"Method is - {request.method}")
                self.Meta.depth = 2

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['id', 
                  'category', 
                  'teacher', 
                  'title', 
                  'description', 
                  'featured_img', 
                  'techs', 
                  'course_chapters', 
                  'related_videos', 
                  'tech_list', 
                  'total_enrolled_students', 
                  'course_rating']
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = ['id', 'course', 'title', 'description', 'video', 'remarks']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id', 'full_name', 'email', 'password', 'username', 'login_via_otp', 'interested_categories', 'profile_img', 'otp_digit']

    def create(self, validate_data):
        email = self.validated_data['email']
        otp_digit = self.validated_data['otp_digit']
        instance = super(StudentSerializer, self).create(validate_data)
        send_mail(
            'Verify Account',
            'Please verify your account',
            'lms-project@mail.ru',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is </p><p>{otp_digit}</p>'
        )
        return instance
            


class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = ['id', 'course', 'student', 'enrolled_time']
    
    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentFavoriteCourse
        fields = ['id', 'course', 'student', 'status']
    def __init__(self, *args, **kwargs):
        super(StudentFavoriteCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id', 'course', 'student', 'rating', 'reviews', 'review_time']
        
    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
    

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentAssignment
        fields = ['id', 'teacher', 'student', 'title', 'detail', 'student_status', 'add_time']
    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['enrolled_courses','favorite_courses','complete_assignments','pending_assignments']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Notification
        fields=['teacher','student','notif_subject','notif_for', 'notif_created_time', 'notifread_status']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quiz
        fields = ['id',
                  'teacher', 
                  'title',
                  'detail',
                  'assign_status',
                  'add_time',
                  ]
    def __init__(self, *args, **kwargs):
        super(QuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.QuizQuestions
        fields=['id','quiz','question','ans1','ans2','ans3','ans4','right_ans']
        def __init__(self, *args, **kwargs):
            super(QuestionSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1


class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseQuiz
        fields = ['id', 'teacher', 'course', 'quiz', 'add_time']

    def __init__(self, *args, **kwargs):
        super(CourseQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class AttempQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.AttemptQuiz
        fields=['id','student','quiz','question','right_ans','add_time']
    def __init__(self, *args, **kwargs):
        super(AttempQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyMaterial
        fields = ['id', 'course', 'title', 'description', 'upload', 'remarks']

    def __init__(self, *args, **kwargs):
        super(StudyMaterialSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FAQ
        fields = ['question', 'answer']


class FlatPagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlatPage
        fields = ['id', 'title', 'content', 'url']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = ['id', 'full_name', 'email', 'query_txt']

class TeacherStudentChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TeacherStudentChat
        fields = ['id', 'teacher', 'student', 'msg_text', 'msg_from', 'msg_time']

        def to_representation(self, instance):
            representation = super(TeacherStudentChatSerializer, self).to_representation(instance)
            representation['msg_time'] = instance.msg_time.strftime("%Y-%m-%d %H:%M")
            return representation





