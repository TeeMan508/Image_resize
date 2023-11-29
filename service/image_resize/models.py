from django.db import models


class Image(models.Model):
    image_name = models.CharField(max_length=100)
    image_height = models.IntegerField()
    image_width = models.IntegerField()
    image_file = models.FileField(upload_to='media/')

    def __str__(self):
        return f"Image: {self.image_name}"
    