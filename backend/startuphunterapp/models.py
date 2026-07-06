from django.db import models


def translate_uz_to_ru(text):
    """Best-effort Uzbek -> Russian translation (free Google Translate).

    Returns '' on any failure so a save never breaks if the network/service
    is unavailable; the admin can always fill the Russian field by hand.
    """
    if not text:
        return ''
    try:
        from deep_translator import GoogleTranslator
        return GoogleTranslator(source='uz', target='ru').translate(text) or ''
    except Exception:
        return ''


class Categories(models.Model):
    title = models.CharField(max_length=90, unique=True, verbose_name="Categories (UZ)")
    # Auto-filled from the Uzbek title on save; can be overridden in admin.
    title_ru = models.CharField(max_length=120, blank=True, default='', verbose_name="Categories (RU)")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def save(self, *args, **kwargs):
        # Auto-translate when RU is empty, or when the Uzbek title changed since
        # last save (editing the UZ name refreshes the RU one).
        needs_translation = not self.title_ru
        if self.pk:
            previous = Categories.objects.filter(pk=self.pk).only('title').first()
            if previous and previous.title != self.title:
                needs_translation = True
        if needs_translation and self.title:
            self.title_ru = translate_uz_to_ru(self.title)
        super().save(*args, **kwargs)



class UserProblems(models.Model):
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)

    username = models.CharField(max_length=50)
    country = models.CharField(max_length=30, default='Uzbekistan')

    q1 = models.TextField()
    q2 = models.TextField()
    q3 = models.TextField()
    q4 = models.TextField()
    user_contact = models.CharField(max_length=100, default="")
    title = models.CharField(max_length=80, blank=True)
    published = models.BooleanField(default=False)
    
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
