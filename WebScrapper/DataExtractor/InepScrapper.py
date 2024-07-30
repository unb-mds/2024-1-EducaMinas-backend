import time
import os
import shutil
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException, StaleElementReferenceException, InvalidSelectorException
from datetime import datetime

link = "https://inepdata.inep.gov.br/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FDisseminação%20dos%20Censos%2FEducação%20Básica%2FPainéis%2FCenso%20da%20Educação%20Básica&Page=Matrícula%20-%20Por%20Ano&NQUser=inepdata&NQPassword=Inep2014"

download_dir = os.path.abspath(os.path.join(os.getcwd(), "../oracle_data"))
options = webdriver.ChromeOptions()
prefs = {"download.default_directory": download_dir}


options.add_experimental_option('prefs', prefs)


service = Service(ChromeDriverManager().install())
navegador = webdriver.Chrome(service=service, options=options)

max_tentativas = 200


def tryFind(function, interval: float=0.2):
    for tentativa in range(max_tentativas):
        try:
            element = function()
            return element
        except NoSuchElementException:
            print(f"Trying again find the element {tentativa}...")
            time.sleep(interval)
        except ElementNotInteractableException:
            print(f"Trying again interact with the element {tentativa}...")
            time.sleep(interval)
        except StaleElementReferenceException:
            print(f"Trying again stale element {tentativa}...")
            time.sleep(interval)
        except InvalidSelectorException:
            print(f"Invalid Selector: Xpath invalid {tentativa}...")
            time.sleep(interval)
        except:
            print(f"Trying again generic problem {tentativa}...")
            time.sleep(interval)
        #    print("Erro Inesperado!!!")
    # raise Exception("Não foi possível acessar o elemento procurado!")

def rename_and_move(pattern: str, new_name: str, new_dir: str):
    #Tabela Dinâmica
    if not os.path.exists(new_dir):
        os.makedirs(new_dir)
    for f in os.listdir(download_dir):
        if f.startswith(pattern) and f.endswith('.csv'):
            destination = os.path.join(new_dir, new_name)
            source = os.path.join(download_dir, f)
            shutil.move(source, destination)
            print(f"Arquivo renomeado de {source} para {destination}")

# Definir o zoom para 100%
navegador.execute_script("document.body.style.zoom='100%'")
navegador.get(link)
actions = ActionChains(navegador)

tryFind(lambda:
    navegador.find_element(By.XPATH, '/html/body/div[8]/table[2]/tbody/tr[1]/td[2]/div/table[1]/tbody/tr/td[2]/div[1]/div/table[1]/tbody/tr/td[1]/div/table/tbody/tr/td/div/table/tbody/tr/td/div/table/tbody/tr/td[2]/div/div/div/table/tbody/tr/td/div/form/div/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/span/span/span/img').click()
)# open window search button


tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="idRemoveAllButton"]').click()
)# Remove ALL button

tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$Brasil_Brasil_disclosure"]').click()
)#abre subtopico Brasil

tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$Regi%c3%a3o_Sudeste_disclosure"]').click()
)# abre subtopico sudeste

tryFind(lambda:
        navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$UF_MG_disclosure"]').click()
)# abre subtopico MG

for i in range(25):
    more = tryFind(lambda: WebDriverWait(navegador, 10).until(
        EC.element_to_be_clickable((By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$UF_MG_pagechildren"]/div[2]/span/span'))
    ).click(), 0.3)# abre todos os  em 'mais'
    print(f"AGORA I ESTÁ EM:{i}")

element1 = tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$Munic%c3%adpio_3100104_details"]/span')
)#primeiro municipio

element2 = tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$Munic%c3%adpio_3144805_details"]/span')
)# ultimo municipio

actions.key_down(Keys.SHIFT).click(element1)
actions.click(element2)
actions.key_up(Keys.SHIFT)
actions.perform()

tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="idShuttleContainerBody"]/tr[3]/td[2]/table/tbody/tr[1]/td').click()
)#move todos os municipios selecionados

