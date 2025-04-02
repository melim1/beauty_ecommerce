from django.db import models
from django.utils.text import slugify


# Create your models here.
class Product(models.Model):
    CATEGORY = (("Teint","Teint"),
                ("Yeux","Yeux"),
                ("Levres","Lèvres"),
                ("Pinceaux","Pinceaux et éponges")

    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    stockeDis = models.IntegerField()
    image = models.ImageField(upload_to="img")
    category= models.CharField(max_length=15, choices=CATEGORY,blank=True, null=True)
    estDis = models.BooleanField(default=True)


    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
   
     
    
    # Sauvegarde du modèle avec le slug mis à jour
        super().save(*args, **kwargs)