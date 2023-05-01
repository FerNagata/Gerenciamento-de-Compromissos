import pymongo

#classe Database - faz a conexão com o MongoDB 
class Database:
    def __init__(self, database, collection):
        self.connect(database, collection) 

    def connect(self, database, collection):
        try:
            connectionString = "mongodb+srv://root:root@cluster0.itld6qo.mongodb.net/test"
            self.clusterConnection = pymongo.MongoClient(
                connectionString,
                tlsAllowInvalidCertificates=True 
            )
            self.db = self.clusterConnection[database] 
            self.collection = self.db[collection] 
            print("Conectado ao banco de dados com sucesso!")
        except Exception as e:
            print(e)
    def verificandoLogin(self): # essa função é um auxiliar para verificar o login
        return self.db
