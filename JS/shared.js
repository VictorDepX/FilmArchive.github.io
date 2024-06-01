// Função para verificar se o usuário está logado e exibir a mensagem de boas-vindas
function checkLoggedInUser() {
    const username = sessionStorage.getItem('loggedUser');
    if (username) {
        // Define o elemento de boas-vindas como visível
        document.getElementById('welcome-message').style.display = 'block';
        // Define o texto de boas-vindas com o nome do usuário
        document.getElementById('welcome-message').textContent = 'Olá, ' + username;
    } else {
        // Se não houver nome de usuário armazenado, mantém o elemento de boas-vindas oculto
        document.getElementById('welcome-message').style.display = 'none';
    }
}

// Verifica se o usuário está logado ao carregar a página
checkLoggedInUser();
