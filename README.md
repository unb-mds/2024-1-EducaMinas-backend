# [EducaMinas](https://educaminas.vercel.app/)

[![codecov](https://codecov.io/gh/unb-mds/2024-1-EducaMinas-backend/graph/badge.svg?token=RL1Q0kz1Ay)](https://codecov.io/gh/unb-mds/2024-1-EducaMinas-backend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/unb-mds/2024-1-EducaMinas-backend)](https://img.shields.io/github/issues/unb-mds/2024-1-EducaMinas-backend)
[![GitHub contributors](https://img.shields.io/github/contributors/unb-mds/2024-1-EducaMinas-backend)](https://img.shields.io/github/contributors/unb-mds/2024-1-EducaMinas-backend)

---

<div align="center">
    <img src="https://github.com/unb-mds/2024-1-EducaMinas-frontend/blob/develop/docs/docs/assets/logo.png?raw=true" style="width:30vw"/>
</div>


---

Para melhor divisão e organização, o EducaMinas está dividido em dois repositórios.

Você está no **Backend**. Acesse também:

- [📊 **Frontend**](https://github.com/unb-mds/2024-1-EducaMinas-frontend)

---

O [EducaMinas](https://educaminas.vercel.app/) é um projeto desenvolvido na disciplina Métodos de Desenvolvimento de Software (MDS) ofertada no curso de Engenharia de Software na Universidade de Brasília (UnB), que visa reunir em um único local dados sobre a educação no estado de Minas Gerais, utilizando informações extraídas da pesquisa educacional realizada pelo INEP. A plataforma permite diferentes interpretações dos dados, com ênfase no aspecto social do ensino mineiro.

O projeto é um software livre e está sob a licença [MIT](./LICENSE).

---

## 🗒️ Sumário

- [🚩 EducaMinas](#educaminas)
  - [🗒️ Sumário](#-sumário)
  - [🏁 Início](#-início)
    - [🏞️ Ambiente e Pré-requisitos](#️-ambiente-e-pré-requisitos)
    - [📲 Instalação](#-instalação)
    - [⚙️ Execução](#️-execução)
  - [🛠️ Guia de contribuição](#️-guia-de-contribuição)
  - [📒 Documentação e muito mais!](#-documentação-e-muito-mais)
  - [🏛️ Arquitetura](#️-arquitetura)
  - [📆 Board](#-board)
  - [🖼️ Protótipo](#-protótipo)
  - [🧑🏽‍💻 Desenvolvedores](#-desenvolvedores)

---

## 🏁 Início

Siga os passos abaixo para executar o **backend** do [**EducaMinas**](https://educaminas.vercel.app/):

### 🏞️ Ambiente e Pré-requisitos

Para rodar o projeto é fundamental ter algumas dependências globais:

- Node
- Miniconda/Python

Para visualizar versões, links e as instruções completas de configuração do ambiente: [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/)


### 📲 Instalação

Após configurar o [**Ambiente e Pré-requisitos**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/), em um diretório de sua máquina, abra o terminal e execute:

```bash
git clone https://github.com/unb-mds/2024-1-EducaMinas-backend.git
```

Com o repositório do backend devidamente clonado, você terá acesso à aplicação **Express** e ao **Scraper**:

#### **Express/API**

Navegue até o diretório raiz do repositório clonado:

```bash
cd 2024-1-EducaMinas-backend
```
Em seguida instale as dependências do EducaMinas:

```bash
npm install
```

#### **Scraper**

Navegue até o diretório `WebScrapper`:

```bash
cd WebScrapper
```
Crie um ambiente virtual com conda:

```bash
conda create --name <my-env>
```

Ative o ambiente criado:

```bash
conda activate <my-env>
```

Instale as dependências e bibliotecas dentro do ambiente virtual:

```bash
conda install --yes --file requirements.txt
```

O script ETL acessa o banco de dados por meio de um `.env` encontrado no caminho
`WebScrapper/DataETL/.env`. A sua estrutura está escrita abaixo:

```bash
DATABASE_USERNAME=<INSERIR AQUI>
DATABASE_PASSWORD=<INSERIR AQUI>
DATABASE_NAME=<INSERIR AQUI>
DATABASE_PORT=<INSERIR AQUI>
DATABASE_HOST=<INSERIR AQUI>
```


### ⚙️ Execução

#### **Express/API**

Para executar a aplicação Express em sua máquina, execute no diretório raiz:

```bash
npm run start
```
O servidor será inicializado e estará disponível na porta 3001 do localhost:

```bash
http://localhost:3001/
```

Demais comandos para execução de testes, builds e linter podem ser encontrados na guia _scripts_  do arquivo `package.json` na pasta raiz.

Com a api rodando localmente é possível acessar sua documentação e testá-la no **Swagger**, basta acessar:

```bash
http://localhost:3001/api-docs
```

#### **Scraper**

Com o ambiente ativado como instruído acima, para extrair os dados do Oracle Data com o selenium execute:

```bash
DataScraper/InepScrapper.py
```

#### **ETL**

Para tratar e carregar os dados extraídos, em modo debugger, acesse `WebScrapper/DataETL`, lembre-se de selecionar o ambiente conda que foi criado, e então para rodar o programa por partes, execute:

```bash
ETLDebugger.ipynb
```

Se preferir, e não precisar/quiser rodar em modo debugger(por partes), execute o código para produção:

```bash
python3 WebSrapper/DataETL/main.py
```

---

## 🛠️ Guia de contribuição

**Para acessar o guia completo de contribuição**: [**Guia de Contribuição**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)

Nele, você encontra as respostas para as seguintes questões:

- [Relatar um problema](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
- [Implementar uma funcionalidade](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/):
    - [Clone](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
    - [Dependências](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
    - [Branches](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
    - [Execução](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
    - [Commits](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
    - [Pull Requests](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
    - [Revisão e Merge](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)

---

## 📒 Documentação e muito mais!

**Para acessar a documentação completa**: [**Documentação EducaMinas**](https://unb-mds.github.io/2024-1-EducaMinas-frontend/)

Nela, você encontra os seguintes tópicos:

- [Início](https://unb-mds.github.io/2024-1-EducaMinas-frontend/)
- [Sprints](https://unb-mds.github.io/2024-1-EducaMinas-frontend/sprints/sprint-0/)
- [Projeto](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/personas/):
    - [Personas](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/personas/)
    - [StoryMap](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/storymap/)
    - [Requisitos](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/requirements/)
    - [EAP](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/eap/)
    - [API](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/servicos/)
    - [Arquitetura e Tecnologias](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/arquitetura/)
    - [Protótipo](https://unb-mds.github.io/2024-1-EducaMinas-frontend/project/prototipo/)
- [Como contribuir](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/):
    - [Ambiente de desenvolvimento](https://unb-mds.github.io/2024-1-EducaMinas-frontend/environment/)
    - [Primeiros passos - frotend](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-frontend/)
    - [Primeiros passos - backend](https://unb-mds.github.io/2024-1-EducaMinas-frontend/contributing-backend/)
- [Sobre](https://unb-mds.github.io/2024-1-EducaMinas-frontend/about/)

---

## 🏛️ Arquitetura

Confira a visualização geral da arquitetura do [**EducaMinas**](https://educaminas.vercel.app):

<div align="center">
    <img src="https://github.com/unb-mds/2024-1-EducaMinas-frontend/blob/develop/docs/docs/assets/arq.png?raw=true"/>
</div>

---

## 📆 Board

Acesse nosso [**Board no GitHub**](https://github.com/orgs/unb-mds/projects/22/views/2) e acompanhe o desenvolvimento dos dois repositórios simultâneamente: [**Board EducaMinas**](https://github.com/orgs/unb-mds/projects/22/views/2)

---

## 🖼️ Protótipo

Visualize nosso protótipo diretamente no FIGMA: [**Protótipo EducaMinas**](https://www.figma.com/proto/S3GrGX5HUojoKvHAnFNiXy/EducaMinas?type=design&node-id=1-3&t=5Cn41AoersmZdQp3-0&scaling=scale-down&page-id=0%3A1)

---

## 🧑🏽‍💻 Desenvolvedores

<center>
<table style="margin-left: auto; margin-right: auto;">
    <tr>
        <td align="center">
            <a href="https://github.com/rafgpereira">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/81361524?v=4" width="150px;"/>
                <h5 class="text-center">Rafael Pereira</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/johan-rocha">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/104279524?v=4" width="150px;"/>
                <h5 class="text-center">Johan Rocha</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/JoaoPedrooSS">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/130873951?v=4" width="150px;"/>
                <h5 class="text-center">João Pedro</h5>
            </a>
        </td>
        </td>
        <td align="center">
            <a href="https://github.com/jlucasiqueira">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/143570377?v=4" width="150px;"/>
                <h5 class="text-center">João Lucas</h5>
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/dudupaz">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/122990784?v=4" width="150px;"/>
                <h5 class="text-center">Carlos Eduardo</h5>
            </a>
        </td>
          <td align="center">
            <a href="https://github.com/DanielFsR">
                <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/118537519?v=4" width="150px;"/>
                <h5 class="text-center">Daniel Ferreira</h5>
            </a>
        </td>
</table>
</center>
