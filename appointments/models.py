from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor_name = models.CharField(max_length=100)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Pending', 'Pending'),
            ('Approved', 'Approved'),
            ('Cancelled', 'Cancelled'),
        ],
        default='Pending'
    )

    def __str__(self):
        return f"{self.patient.username} - {self.appointment_date}"
    
    
    
    from django.db import models
from django.contrib.auth.models import User

class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    doctor_name = models.CharField(max_length=100)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.patient.username} - {self.appointment_date}"

