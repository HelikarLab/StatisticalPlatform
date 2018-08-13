from django.shortcuts import render

def account(request):
    return render(request, 'pages/index.html')
