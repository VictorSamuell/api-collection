const form = document.getElementById('search-movie-form');
const queryInput = document.getElementById('movie-query');
const resultsContainer = document.getElementById('movie-results');
const searchAnotherBtn = document.getElementById('search-another');
const containerDiv = document.getElementById('container');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();

    if (!query) {
        alert('Por favor, digite o nome de um filme!');
        return;
    }
    
    //limpar os resultados anteriores
    resultsContainer.innerHTML = '';

    try {
        // Req com a api movies do backend
        const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
        }
        const movies = await response.json();

        if (movies.length === 0) {
            resultsContainer.innerHTML = '<p class="desc">Nenhum filme encontrado.</p>';
            containerDiv.classList.remove('expandedMovies');
            return;
        }
        // Exibir os filmes encontrados

        //[0] no movies pra mostrar apenas o primeiro filme da pesquisa
            const movie = movies[0];

            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-card');

            movieElement.innerHTML = `
            <div class="movie-container">
                <h2 class="movieTitle">${movie.title}</h2>
                <p><strong>Sinopse:</strong> ${movie.overview || 'Sem descrição disponível.'}</p>
                <p><strong>Data de lançamento:</strong> ${movie.release_date || 'Desconhecida'}</p>
                ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster de ${movie.title}" class="movie-poster">` : ''}
            </div>
`;

            resultsContainer.appendChild(movieElement);
        
        // Mostrar botão para nova pesquisa
        containerDiv.classList.add('expandedMovies');
        searchAnotherBtn.style.display = 'inline-block';

    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        resultsContainer.innerHTML = '<p class="desc">Erro ao buscar filmes. Tente novamente mais tarde.</p>';
    }
});

// nova pesquisa
searchAnotherBtn.addEventListener('click', () => {
    queryInput.value = '';
    resultsContainer.innerHTML = '';
    searchAnotherBtn.style.display = 'none';
    containerDiv.classList.remove('expandedMovies');
});







/*
const form = document.getElementById('search-movie-form');
const queryInput = document.getElementById('movie-query');
const resultsContainer = document.getElementById('movie-results');
const searchAnotherBtn = document.getElementById('search-another');
const containerDiv = document.getElementById('container');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();

    if (!query) {
        alert('Por favor, digite o nome de um filme!');
        return;
    }
    
    //limpar os resultados anteriores
    resultsContainer.innerHTML = '';

    try {
        // Req com a api movies do backend
        const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar filmes. Tente novamente mais tarde.');
        }

        const movies = await response.json();

        if (movies.length === 0) {
            resultsContainer.innerHTML = '<p class="desc">Nenhum filme encontrado.</p>';
            containerDiv.classList.remove('expandedMovies');
            return;
        }
        // Exibir os filmes encontrados
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-card');

            movieElement.innerHTML = `
                <h2>${movie.title}</h2>
                <p><strong>Sinopse:</strong> ${movie.overview || 'Sem descrição disponível.'}</p>
                <p><strong>Data de lançamento:</strong> ${movie.release_date || 'Desconhecida'}</p>
                ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster de ${movie.title}" class="movie-poster">` : ''}
            `;

            resultsContainer.appendChild(movieElement);
        });
        // Mostrar botão para nova pesquisa
        containerDiv.classList.add('expandedMovies');
        searchAnotherBtn.style.display = 'inline-block';

    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        resultsContainer.innerHTML = '<p class="desc">Erro ao buscar filmes. Tente novamente mais tarde.</p>';
    }
});

// Nova pesquisa
searchAnotherBtn.addEventListener('click', () => {
    queryInput.value = '';
    resultsContainer.innerHTML = '';
    searchAnotherBtn.style.display = 'none';
    containerDiv.classList.remove('expandedMovies');
});

*/