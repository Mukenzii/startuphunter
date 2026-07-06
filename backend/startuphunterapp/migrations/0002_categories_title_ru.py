from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startuphunterapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='categories',
            name='title_ru',
            field=models.CharField(blank=True, default='', max_length=120, verbose_name='Categories (RU)'),
        ),
        migrations.AlterField(
            model_name='categories',
            name='title',
            field=models.CharField(max_length=90, unique=True, verbose_name='Categories (UZ)'),
        ),
    ]
