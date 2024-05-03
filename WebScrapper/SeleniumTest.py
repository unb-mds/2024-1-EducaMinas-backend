import time
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException, StaleElementReferenceException
from datetime import datetime

link = "https://inepdata.inep.gov.br/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FDisseminação%20dos%20Censos%2FEducação%20Básica%2FPainéis%2FCenso%20da%20Educação%20Básica&Page=Matrícula%20-%20Por%20Ano&NQUser=inepdata&NQPassword=Inep2014"

service = Service(ChromeDriverManager().install())
navegador = webdriver.Chrome(service=service)

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
        except:
            print(f"Trying again generic problem {tentativa}...")
            time.sleep(interval)
        #    print("Erro Inesperado!!!")
    # raise Exception("Não foi possível acessar o elemento procurado!")


navegador.get(link)

tryFind(lambda:
    navegador.find_element(By.XPATH, '/html/body/div[8]/table[2]/tbody/tr[1]/td[2]/div/table[1]/tbody/tr/td[2]/div[1]/div/table[1]/tbody/tr/td[1]/div/table/tbody/tr/td/div/table/tbody/tr/td/div/table/tbody/tr/td[2]/div/div/div/table/tbody/tr/td/div/form/div/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/span/span/span/img').click()
)# open window search button

tryFind(lambda:
    navegador.find_element(By.XPATH, "/html/body/div[12]/div/table/tbody[1]/tr/td/div[2]/table/tbody/tr[3]/td[2]/table/tbody/tr[5]/td").click()
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
    tryFind(lambda:
        navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$UF_MG_pagechildren"]/div[2]/span/span').click()
    )# abre todos os  em 'mais'

element1 = tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$Munic%c3%adpio_3100104_details"]/span')
)#primeiro municipio

element2 = tryFind(lambda:
    navegador.find_element(By.XPATH, '//*[@id="whyNeedAnID$LocalidadeDim.LocalidadeDim_MemberShuttleLeftTreeContainer$Munic%c3%adpio_3144805_details"]/span')
)# ultimo municipio

actions = ActionChains(navegador)

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

date = datetime.now().year - 1 #offset of senso escolar
while(date>=2007):
    tryFind(lambda:
        navegador.find_element(By.CSS_SELECTOR, "img[src='/analyticsRes/res/s_InepdataCensoEscolar/master/selectdropdown_ena.png']").click()
    )
    tryFind(lambda:
        navegador.find_element(By.CSS_SELECTOR, f"div[title='{str(date)}']").click()
    )
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
    date-=1