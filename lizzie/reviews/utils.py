def token_valid(review, request):
    cookie_token = request.COOKIES.get(f"review_token_{review.id}")
    if not cookie_token:
        return False
    return cookie_token == str(review.token)
