const id = new URLSearchParams(window.location.search).get('id');
const apiKey = 'cb84a85fba7a7b3fb2154f63f9730ddc';
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById('title').textContent = data.title;
        document.getElementById('synopsis').textContent = data.overview;
        document.getElementById('rating').innerHTML = `${data.vote_average}/10`;
        document.getElementById('poster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        document.getElementById('duration').textContent = `Duração: ${data.runtime} minutos`;
        document.getElementById('rating-age').textContent = `Faixa etária: ${data.adult ? '16+' : '13+'}`;

        // Pega os genêros do filme
        const genresList = document.getElementById('genres-list');
        data.genres.forEach(genre => {
            const genreElement = document.createElement('li');
            genreElement.textContent = genre.name;
            genresList.appendChild(genreElement);
        });

        // Pega o trailer do filme
        const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=pt-BR`;
        fetch(trailerUrl)
            .then(response => response.json())
            .then(data => {
                const trailer = data.results.find(video => video.type === 'Trailer');
                if (trailer) {
                    const trailerElement = document.getElementById('trailer');
                    trailerElement.src = `https://www.youtube.com/embed/${trailer.key}`;
                    trailerElement.style.display = 'block';
                }
                else {
                    trailerElement.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching trailer:', error);
            });

        // Pega os comentários
        const commentsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=pt-BR`;
        fetch(commentsUrl)
            .then(response => response.json())
            .then(data => {
                const commentsList = document.getElementById('comments-list');
                data.results.forEach(comment => {
                    const commentElement = document.createElement('li');
                    commentElement.innerHTML = `
                                <strong>${comment.author}</strong>
                                <p>${comment.content}</p>
                                `;
                    commentsList.appendChild(commentElement);
                });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching movie data:', error);
    });

// Armazenar os valores do formulário de comentário
const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = sessionStorage.getItem('loggedUser');
    const content = document.getElementById('content').value;
    const userRating = document.getElementById('user-rating').value;
    const newComment = {
        author,
        content,
        userRating,
    };

    if (author == null) {
        alert('Você precisa estar logado para adicionar um comentário!');
        document.getElementById('content').value= ''
        document.getElementById('userRating').value= 0
    }
    else {
        // Manda o comentario pra API mostrar com os outros(somem por sessão)
        const newCommentUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=pt-BR`;
        fetch(newCommentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then(response => response.json())
            .then((data) => {
                const commentsList = document.getElementById('comments-list');
                const newCommentElement = document.createElement('li');
                newCommentElement.innerHTML = `
                            <strong>${author}</strong>
                            <p>${content}</p>
                            <p>Sua nota: ${userRating}/10</p>
                            `;
                commentsList.appendChild(newCommentElement);
                commentForm.reset();
            })
            .catch(error => {
                console.error('Error adding new comment:', error);
            });
    }
});