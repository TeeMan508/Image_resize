from django.db import models


class UnprocessedImage(models.Model):
    image_name = models.CharField(max_length=100)
    image_height = models.IntegerField()
    image_width = models.IntegerField()
    image_file = models.ImageField()

    def __str__(self):
        return f"Image: {self.image_name}"


class ProcessedImage(models.Model):
    image_name = models.CharField(max_length=100)
    image_height = models.IntegerField()
    image_width = models.IntegerField()
    image_file = models.ImageField()
    task_id = models.TextField()

    def __str__(self):
        return f"Image: {self.image_name}"
    