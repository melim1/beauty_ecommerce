from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "titre", "description", "prix", "stockeDis", "image","category","estDis"]
        
class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta: 
        model = Product
        fields = ["id", "titre","description", "prix", "stockeDis", "image","category","estDis"] 

    def get_similar_products (self, product):
        products = Product.objects.filter(category=product.category).exclude(id=product.id) 
        serializer = ProductSerializer(products, many=True)
        return serializer.data      