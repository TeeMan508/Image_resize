from django.contrib import admin
from .models import UnprocessedImage, ProcessedImage

admin.site.register(UnprocessedImage)
admin.site.register(ProcessedImage)
