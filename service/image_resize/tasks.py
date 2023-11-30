from celery import shared_task
from PIL import Image


@shared_task
def resize_prompt_image(data):
    print(data)
    img = Image.open(data['image_file'])
    new_img = img.resize((data['image_height'], data['image_width']))
    new_img.save(data['image_file'])
