# Generated by Django 3.2.16 on 2023-11-30 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('image_resize', '0007_alter_image_image_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image_file',
            field=models.ImageField(upload_to='media/'),
        ),
    ]