tryFind(lambda:
    navegador.find_element(By.LINK_TEXT, 'OK').click()
)#confirma selecao

tryFind(lambda: WebDriverWait(navegador, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, f"div[title='1"))
        ).click(), 0.2)#restringe a uma categoria





def open_box(etapa_de_ensino, delay=3):
    tryFind(lambda: WebDriverWait(navegador, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, f"div[title='{etapa_de_ensino}']"))
        ).click(), 2)
    time.sleep(delay)

def open_dropdown(etapa_de_ensino):
    tryFind(lambda: WebDriverWait(navegador, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, f"input[title='{etapa_de_ensino}']"))
            ).click(), 2)

def download():
    tryFind(lambda:
        navegador.find_element(By.LINK_TEXT, 'Exportar').click()
    )
    tryFind(lambda:
        navegador.find_element(By.LINK_TEXT, 'Dados').click()
    )
    tryFind(lambda:
        navegador.find_element(By.LINK_TEXT, 'Formato CSV').click()
    )
    time.sleep(4)
    tryFind(lambda:
        navegador.find_element(By.CSS_SELECTOR, "a[name='OK']").click()
    )

def remove_special_characters(text):
    # Substitui qualquer caractere que não seja letra ou número por uma string vazia
    cleaned_text = re.sub(r'[^A-Za-z0-9]+', '', text)
    return cleaned_text

def alternate_years_and_download(category, stage, level):
    date = datetime.now().year - 1 #offset of censo escolar
    while(date>=2020):
        tryFind(lambda:
            navegador.find_element(By.CSS_SELECTOR, "img[src='/analyticsRes/res/s_InepdataCensoEscolar/master/selectdropdown_ena.png']").click()
        )#year dropdown
        tryFind(lambda:
            navegador.find_element(By.CSS_SELECTOR, f"div[title='{str(date)}']").click()
        )#select year
        #download archive
        download()
        pattern = "Tabela Dinâmica"
        date_string = remove_special_characters(str(date))
        stage = remove_special_characters(stage)
        level = remove_special_characters(level)
        category = remove_special_characters(category)
        new_name = (f"{date_string}_{stage}_{level}_{category}.csv")
        new_dir = os.path.abspath(os.path.join(download_dir, category))
        rename_and_move(pattern, new_name, new_dir)
        date-=1
        time.sleep(2)

def alternate_stages(category):
    etapas_de_ensino = ['Ensino Fundamental', 'Ensino Médio']
    open_dropdown('Educação Básica')
    for etapa in etapas_de_ensino:
        open_box(etapa, delay=4)
        if etapa == 'Ensino Fundamental':
            #alterna entre os filtros, baixa...
            alternate_years_and_download(category=category,
                                          stage=etapa, 
                                          level='(Todos os Valores de Colunas)')
            open_dropdown('(Todos os Valores de Colunas)')
            open_box('Anos Iniciais')
            #alterna entre os filtros, baixa...
            alternate_years_and_download(category=category,
                                          stage=etapa,
                                          level='Anos Iniciais')
            open_dropdown('Anos Iniciais')
            open_box('Anos Finais')
            #alterna entre os filtros, baixa...
            alternate_years_and_download(category=category,
                                          stage=etapa,
                                          level='Anos Finais')
            open_dropdown(etapa)
        else:
            #alterna entre os filtros e baixa
            alternate_years_and_download(category=category,
                                          stage=etapa,
                                          level='')

    open_dropdown('Ensino Médio') #posicao original
    open_box('Educação Básica')

def alternate_categories(): #PRINCIPAL
    open_dropdown('Localização')
    open_box('Cor/Raça', delay=4)
    # RODA TODAS AS ALTERNANCIAS DE FILTRO
    alternate_stages(category='Cor/Raça') #download
    open_dropdown('Cor/Raça')
    open_box('Dependência Administrativa', delay=4)
    alternate_stages(category='Dependência Administrativa') #download
    
        
def altena_filtros():
    alternate_categories()

altena_filtros()