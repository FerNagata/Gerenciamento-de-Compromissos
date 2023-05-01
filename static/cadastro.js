const salvar = document.querySelector('.submit');

salvar.addEventListener('click', () => {
    
    // Variaveis auxiliares
    let email = document.querySelector('.email').value;
    let usuario = document.querySelector('.usuario').value;
    let senha = document.querySelector('.senha').value;

    fetch('/api/add-usuario', {
        method:'POST',
        body: JSON.stringify({email, usuario, senha}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    alert('Cadastro feito! Bem vindo!');
    window.location.replace('/');
})
