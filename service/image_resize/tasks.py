from celery import shared_task
from PIL import Image
import os
from pathlib import Path
from image_resize.models import UnprocessedImage, ProcessedImage
import time

@shared_task(bind=True)
def resize_prompt_image(self, data):
    time.sleep(5)
    task_id = self.request.id
    img = Image.open(data['image_file'])
    new_img = img.resize((data['image_height'], data['image_width']))

    img_path = data['image_file']
    new_img_file = os.path.splitext(os.path.basename(img_path))[0]
    extension = os.path.splitext(os.path.basename(img_path))[1]
    new_img.save(os.path.dirname(data['image_file']) + "/" + new_img_file + "_processed" + extension)

    ProcessedImage.objects.create(task_id=task_id,
                                  image_name=data['image_name'],
                                  image_height=data['image_height'],
                                  image_width=data['image_width'],
                                  image_file=new_img_file + "_processed" + extension)

    return 0
