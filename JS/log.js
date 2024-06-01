document.addEventListener('DOMContentLoaded', function() {
    // Função para registrar um novo usuário
    document.getElementById('form-registro').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        if (username && password) {
            localStorage.setItem(username, password);
            alert('Usuário registrado com sucesso!');
            document.getElementById('reg-username').value = '';
            document.getElementById('reg-password').value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Função para logar um usuário existente
    document.getElementById('form-login').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (localStorage.getItem(username) === password) {
            alert('Login bem-sucedido!');
            sessionStorage.setItem('loggedUser', username);
            window.location.href = 'index.html';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });

    // Função para exibir o nome do usuário logado
    function displayLoggedUser() {
        const loggedUser = sessionStorage.getItem('loggedUser');
        if (loggedUser) {
            const nav = document.querySelector('nav ul');
            const li = document.createElement('li');
            li.textContent = `Olá, ${loggedUser}`;
            nav.appendChild(li);
        }
    }

    displayLoggedUser();
});
