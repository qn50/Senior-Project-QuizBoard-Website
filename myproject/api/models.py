from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import Group, Permission
from django.utils import timezone

class Role(models.TextChoices):
    ADMIN = 'ADMIN', _('Admin')
    TEACHER = 'TEACHER', _('Teacher')
    STUDENT = 'STUDENT', _('Student')

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None, role=Role.STUDENT, first_name = None,last_name = None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email, role=role, first_name = first_name, last_name = last_name)
		user.set_password(password)
		user.save()
		return user
	
	def create_superuser(self, email, password=None, role=Role.ADMIN, first_name = None,last_name = None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		
		user = self.create_user(email, password,role, first_name, last_name)
		user.is_superuser = True
		user.is_staff = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	role = models.CharField(max_length=7, choices=Role.choices, default=Role.STUDENT)
	groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_name="appuser_groups",
        related_query_name="appuser",
    )
	user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="appuser_permissions",
        related_query_name="appuser",
    )    

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']
	objects = AppUserManager()
	def __str__(self):
		return self.first_name
	
class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    teacher = models.ForeignKey(
        AppUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': Role.TEACHER},
        related_name='courses'
    )
    num_of_quizzes = models.IntegerField(default=0)

    def __str__(self):
        return self.course_name