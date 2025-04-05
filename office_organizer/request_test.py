import requests


BASIC_URL = "http://localhost:8001"


method = "POST"
api_address = '/info/articles'
params ={'skip':20, 'limit':20}

response = requests.request(method=method, url=BASIC_URL + api_address, params=params)


print(response.content)