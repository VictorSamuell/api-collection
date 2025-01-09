const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

// Servindo arquivos estáticos (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a landing page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a página de pesquisa (search.html)
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'search.html'));
});

// Rota da API para buscar informações do Pokémon
app.get('/api/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name;  // Recebe o nome do Pokémon da URL
  try {
    // Faz a requisição para a PokéAPI
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    // Filtra as informações para enviar uma resposta mais limpa
    const pokemonData = {
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map(type => type.type.name),
      sprite: response.data.sprites.front_default  // Garantido que o sprite é retornado corretamente
    };

    // Envia as informações do Pokémon em formato JSON
    res.json(pokemonData);
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);  // Exibe o erro no console do servidor
    res.status(404).json({ error: 'Pokémon não encontrado ou erro na comunicação com a PokéAPI' });  // Resposta mais específica
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


/* 
const express = require('express');  // Importa o Express
const axios = require('axios');
const path = require('path');

const app = express();  // Inicializa o Express
const port = 3000;  // Define a porta do servidor

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});





// Rota para buscar informações do Pokémon
app.get('/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();  // Recebe o nome do Pokémon da URL

    try {
        // Faz a requisição para a Pokedex API
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        // Retorna os dados do Pokémon
        res.json({
            name: response.data.name,
            id: response.data.id,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map(type => type.type.name),
            stats: response.data.stats.map(stat => ({
                base_stat: stat.base_stat,
                stat: stat.stat.name
            })),
            image: response.data.sprites.front_default
        });
    } catch (error) {
        res.status(404).json({ message: 'Pokémon não encontrado!' });
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

*/