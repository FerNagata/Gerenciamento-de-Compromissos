# Software de Gerenciamento de Compromissos
É um software de gerenciamento na forma de um calendario que agenda compromissos, definindo a data, hora, duração, localização, título, descrição e permite aos usuários convidar participantes para as reuniões através de um email.

Foi utilizado HTML, CSS e JavaScript para o front-end e Python e MongoDB Atlas (MongoDB Query Language) para o back-end.

---
## Preparando ambiente:
\* IDE utilizada: VSCode. OBS: Pode usar qualquer IDE. Eclipse, InteliJ...fica a seu critério.

Para o ambiente, é preciso fazer a instalação do:
1. venv (módulo que oferece suporte a criação de "ambientes virtuais"): `python - venv .venv` e para ativar esse módulo: `.venv\Scripts\activate`
2. Flask (micro-framework web em Python): `pip install flask` ou `python -m pip install flask` 
3. bson (binary JSON): `pip install bson`
4. pymongo (biblioteca do python feita para o mongoDB): `pip install pymongo`

Para abrir o software, execute o arquivo conexaoFlask.py:
```
python conexaoFlask.py
```
Ao executar esse arquivo, será gerado 2 URLs, escolha uma e clique junto com a tecla control.

---
## Cypress:
Também foi realizado testes de UI utilizando o Cypress.

### Ambiente para execução:

1. Git Bash (Git for Windows - mais leve): https://gitforwindows.org/

2. nodejs (node): https://nodejs.org/en

3. Instalação do Cypress:
Faça a instalação do Cypress via linha de comando. Abra o terminal e digite: `npm install cypress`

    Caso não queira utilizar o Cypress pelo NPM, pode fazer o download direto do site: https://www.cypress.io/

    Link para download direto: https://download.cypress.io/desktop

    Basta baixar, extrair, executar o Cypress.exe e apontar para o diretório do projeto desejado na interface do cypress. Utilize a IDE para editar o código.

E para executá-lo:
* Pelo Git Bash (na pasta de ui_test):
``` 
npx cypress open
```
---
## Observações:
- Na parte de adicionar participantes - separar os email com ponto e vírgula (;).
- Para que o software consiga enviar o email para os outros participantes é preciso que você tenha no computador o aplicativo do outlook. 

