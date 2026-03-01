from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

def healthcheck(_request):
    return JsonResponse(
        {
            "status": "ok",
            "service": "clinic_appointment_system",
            "routes": [
                "/admin/",
                "/api/accounts/",
                "/api/appointments/",
            ],
        }
    )

urlpatterns = [
    path('', healthcheck, name='healthcheck'),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/appointments/', include('appointments.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
