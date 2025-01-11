document.addEventListener('DOMContentLoaded', async () => {
    const searchForm = document.getElementById('search-image-form');
    const imageQuery = document.getElementById('image-query');
    const imageResults = document.getElementById('image-results');
    const containerDiv = document.getElementById('container');
    const searchAnotherButton = document.getElementById('search-another');

    searchAnotherButton.addEventListener('click', () => {
        imageResults.innerHTML = '';
        imageQuery.value = '';
        containerDiv.classList.remove('expanded');
        searchAnotherButton.style.display = 'none';
    });



    searchForm.addEventListener('submit', async (event) => {

        event.preventDefault();
        const query = imageQuery.value.trim();

        if(query){
            try{

                const resposta = await fetch(`/api/images/${query}`);
                const imagens = await resposta.json();

                if(imagens.length > 0){

                    imageResults.innerHTML = imagens.map(image => `
                        <div class="image-result">
                            <img src="${image.url}" alt="${image.alt_description || 'Imagem sem descrição'}">
                            
                            </div>
                            `).join('');

                    containerDiv.classList.add('expanded');
                    searchAnotherButton.style.display = 'inline-block';



                    }else{
                        imageResults.innerHTML = '<p>Nenhuma imagem encontrada</p>';
                        containerDiv.classList.remove('expanded');

                    }

            }catch(error){
                console.error('Erro ao buscar imagens:', error);
                imageResults.innerHTML = '<p>Erro ao buscar imagens. Tente novamente.</p>';
                containerDiv.classList.remove('expanded');
            }

        }
    });
});

