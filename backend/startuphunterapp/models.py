from django.db import models


class Categories(models.Model):
    title = models.CharField(max_length=90, unique=True, verbose_name="Categories")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'




class UserProblems(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)

    username = models.CharField(max_length=50)
    country = models.CharField(max_length=30, default='Uzbekistan')

    q1 = models.TextField()
    q2 = models.TextField()
    q3 = models.TextField()
    q4 = models.TextField()
    q5 = models.TextField()

    title = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'UserProblem'
        verbose_name_plural = 'UserProblems'

    def save(self, *args, **kwargs):
        if not self.title:
            self.title = self.q1[:30]
        super().save(*args, **kwargs)
