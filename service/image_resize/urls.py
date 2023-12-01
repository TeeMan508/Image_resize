from django.urls import path
from .views import ProcessedImageView, UnprocessedImageView
app_name = 'image_resize'

urlpatterns = [
    path('', UnprocessedImageView.as_view()),
    path('get_image/', ProcessedImageView.as_view()),
]
