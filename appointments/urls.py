from django.urls import path, include
from django.urls import path
from . import views

urlpatterns = [
    # Web pages
    path('book/', views.book_appointment, name='book'),
    path('success/', views.success, name='success'),

    # API endpoints (optional for now)
    # path('api/appointments/', views.AppointmentListAPI.as_view(), name='api_appointments'),
    # path('api/appointments/<int:pk>/', views.AppointmentDetailAPI.as_view(), name='api_appointment_detail'),
]



from django.urls import path
from . import views

urlpatterns = [
    # existing booking pages
    path('book/', views.book_appointment, name='book'),
    path('success/', views.success, name='success'),

    # API endpoints
    path('api/appointments/', views.AppointmentListAPI.as_view(), name='api_appointments'),
    path('api/appointments/<int:pk>/', views.AppointmentDetailAPI.as_view(), name='api_appointment_detail'),
]







