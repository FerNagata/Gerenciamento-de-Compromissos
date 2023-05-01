from compromissos import Compromisso, CompromissoDAO, enviarEmail
from database import Database
from writeAJson import writeAJson
import flask

app = flask.Flask(__name__)

@app.route('/')
def index():
    return flask.render_template("login.html")

@app.route('/visaoGeral')
def visaoGeral():
    return flask.render_template("visaoGeral.html")

@app.route('/calendario')
def sair():
    return flask.render_template("calendario.html")

@app.route('/cadastro')
def cadastro():
    return flask.render_template("cadastro.html")


@app.route('/api/add-usuario', methods=['POST'])
def addUsuario():
    email = flask.request.json.get('email')
    usuario = flask.request.json.get('usuario')
    senha = flask.request.json.get('senha')
    colecao = usuario + '&' + senha
    compromissoDAO = CompromissoDAO(colecao)
    compromissoDAO.documentoAux(usuario, senha, email)
    return flask.render_template("login.html")

@app.route('/api/entrar', methods=['POST'])
def login():
    db = Database("Calendario", 'aux')
    colecoes = db.verificandoLogin()
    global usuario # essa variavel é global, porque ela será usada no email também
    usuario = flask.request.json.get('usuario')
    senha = flask.request.json.get('senha')
    nomeColecao = usuario + '&' + senha
    if nomeColecao in colecoes.list_collection_names():
        global compromissoDAO 
        compromissoDAO= CompromissoDAO(nomeColecao)
        return flask.jsonify({'success': True})
    else:
        return flask.jsonify({'success': False, 'message': 'Usuário ou senha inválidos'})

@app.route('/api/add-compromisso', methods=['POST'])
def criarEvento():
    compromisso = Compromisso(flask.request.json.get('titulo'), flask.request.json.get('data'), flask.request.json.get('hora'), flask.request.json.get('duracao'), flask.request.json.get('localizacao'), flask.request.json.get('descricao'), flask.request.json.get('listaParticipantes'))
    listaParticipantes = flask.request.json.get('listaParticipantes')
    titulo = flask.request.json.get('titulo')
    data = flask.request.json.get('data')
    hora = flask.request.json.get('hora')
    compromissoDAO.criar(compromisso)
    if (listaParticipantes != ""): # caso haja convidado(s), será enviado um email para este(s)
        enviarEmail(listaParticipantes, titulo, usuario, hora, data)
    return flask.render_template("calendario.html")

@app.route('/api/lendo-compromisso', methods=['GET'])
def lerEvento():
    dataCompromisso = flask.request.args.get('dataCompromisso')
    writeAJson(compromissoDAO.ler(dataCompromisso), "compromisso")
    with open('./json/compromisso.json') as f:
        data = flask.json.load(f)
    return flask.jsonify(data)

@app.route('/api/lendo-compromisso-semana', methods=['GET'])
def lerEventoSemana():
    primeiroDia = flask.request.args.get('primeiroDiaSemana')
    segundoDia = flask.request.args.get('segundoDiaSemana')
    terceiroDia = flask.request.args.get('terceiroDiaSemana')
    quartoDia = flask.request.args.get('quartoDiaSemana')
    quintoDia = flask.request.args.get('quintoDiaSemana')
    sextoDia = flask.request.args.get('sextoDiaSemana')
    setimoDia = flask.request.args.get('setimoDiaSemana')
    writeAJson(compromissoDAO.lerSemana(primeiroDia, segundoDia, terceiroDia, quartoDia, quintoDia, sextoDia, setimoDia), "compromissoSemana")
    with open('./json/compromissoSemana.json') as f:
        data = flask.json.load(f)
    return flask.jsonify(data)

@app.route('/api/lendo-compromisso-mes', methods=['GET'])
def lerEventoMes():
    mes = flask.request.args.get('mes')
    writeAJson(compromissoDAO.lerMes(mes), "compromissoMes")
    with open('./json/compromissoMes.json') as f:
        data = flask.json.load(f)
    return flask.jsonify(data)

@app.route('/api/update-compromisso', methods=['POST'])
def updateEvento():
    compromisso = Compromisso(flask.request.json.get('titulo'), flask.request.json.get('data'), flask.request.json.get('hora'), flask.request.json.get('duracao'), flask.request.json.get('localizacao'), flask.request.json.get('descricao'), flask.request.json.get('participantes'))
    compromissoDAO.atualizar(flask.request.json.get('id'), compromisso)

@app.route('/api/deletar-compromisso', methods=['POST'])
def deletarEvento():
    compromissoDAO.deletar(flask.request.json.get('id'))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)