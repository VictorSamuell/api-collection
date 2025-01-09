// script.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar o envio tradicional do formulário
        const pokemonName = document.getElementById('pokemon-name').value;  // Removido toLowerCase()
        const pokemonInfoDiv = document.getElementById('pokemon-info');
      
        try {
          const response = await fetch(`/api/pokemon/${pokemonName}`);
          const data = await response.json();
      
          if (data.error) {
            pokemonInfoDiv.innerHTML = `<p>${data.error}</p>`;
          } else {
            pokemonInfoDiv.innerHTML = `
              <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
              <img src="${data.sprite}" alt="${data.name}">
              <p>Altura: ${(data.height * 10)/100} m</p>
              <p>Peso: ${data.weight} hectogramas</p>
              <p>Tipos: ${data.types.join(', ')}</p> <!-- Exibe os tipos -->
            `;
          }
        } catch (error) {
          console.error('Erro na requisição:', error);  // Log do erro no navegador
          pokemonInfoDiv.innerHTML = '<p>Erro ao buscar o Pokémon. Tente novamente.</p>';
        }
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