from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request, 'lizapp/home.html')

def account_view(request):
    """
    View for the base account layout at the URL /account/.
    """
    return render(request, 'lizapp/account.html')

def signup_view(request):
    """
    View for loading the signup form at the URL /account/signup/.
    
    If the request is AJAX (with the header "X-Requested-With": "XMLHttpRequest"),
    only an HTML snippet of the form (signup_form.html) is returned.
    Otherwise, the full layout (account.html) with the inserted form snippet is returned.
    """
    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        snippet = render(request, 'lizapp/forms/signup_form.html').content.decode('utf-8')
        return HttpResponse(snippet)
    else:
        signup_form_html = render(request, 'lizapp/forms/signup_form.html').content.decode('utf-8')
        return render(request, 'lizapp/account.html', {'form_content': signup_form_html})

def login_view(request):
    """
    View for loading the login form at the URL /account/login/.
    
    If the request is AJAX (with the header "X-Requested-With": "XMLHttpRequest"),
    only an HTML snippet of the form (login_form.html) is returned.
    Otherwise, the full layout (account.html) with the inserted form snippet is returned.
    """
    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        snippet = render(request, 'lizapp/forms/login_form.html').content.decode('utf-8')
        return HttpResponse(snippet)
    else:
        login_form_html = render(request, 'lizapp/forms/login_form.html').content.decode('utf-8')
        return render(request, 'lizapp/account.html', {'form_content': login_form_html})
