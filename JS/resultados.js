const apiKey = 'cb84a85fba7a7b3fb2154f63f9730ddc';

// Constante que armazena o valor da respotsa do formulario de pesqquisa da pagina inicial//
var titulo = localStorage.getItem('titulo')

const resultsDiv = document.getElementById('search-results')

// Um "EventListener" para o código abaixo ser executado apenas após a pagina HTML inteira ser carregada //
document.addEventListener('DOMContentLoaded', function () {
    // Um fetch para requisitar os dados da API, com essa URL ele pega os filmes que tenham relação com a pesquisa do usuário //
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titulo}&language=pt-BR`;
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // Parte que cria as tags HTML e adiciona os conteúdos dela usando dados da pesquisa da API //
            resultsDiv.innerHTML= '';
            data.results.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('card');

                const poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                poster.alt = movie.title;

                const title = document.createElement('h3');
                title.textContent = movie.title;

                const releaseYear = document.createElement('p');
                releaseYear.textContent = `Data de Lançamento: ${movie.release_date.slice(0, 4)}`;

                const link = document.createElement('a');
                link.href = `movie.html?id=${movie.id}`;


                link.appendChild(card);
                card.appendChild(poster);
                card.appendChild(title);
                card.appendChild(releaseYear);
                resultsDiv.appendChild(link);
            });
        });
});