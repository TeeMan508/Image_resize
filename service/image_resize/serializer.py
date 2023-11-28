from rest_framework import serializers

from image_resize.models import Image


class ImageSerializer(serializers.ModelSerializer):
    image_name = serializers.CharField(source="name")
    height_before_ = serializers.IntegerField(source="height_before")
    width_before_ = serializers.IntegerField(source="width_before")
    height_after_ = serializers.IntegerField(source="height_after")
    width_after_ = serializers.IntegerField(source="height_after")

    class Meta:
        model = Image
        fields = ("id", "image_name", "height_before_", "width_before_", "height_after_", "width_after_")