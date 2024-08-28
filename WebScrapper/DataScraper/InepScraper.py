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
from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException, StaleElementReferenceException, InvalidSelectorException, ElementClickInterceptedException, TimeoutException
from datetime import datetime

link = "https://inepdata.inep.gov.br/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FDisseminação%20dos%20Censos%2FEducação%20Básica%2FPainéis%2FCenso%20da%20Educação%20Básica&Page=Matrícula%20-%20Por%20Ano&NQUser=inepdata&NQPassword=Inep2014"

script_dir = os.path.dirname(os.path.realpath(__file__))
web_scrapper_dir = os.path.abspath(os.path.join(script_dir, os.pardir))
download_dir = os.path.abspath(os.path.join(web_scrapper_dir, "./oracle_data"))

if not os.path.exists(download_dir):
    os.makedirs(download_dir)

options = webdriver.ChromeOptions()
prefs = {"download.default_directory": download_dir}


options.add_experimental_option('prefs', prefs)


service = Service(ChromeDriverManager().install())
navegador = webdriver.Chrome(service=service, options=options)

max_tentativas = 200


def tryFind(function, interval: float = 0.2):
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
        except Exception:
            print(f"Trying again generic problem {tentativa}...")
            time.sleep(interval)
        #    print("Erro Inesperado!!!")
    # raise Exception("Não foi possível acessar o elemento procurado!")


# Definir o zoom para 100%
navegador.execute_script("document.body.style.zoom='100%'")
navegador.get(link)
actions = ActionChains(navegador)

tryFind(lambda:
        navegador.find_element(By.XPATH, '/html/body/div[8]/table[2]/tbody/tr[1]/td[2]/div/table[1]/tbody/tr/td[2]/div[1]/div/table[1]/tbody/tr/td[1]/div/table/tbody/tr/td/div/table/tbody/tr/td/div/table/tbody/tr/td[2]/div/div/div/table/tbody/tr/td/div/form/div/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/span/span/span/img').click()
        )  # open window search button


tryFind(lambda:
        navegador.find_element(
            By.XPATH, '//*[@id="idRemoveAllButton"]').click()
        )  # Remove ALL button

tryFind(lambda:
        navegador.find_element(
            By.XPATH, '/html/body/div[12]/div/table/tbody[1]/tr/td/div[2]/table/tbody/tr[1]/th[2]/div/div/span/img').click()
        )  # abre barra de pesquisa

tryFind(lambda:
        navegador.find_element(
            By.XPATH, '//*[@id="AvailableDataBrowserGroupBoxTreeButton"]').click()
        )  # selecionar membro pai

tryFind(lambda:
        navegador.find_element(
            By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_SearchMemberSelect$Brasil_Brasil_disclosure"]').click()
        )  # abre subtopico Brasil

tryFind(lambda:
        navegador.find_element(
            By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_SearchMemberSelect$Regi%c3%a3o_Sudeste_disclosure"]').click()
        )  # abre subtopico sudeste

tryFind(lambda:
        navegador.find_element(
            By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_SearchMemberSelect$UF_MG_details"]/span').click()
        )  # seleciona MG

actions.key_down(Keys.TAB)
actions.key_down(Keys.ENTER)
actions.perform()  # confirma em ok

time.sleep(0.2)
option = tryFind(lambda:
                 navegador.find_element(
                     By.XPATH, '//*[@id="AvailableDataBrowserGroupBoxSearchLevelID"]').click()
                 )
actions.key_down(Keys.ARROW_DOWN)
actions.key_up(Keys.ARROW_DOWN)
actions.key_down(Keys.ENTER)
actions.key_up(Keys.ENTER)
actions.perform()  # seleciona filhos como municipio


tryFind(lambda:
        navegador.find_element(By.XPATH, '//*[@id="searchButton"]').click()
        )  # clica em pesquisar


botao_mais = '//*[@id="searchDialogMoreButton"]'
while True:
    try:
        more = WebDriverWait(navegador, 3).until(
            EC.element_to_be_clickable((By.XPATH, botao_mais))
        )
        more.click()
        time.sleep(0.15)  # abre todos os  em 'mais'
    except (ElementClickInterceptedException, TimeoutException):
        # Se o botão não for clicável ou não for encontrado, saia do loop
        print("Botão não clicável ou não encontrado.")
        break

tryFind(lambda:
        navegador.find_element(By.XPATH, '//*[@id="idMoveAllButton"]').click()
        )  # mover todos os municipios

tryFind(lambda:
        navegador.find_element(By.LINK_TEXT, 'OK').click()
        )  # confirma selecao


def wait_load_table():
    tabela = "/html/body/div[8]/table[2]/tbody/tr[1]/td[2]/div/table[1]/tbody/tr/td[2]/div[1]/div/table[3]/tbody/tr/td[1]/div/table/tbody/tr[2]/td/div/div[3]/table/tbody/tr/td/div/table/tbody/tr/td/div/table/tbody/tr[2]/td/div/div/div/div[1]/table/tbody/tr[1]/td/table/tbody/tr/td/div[2]/table/tbody/tr[3]/td"
    time.sleep(2)
    WebDriverWait(navegador, 20).until(
        EC.element_to_be_clickable((By.XPATH, tabela))
    )


def open_box(option_to_select, delay=4):
    tryFind(lambda: WebDriverWait(navegador, 10).until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, f"div[title='{option_to_select}']"))
            ).click(), 2)
    wait_load_table()


