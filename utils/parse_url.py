import re

def parse_url(url):
    is_http = re.search("^http*.+$", url)
    if is_http:
        return url
    else:
        return f'https://{url}'
