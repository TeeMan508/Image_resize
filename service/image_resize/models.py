from django.db import models


class Image(models.Model):
    name = models.CharField(max_length=100)
    height_before = models.IntegerField()
    width_before = models.IntegerField()
    height_after = models.IntegerField()
    width_after = models.IntegerField()

    def __str__(self):
        return f"Image: {self.name}"
    