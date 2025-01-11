// script.js

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('pokemon-name');
  const pokemonInfoDiv = document.getElementById('pokemon-info');
  const containerDiv = document.getElementById('container');
  const searchAnotherButton = document.getElementById('search-another'); 

  
  searchForm.addEventListener('submit', async (event) => {
      event.preventDefault(); 
      const pokemonName = searchInput.value.toLowerCase();

      try {
          const response = await fetch(`/api/pokemon/${pokemonName}`);
          const data = await response.json();

          if (data.error) {
              pokemonInfoDiv.innerHTML = `<p>${data.error}</p>`;
          } else {
              
              pokemonInfoDiv.innerHTML = `
                  <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                  <img src="${data.sprite}" alt="${data.name}">
                  <div class="infop">
                  <p>Nº na Pokédex: #${data.id}</p>
                  <p>Altura: ${(data.height * 10) / 100} m</p>
                  <p>Peso: ${(data.weight / 10).toFixed(1)} kg</p>
                  <p>Tipos: ${data.types.join(', ')}</p>
                  </div>
                  <a href="https://www.pokemon.com/br/pokedex/${data.name}" class="button2" target="_blank">${data.name.charAt(0).toUpperCase() + data.name.slice(1)} na Pokédex oficial</a>
              `;

              
              pokemonInfoDiv.style.display = 'block'; 
              containerDiv.classList.add('expanded');
              searchAnotherButton.style.display = 'inline-block';

          }
      } catch (error) {
          console.error('Erro na requisição:', error);  
          pokemonInfoDiv.innerHTML = '<p>Erro ao buscar o Pokémon. Tente novamente.</p>';
      }
  });

  // Evento de clique no botão "Pesquisar Outro Pokémon"
  searchAnotherButton.addEventListener('click', () => {
    
    pokemonInfoDiv.innerHTML = '';
    searchInput.value = '';
    pokemonInfoDiv.style.display = 'none';

    searchAnotherButton.style.display = 'none';
    containerDiv.classList.remove('expanded');

    
  });
});

/*
document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar o envio tradicional do formulário
    const pokemonName = document.getElementById('pokemon-name').value.toLowerCase();
    const pokemonInfoDiv = document.getElementById('pokemon-info');
  
    try {
      const response = await fetch(`/api/pokemon/${pokemonName}`);
      const data = await response.json();
  
      if (data.error) {
        pokemonInfoDiv.innerHTML = `<p>${data.error}</p>`;
      } else {
        pokemonInfoDiv.innerHTML = `
          <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <p>Altura: ${data.height} decímetros</p>
          <p>Peso: ${data.weight} hectogramas</p>
        `;
      }
    } catch (error) {
      pokemonInfoDiv.innerHTML = '<p>Erro ao buscar o Pokémon. Tente novamente.</p>';
    }
  });
  */