from django.shortcuts import render
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import json

from image_resize.models import UnprocessedImage, ProcessedImage
from image_resize.serializer import UnprocessedImageSerializer, ProcessedImageSerializer
from image_resize.tasks import resize_prompt_image


class UnprocessedImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = UnprocessedImageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            task = resize_prompt_image.delay(serializer.data)

            return Response(task.task_id, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProcessedImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ProcessedImageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            task_id = serializer.validated_data.get("task_id")
            async_result = ProcessedImage.objects.filter(task_id=task_id).values()

            if len(async_result) > 0:
                filename = async_result[0]['image_file']
                filename = settings.MEDIA_URL + filename
                async_result[0]['image_file'] = filename

                print(settings.MEDIA_URL + async_result[0]['image_file'])
                return Response(async_result[0], status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_202_ACCEPTED)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


def main_view(request):
    return render(request, 'base.html')
