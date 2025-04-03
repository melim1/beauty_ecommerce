from django.urls import path
from . import views

urlpatterns = [
    path("products", views.products, name="products"),
    path("product_detail/<slug:slug>", views.product_detail, name="product_detail"),
    path("add_product/", views.add_product, name="add_product")
]
