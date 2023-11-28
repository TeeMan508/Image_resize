from django.shortcuts import render
from rest_framework.viewsets import ReadOnlyModelViewSet

from image_resize.models import Image
from image_resize.serializer import ImageSerializer


class ImageView(ReadOnlyModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

