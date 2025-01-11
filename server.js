const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

// usando o express para servir arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// search.html
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'search.html'));
});

//imgsearch.html
app.get('/imgsearch', (req, res) => {

  res.sendFile(path.join(__dirname, 'imgsearch.html'));

});


// rota pra buscar informações do Pokémon
app.get('/api/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name;  
  try {
    // requisição com axios da pokeapi
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    const pokemonData = {
      name: response.data.name,
      id: response.data.id,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map(type => type.type.name),
      sprite: response.data.sprites.front_default  
    };

    // envia as info dos pokemon em json
    res.json(pokemonData);
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);  
    res.status(404).json({ error: 'Pokémon não encontrado ou erro na comunicação com a PokéAPI' });  
  }
});

const UNSPLASH_API_KEY = 'sy1TTq1vZy2mqgdwxgGIVBiO8TQawC2P5eDLJ6XuNpI';
app.get('/api/images/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        client_id: UNSPLASH_API_KEY,
        per_page: 5
      }
    });

    const images = response.data.results.map(image => ({
      url: image.urls.small,
      alt_description: image.alt_description
    }));
    
    res.json(images);
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    res.status(404).json({ error: 'Erro ao buscar imagens do Unsplash' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
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