let calendario = document.querySelector('.calendario')

const nomeMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

let convidados = [] //lista com email dos participantes
let diasCalendario = calendario.querySelector('.dias')
let anoCalendario = calendario.querySelector('#ano')
let listaMes = calendario.querySelector('.lista-mes')
let opcaoMes = calendario.querySelector('#opcao-mes')
let dataAtual = new Date()
let mesAtual = {value: dataAtual.getMonth()};
let anoAtual = {value: dataAtual.getFullYear()};
const add = document.querySelector('.add');
const info = document.querySelector('.informacoes');
const salvar = document.querySelector('.submit');


anoBissexto= (ano) => {
    return (ano % 4 === 0 && ano % 100 !== 0 && ano % 400 !== 0) || (ano % 100 === 0 && ano % 400 ===0)
}

diasFev = (ano) => {
    return anoBissexto(ano) ? 29 : 28
}

function gerandoCalendario(mes, ano){
    
    let diasDoMes = [31, diasFev(ano), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    diasCalendario.innerHTML = ''

    let dataAtual = new Date()

    let mesAtual = `${nomeMes[mes]}`
    opcaoMes.innerHTML = mesAtual
    anoCalendario.innerHTML = ano

    let primeiroDia = new Date(ano, mes, 1)

    for (let i = 0; i <= diasDoMes[mes] + primeiroDia.getDay() - 1; i++) {
        let dia = document.createElement('div')
        dia.classList.add('dia')
        if (i >= primeiroDia.getDay()) {
            dia.innerHTML = i - primeiroDia.getDay() + 1
            if (i - primeiroDia.getDay() + 1 === dataAtual.getDate() && ano === dataAtual.getFullYear() && mes === dataAtual.getMonth()) {
                dia.classList.add('data-atual')
                evento(i - primeiroDia.getDay() + 1, mes+1, ano)
            }
        }
        diasCalendario.appendChild(dia)
    }
    SelecionandoDia();
}

nomeMes.forEach((e, index) => {
    let mes = document.createElement('div')
    mes.innerHTML = `<div data-month="${index}">${e}</div>`
    mes.querySelector('div').onclick = () => {
        // console.log(e)
        listaMes.classList.remove('show')
        mesAtual.value = index
        gerandoCalendario(mesAtual.value, anoAtual.value)
    }
    listaMes.appendChild(mes)
})

opcaoMes.onclick = () => {
    listaMes.classList.add('show')
}

//Abre o formulario de adicionar compromissos
function abrindoAdd(){
    info.style.display = 'block';
    info.classList.add('fadeIn');
}
//Fecha o formulário de adicionar compromissos
function fechandoAdd(){
    info.style.display = 'none';
    info.classList.remove('fadeIn');
}

document.querySelector('#ano-anterior').onclick = () => {
    --anoAtual.value
    gerandoCalendario(mesAtual.value, anoAtual.value)
}

document.querySelector('#proximo-ano').onclick = () => {
    ++anoAtual.value
    gerandoCalendario(mesAtual.value, anoAtual.value)
}

// função é chamada quando clicamos no botão de adicionar compromisso
function addCompromisso(eventoSelecionado){
    abrindoAdd();
}

// função que enviar os dados do compromisso e insere para o banco de dados
function salva(eventoSelecionado){
    // Variaveis auxiliares
    let titulo = document.querySelector('.titulo input').value;
    let hora = document.querySelector('.hora input').value;
    let duracao = document.querySelector('.duracao input').value;
    let localizacao = document.querySelector('.localizacao input').value;
    let descricao = document.querySelector('.descricao input').value;
    let listaParticipantes = document.querySelector('.participantes input').value;
    let data = document.querySelector('.data-compromisso').innerHTML;

    if (titulo != ""){
        fetch('/api/add-compromisso', {
            method:'POST',
            body: JSON.stringify({titulo, data, hora, duracao, localizacao, descricao, listaParticipantes}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        fechandoAdd();
        mostraCompromissos(data);
    } else {
        alert('Preencha o campo do titulo')
        fechandoAdd();
    }
}

// Selecionando o dia
function SelecionandoDia(){
    const dias = document.querySelectorAll(".dia");
    dias.forEach((dia) => {
        dia.addEventListener("click", (e) => {
            const diaSelecionado = Number(e.target.innerHTML);
            evento(diaSelecionado, mesAtual.value+1, anoAtual.value);
        });
    });
}

function evento(data, mes, ano) {
    const dataCompromisso = document.querySelector('.data-compromisso')
    dataCompromisso.innerHTML = data + "/" + mes + "/" + ano;
    // const dias = diasCalendario.querySelector('.dia')
    mostraCompromissos(dataCompromisso.innerHTML)
}

function mostraCompromissos(dataCompromisso){
    const compromissosDia = document.querySelector('.compromisso-dia')
    compromissosDia.innerHTML = ''
    fetch(`/api/lendo-compromisso?dataCompromisso=${dataCompromisso}`, {
        method:'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(jsonCompromisso => {
        compromissosDia.innerHTML = '';
        jsonCompromisso.forEach((eventoJson) => 
        compromissosDia.innerHTML += `<div class="evento">
            <div class="evento-titulo">
              <h3>${eventoJson.titulo}</h3>
            </div>
            <div class="ajuste">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="evento-menu">
                <li class="editar" onclick='editarCompromisso("${eventoJson._id.$oid}", "${eventoJson.titulo}", "${eventoJson.hora}", "${eventoJson.duracao}", "${eventoJson.localizacao}", "${eventoJson.descricao}", "${eventoJson.data}")'>Editar</li>
                <li class="deletar" onclick='deletarCompromisso("${eventoJson._id.$oid}", "${eventoJson.data}")'>Deletar</li>
            </ul>
            </div>            
            <div class="evento-hora">
                <span >${eventoJson.hora}</span>
                <span > - ${eventoJson.duracao} </span>
            </div>
            <div class="evento-localizacao">
              <span >${eventoJson.localizacao}</span>
            </div>
            <div class="evento-descricao">
              <span>${eventoJson.descricao}</span>
            </div>
            <div class="evento-participantes">
              <span>${eventoJson.convidados}</span>
            </div>
        </div>`
        )
    })
}

//mostra a opcao de editar um compromisso ou deleta-lo
function showMenu(eventoSelecionado) {
    let menuDiv = eventoSelecionado.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != eventoSelecionado) {
            menuDiv.classList.remove("show");
        }
    });
}

function editarCompromisso(id, title, h, duration, local, desc, data){
    abrindoAdd();

    salvar.addEventListener('click', () => {
    
    if (title != ""){
        fetch(`/api/update-compromisso`, {
            method:'POST',
            body: JSON.stringify({id, title, h, duration, local, desc}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        fechandoAdd();
        mostraCompromissos(data);
    } else{
        fechandoAdd();
    }
    })
}

function deletarCompromisso(id, data){
    fetch('/api/deletar-compromisso', {
        method:'POST',
        body: JSON.stringify({id}),
        headers: {'Content-Type': 'application/json'}
    })
    mostraCompromissos(data)
}

gerandoCalendario(mesAtual.value, anoAtual.value);
