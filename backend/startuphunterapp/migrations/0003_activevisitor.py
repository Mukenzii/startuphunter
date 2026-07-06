from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('startuphunterapp', '0002_categories_title_ru'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActiveVisitor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_id', models.CharField(max_length=64, unique=True)),
                ('last_seen', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Active visitor',
                'verbose_name_plural': 'Active visitors',
                'ordering': ['-last_seen'],
            },
        ),
    ]