def open_dropdown(selected_option):
    tryFind(lambda: WebDriverWait(navegador, 10).until(
            EC.element_to_be_clickable(
                (By.CSS_SELECTOR, f"input[title='{selected_option}']"))
            ).click(), 2)


def download():
    wait_load_table()
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


def rename_and_move(pattern: str, new_name: str):
    # Tabela Dinâmica
    # if not os.path.exists(new_dir):
    # os.makedirs(new_dir)
    for f in os.listdir(download_dir):
        if f.startswith(pattern) and f.endswith('.csv'):
            source_name = os.path.join(download_dir, f)
            new_source_name = os.path.join(download_dir, new_name)
            shutil.move(source_name, new_source_name)
            print(f"Arquivo renomeado de {source_name} para {new_source_name}")


def alternate_years_and_download(stage, level):
    date = datetime.now().year - 1  # offset of censo escolar
    while (date >= 2020):
        wait_load_table()
        tryFind(lambda:
                navegador.find_element(
                    By.CSS_SELECTOR, "img[src='/analyticsRes/res/s_InepdataCensoEscolar/master/selectdropdown_ena.png']").click()
                )  # year dropdown
        tryFind(lambda:
                navegador.find_element(
                    By.CSS_SELECTOR, f"div[title='{str(date)}']").click()
                )  # select year
        # download archive
        download()
        pattern = "Tabela Dinâmica"
        date_string = remove_special_characters(str(date))
        stage = remove_special_characters(stage)
        level = remove_special_characters(level)
        new_name = (f"{date_string}_{stage}_{level}_extract.csv")
        rename_and_move(pattern, new_name)
        date -= 1
        time.sleep(2)


def switch_stages():
    etapas_de_ensino = ['Ensino Fundamental', 'Ensino Médio']
    open_dropdown('Educação Básica')
    for etapa in etapas_de_ensino:
        open_box(etapa, delay=4)
        if etapa == 'Ensino Fundamental':
            # alterna entre os filtros, baixa...
            open_dropdown('(Todos os Valores de Colunas)')
            open_box('Anos Iniciais')
            # alterna entre os filtros, baixa...
            alternate_years_and_download(stage=etapa,
                                         level='Anos Iniciais')
            open_dropdown('Anos Iniciais')
            open_box('Anos Finais')
            # alterna entre os filtros, baixa...
            alternate_years_and_download(stage=etapa,
                                         level='Anos Finais')
            open_dropdown(etapa)
        else:
            # alterna entre os filtros e baixa
            alternate_years_and_download(stage=etapa,
                                         level='')

    open_dropdown('Ensino Médio')  # posicao original
    open_box('Educação Básica')


def define_categories():
    open_dropdown('Localização')
    open_box('Cor/Raça', delay=4)


def switch_filters():
    switch_stages()


def main():
    define_categories()
    switch_filters()


main()

navegador.quit()
print("Extraction complete!")
