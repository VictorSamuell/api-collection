document.getElementById('searchBtn').addEventListener('click', async function() {
    const pokemonName = document.getElementById('pokemonName').value.trim().toLowerCase();
    const pokemonInfo = document.getElementById('pokemonInfo');

    if (!pokemonName) {
        alert('Por favor, insira um nome de Pokémon.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/pokemon/${pokemonName}`);
        const data = await response.json();

        if (response.ok) {
            pokemonInfo.style.display = 'block'; // Exibe a seção de informações

            pokemonInfo.innerHTML = `
                <img src="${data.image}" alt="${data.name}">
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <p>ID: #${data.id}</p>
                <p>Altura: ${data.height / 10} m</p>
                <p>Peso: ${data.weight / 10} kg</p>
                <p>Tipos: ${data.types.join(', ')}</p>
                <h3>Stats:</h3>
                <ul>
                    ${data.stats.map(stat => `<li>${stat.stat}: ${stat.base_stat}</li>`).join('')}
                </ul>
            `;
        } else {
            pokemonInfo.style.display = 'none'; // Esconde a seção de informações
            alert(data.message || 'Pokémon não encontrado!');
        }
    } catch (error) {
        pokemonInfo.style.display = 'none'; // Esconde a seção de informações
        alert('Erro ao buscar informações do Pokémon.');
    }
});
