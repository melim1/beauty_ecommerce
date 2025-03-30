from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Enregistrer CustomUser avec les options par défaut de Django
admin.site.register(CustomUser, UserAdmin)
