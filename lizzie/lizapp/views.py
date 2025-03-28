from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request, 'lizapp/home.html')

def account_view(request):
    """
    Представлення для базового макету авторизації за адресою /account/.
    """
    return render(request, 'lizapp/account.html')

def signup_view(request):
    """
    Представлення для підвантаження форми реєстрації за адресою /account/signup/.
    Якщо запит є AJAX (з заголовком "X-Requested-With": "XMLHttpRequest"), повертається лише HTML‑фрагмент форми (signup_form.html).
    Інакше повертається повний макет (account.html) із вставленим фрагментом форми.
    """
    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        snippet = render(request, 'lizapp/forms/signup_form.html').content.decode('utf-8')
        return HttpResponse(snippet)
    else:
        signup_form_html = render(request, 'lizapp/forms/signup_form.html').content.decode('utf-8')
        return render(request, 'lizapp/account.html', {'form_content': signup_form_html})

def login_view(request):
    """
    Представлення для підвантаження форми входу за адресою /account/login/.
    Якщо запит є AJAX (з заголовком "X-Requested-With": "XMLHttpRequest"), повертається лише HTML‑фрагмент форми (login_form.html).
    Інакше повертається повний макет (account.html) із вставленим фрагментом форми.
    """
    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        snippet = render(request, 'lizapp/forms/login_form.html').content.decode('utf-8')
        return HttpResponse(snippet)
    else:
        login_form_html = render(request, 'lizapp/forms/login_form.html').content.decode('utf-8')
        return render(request, 'lizapp/account.html', {'form_content': login_form_html})
