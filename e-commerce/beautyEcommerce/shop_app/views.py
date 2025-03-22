from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProducrSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(["GET"])
def products(request):
 products = Product.objects.all()
 serializer = ProducrSerializer(products, many=True)
 return Response(serializer.data)
