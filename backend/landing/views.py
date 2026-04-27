from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    """Главная страница лендинга регионального центра"""
    context = {
        'title': 'Региональный центр',
        'description': 'Добро пожаловать на сайт регионального центра',
    }
    return render(request, 'landing/index.html', context)

def about(request):
    """Страница о центре"""
    context = {
        'title': 'О нас',
    }
    return render(request, 'landing/about.html', context)

def services(request):
    """Страница услуг"""
    context = {
        'title': 'Услуги',
    }
    return render(request, 'landing/services.html', context)

def contacts(request):
    """Страница контактов"""
    context = {
        'title': 'Контакты',
    }
    return render(request, 'landing/contacts.html', context)
