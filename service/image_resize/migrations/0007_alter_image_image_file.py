# Generated by Django 3.2.16 on 2023-11-29 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('image_resize', '0006_alter_image_image_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image_file',
            field=models.FileField(upload_to='images/'),
        ),
    ]
