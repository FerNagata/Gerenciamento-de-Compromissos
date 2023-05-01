const login = document.querySelector('.submit');

login.addEventListener('click', function(event){
    event.preventDefault();
    // Variaveis auxiliares
    let usuario = document.querySelector('.usuario').value;
    let senha = document.querySelector('.senha').value;

    fetch('/api/entrar', {
        method: 'POST',
        body: JSON.stringify({usuario, senha}),
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = '/calendario';
        } else {
          alert(data.message);
        }
      })
      .catch(error => alert(error));
})