from database import Database
from bson.objectid import ObjectId
# from writeAJson import writeAJson
import win32com.client as win32
import pythoncom

class Compromisso:   
    def __init__(self, titulo, data, hora, duracao, localizacao, descricao, participantes):
        self.titulo = titulo
        self.data = data
        self.hora = hora
        self.duracao = duracao
        self.localizacao = localizacao
        self.descricao = descricao
        self.participantes = participantes

class CompromissoDAO: # DAO - Data Acess Object
    def __init__(self, colecao): # contrutor que inicia a conexão com o database
        self.db = Database(database="Calendario", collection=colecao)

    def documentoAux(self, usuario, senha, email):
        try:
            res = self.db.collection.insert_one({"usuario":usuario, "email":email, "senha":senha})
            return res.inserted_id
        except Exception as e:
            print(f"Houve um erro ao tentar criar o compromisso: {e}")

            return None
    
    def criar(self, compromisso): # função que cria compromissos
        try:
            res = self.db.collection.insert_one({
                "titulo": compromisso.titulo,
                "data": compromisso.data,
                "hora": compromisso.hora,
                "duracao": compromisso.duracao,
                "localizacao": compromisso.localizacao,
                "descricao": compromisso.descricao,
                "convidados": compromisso.participantes
                })
            return res.inserted_id
        except Exception as e:
            print(f"Houve um erro ao tentar criar o compromisso: {e}")
            return None
        
    def ler(self, data): #função que busca os compromissos da data passada como paramentro 
        try:
            res = self.db.collection.find({"data": data})
            return res
        except Exception as e:
            print(f"Houve um erro ao tentar ler o compromisso: {e}")
            return None
        
    def lerSemana(self, primeiroDia, segundoDia, terceiroDia, quartoDia, quintoDia, sextoDia, setimoDia): # função que busca os compromissos da semana
        try:
            res = self.db.collection.find({"data": {"$in": [primeiroDia, segundoDia, terceiroDia, quartoDia, quintoDia, sextoDia, setimoDia]}}).sort("data", 1)
            return res
        except Exception as e:
            print(f"Houve um erro ao tentar ler o compromisso: {e}")
            return None
        
    def lerMes(self, mes): # função que busca os compromissos do mês
        try:
            res = self.db.collection.find({"data": {"$regex": '.*\/' + mes + '\/.*'}}).sort("data", 1)
            return res
        except Exception as e:
            print(f"Houve um erro ao tentar ler o compromisso: {e}")
            return None

    def atualizar(self, id, compromisso): # atualiza o compromisso
        try:
            res = self.db.collection.update_one({"_id": ObjectId(id)}, {"$set": {
                "titulo": compromisso.titulo,
                "data": compromisso.data,
                "hora": compromisso.hora,
                "duracao": compromisso.duracao,
                "localizacao": compromisso.localizacao,
                "descricao": compromisso.descricao,
                "convidados": compromisso.participantes # é uma lista
                }})
            print(f"Compromisso atualizado!")
            return res.modified_count
        except Exception as e:
            print(f"Houve um erro ao tentar atualizar o compromisso: {e}")
            return None

    def deletar(self, id): # deleta o compromisso
        try:
            res = self.db.collection.delete_one({"_id": ObjectId(id)})
            print(f"Compromisso deletado!")
            return res.deleted_count
        except Exception as e:
            print(f"Houve um erro ao tentar deletar o compromisso: {e}")
            return None
        
def listaParticipantes(participantes): # cria uma lista com os emails dos participantes 
    convidados = []
    posicao = 0
    tamanhoString = len(participantes)
    for i in range(0, tamanhoString):
        caracter = participantes[i]
        if(caracter == ';'):
            posicaoPV = i
            email = participantes[posicao:posicaoPV]
            convidados.append(email)
            posicao = posicaoPV+1
        elif(i == (tamanhoString-1)):
            email = participantes[posicao:(i+1)]
            convidados.append(email)
    print(convidados)
    return convidados

def enviarEmail(participantes, titulo, usuario, hora, data): # envia um email para todos os participantes, convidando-os para o evento
    try:
        pythoncom.CoInitialize()
        outlook = win32.Dispatch('outlook.application') # para enviar email, estaremos usando o outlook do próprio computador

        lista = listaParticipantes(participantes)
        
        for i in lista:
            emailConvidado = outlook.CreateItem(0) #criando email
            emailConvidado.To = i
            emailConvidado.Subject = f"{titulo}"
            emailConvidado.HTMLBody = f"""<p>Convido você a participar do(a) {titulo}, no dia {data} às {hora}</p>
            <p>Atenciosamente,
            {usuario}</p>"""
            emailConvidado.Send()
    except Exception as e:
        print(e)
        print('Verifique se você possui o aplicativo do outlook instalado')

