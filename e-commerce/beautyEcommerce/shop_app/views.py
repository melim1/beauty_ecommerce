from django.shortcuts import render
from .models import Product
from .serializers import ProductSerializer, DetailedProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
import logging

@api_view(["GET"])
def products(request):
 products = Product.objects.all()
 serializer = ProductSerializer(products, many=True)
 return Response(serializer.data)

@api_view(["GET"])
def product_detail(request, slug):
 product = Product.objects.get(slug=slug)
 serializer = DetailedProductSerializer(product)
 return Response(serializer.data)

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product(request):
    try:
        required_fields = ['name', 'prix', 'stockeDis', 'category']
        for field in required_fields:
            if field not in request.POST:
                return Response({"error": f"Champ {field} manquant"}, status=400)

        product = Product.objects.create(
            name=request.POST['name'],
            description=request.POST.get('description', ''),
            prix=float(request.POST['prix']),
            stockeDis=int(request.POST['stockeDis']),
            category=request.POST['category'],
            estDis=request.POST.get('estDis', 'false').lower() == 'true',
            image=request.FILES.get('image'),
        )
        
        return Response({"success": True, "id": product.id}, status=201)

    except ValueError:
        return Response({"error": "Données numériques invalides"}, status=400)
    except Exception as e:
        logger.error(f"Erreur: {str(e)}")
        return Response({"error": "Erreur serveur"}, status=500)