# Generated by Django 3.1.3 on 2020-12-10 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0008_auto_20201210_0716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_pic',
            field=models.ImageField(default='static/default-picture_0_0.png', upload_to='user_images/'),
        ),
    ]
