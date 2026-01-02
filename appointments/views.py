from django.shortcuts import render
from django.shortcuts import render
from .models import Appointment
from django.shortcuts import render, redirect
from .models import Appointment

def book_appointment(request):
    if request.method == 'POST':
        Appointment.objects.create(
            patient_name=request.POST['patient_name'],
            doctor_name=request.POST['doctor_name'],
            appointment_date=request.POST['appointment_date'],
            appointment_time=request.POST['appointment_time'],
            description=request.POST['description']
        )
        return redirect('success')

    return render(request, 'appointments/book.html')


def success(request):
    return render(request, 'appointments/success.html')


from rest_framework import generics
from .models import Appointment
from .serializers import AppointmentSerializer

# List all appointments
class AppointmentListAPI(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

# Retrieve, update, delete single appointment
class AppointmentDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    
    



# Create your views here.
