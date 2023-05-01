const classeHoje = document.querySelector('.hoje')
const classeSemana = document.querySelector('.semana')
const classeMes = document.querySelector('.mes')

var dataHoje = new Date()
var dia = dataHoje.getDate();
var mes = dataHoje.getMonth();
var ano = dataHoje.getFullYear();

function hoje(){
    const hoje = classeHoje.querySelector('.corpo')
    let dataCompromisso = dia + '/' + (mes+1) + '/' + ano;

    fetch(`/api/lendo-compromisso?dataCompromisso=${dataCompromisso}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(compromissosHoje => {
        hoje.innerHTML = '';
        compromissosHoje.forEach((evento) =>
        hoje.innerHTML += `<div class="compromisso">
        <div>${evento.data}</div>
        <div>- ${evento.titulo} -</div>
        <div>${evento.hora}</div>
    </div>`
        )
    })
    
}
function semana(){

    const semanaCorpo = classeSemana.querySelector('.corpo')
    var opcoes = { day: 'numeric', month: 'numeric', year: 'numeric' };
    //pegando as datas de todos os dias da semana atual
    let primeiroDiaSemana = new Date(dataHoje.setDate(dataHoje.getDate() - dataHoje.getDay()));
    let segundoDiaSemana = new Date(dataHoje.setDate(dataHoje.getDate() - dataHoje.getDay() + 1));
    let terceiroDiaSemana = new Date(dataHoje.setDate(dataHoje.getDate() - dataHoje.getDay() + 2));
    let quartoDiaSemana = new Date(dataHoje.setDate(dataHoje.getDate() - dataHoje.getDay() + 3));
    let quintoDiaSemana = new Date(dataHoje.setDate(dataHoje.getDate() - dataHoje.getDay() + 4));
    let sextoDiaSemana = new Date(dataHoje.setDate(dataHoje.getDate() - dataHoje.getDay() + 5));
    let setimoDiaSemana = new Date(dataHoje.setDate(dataHoje.getDate() - dataHoje.getDay() + 6));

    //tirando os zeros. (Exemplo: 03/04/2023 -> 3/4/2023)
    primeiroDiaSemana =primeiroDiaSemana.toLocaleDateString('pt-BR', opcoes).replace(/(^|\/)0+/g, '$1');
    segundoDiaSemana = segundoDiaSemana.toLocaleDateString('pt-BR', opcoes).replace(/(^|\/)0+/g, '$1');
    terceiroDiaSemana = terceiroDiaSemana.toLocaleDateString('pt-BR', opcoes).replace(/(^|\/)0+/g, '$1');
    quartoDiaSemana = quartoDiaSemana.toLocaleDateString('pt-BR', opcoes).replace(/(^|\/)0+/g, '$1');
    quintoDiaSemana = quintoDiaSemana.toLocaleDateString('pt-BR', opcoes).replace(/(^|\/)0+/g, '$1');
    sextoDiaSemana = sextoDiaSemana.toLocaleDateString('pt-BR', opcoes).replace(/(^|\/)0+/g, '$1');
    setimoDiaSemana = setimoDiaSemana.toLocaleDateString('pt-BR', opcoes).replace(/(^|\/)0+/g, '$1');

    fetch(`/api/lendo-compromisso-semana?primeiroDiaSemana=${primeiroDiaSemana}&segundoDiaSemana=${segundoDiaSemana}&terceiroDiaSemana=${terceiroDiaSemana}&quartoDiaSemana=${quartoDiaSemana}&quintoDiaSemana=${quintoDiaSemana}&sextoDiaSemana=${sextoDiaSemana}&setimoDiaSemana=${setimoDiaSemana}`)
    .then(response => response.json())
    .then(compromissosHoje => {
        semanaCorpo.innerHTML = '';
        compromissosHoje.forEach((evento) =>
        semanaCorpo.innerHTML += `<div class="compromisso">
        <div>${evento.data}</div>
        <div>- ${evento.titulo} -</div>
        <div>${evento.hora}</div>
    </div>`
        )
    })
}

function mesCompromissos(){
    const mesCorpo = classeMes.querySelector('.corpo')
    fetch(`/api/lendo-compromisso-mes?mes=${mes+1}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(compromissosMes => {
        mesCorpo.innerHTML = '';
        compromissosMes.forEach((evento) =>
        mesCorpo.innerHTML += `<div class="compromisso">
        <div>${evento.data}</div>
        <div>- ${evento.titulo} -</div>
        <div>${evento.hora}</div>
    </div>`
        )
    }) 
}

hoje();
semana();
mesCompromissos();