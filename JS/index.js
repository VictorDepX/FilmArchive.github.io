// Constante que vai armazenar os valores que são chaves de acesso para a API //
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjg0YTg1ZmJhN2E3YjNmYjIxNTRmNjNmOTczMGRkYyIsInN1YiI6IjY2MzhjMTFjYWUzODQzMDEyMmM5ZmU2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7bKOblYEnF8e_JGNo05BIyd7eKUPY87rCOJSREwNKow'
    }
};

// Um "EventListener" para o código abaixo ser executado apenas após a pagina HTML inteira ser carregada //
document.addEventListener('DOMContentLoaded', function () {
    // Um fetch para requisitar os dados da API, com essa URL ele pega os dados dos filmes que estão agora em cartaz nos cinemas //
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=pt-BR', options)
        .then(response => response.json())
        .then(response => {
            const movies = response.results;
            const container = document.getElementById('movies-container');

            // A parte que cria os elementos HTML para conter os filmes dentro de um cartão totalmenmte clicavél //
            movies.forEach(movie => {
                // Aqui o link está sentado para enviar para o site da TMDB (Modificações futuras) //
                const link = document.createElement('a');
                link.href = `movie.html?id=${movie.id}`;

                const card = document.createElement('div');
                card.classList.add('card');

                const poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                poster.alt = `Poster para ${movie.title}`;
                card.appendChild(poster);

                const title = document.createElement('h2');
                title.textContent = movie.title;
                card.appendChild(title);

                const rating = document.createElement('p');
                rating.textContent = `Nota: ${movie.vote_average}`;
                card.appendChild(rating);

                link.appendChild(card);
                container.appendChild(link);
            });
        })
        // Um orientador para caso dê erro no fetch do data da API //
        .catch(err => console.error(err));
});