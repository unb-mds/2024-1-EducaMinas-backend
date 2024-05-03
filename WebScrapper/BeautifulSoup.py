import requests
from bs4 import BeautifulSoup

link = "https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9"
headers = {"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0"}
requisicao = requests.get(link, headers=headers)
print(requisicao)
#print(requisicao.text)
site = BeautifulSoup(requisicao.text, "html.parser")
print(site.prettify())
# print(site.find_all("td", class_="ResultLinksCell"))