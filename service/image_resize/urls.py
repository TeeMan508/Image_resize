from django.urls import path
from .views import ImageView
app_name = 'image_resize'

urlpatterns = [
    path('', ImageView.as_view(), name='upload-file'),
]