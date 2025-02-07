document.addEventListener('DOMContentLoaded', async () => {
    const searchForm = document.getElementById('search-image-form');
    const imageQuery = document.getElementById('image-query');
    const imageResults = document.getElementById('image-results');
    const containerDiv = document.getElementById('container');
    const searchAnotherButton = document.getElementById('search-another');

    
    searchAnotherButton.addEventListener('click', () => {
        imageResults.innerHTML = '';
        imageQuery.value = '';
        containerDiv.classList.remove('expandedImg');
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

                    const tresimagens = imagens.slice(0, 3);

                    imageResults.innerHTML = tresimagens.map(image => `
                        <div class="image-result">
                            <img src="${image.url}" alt="${image.alt_description || 'Imagem sem descrição'}">
                            
                            </div>
                            `).join('');

                    containerDiv.classList.add('expandedImg');
                    searchAnotherButton.style.display = 'inline-block';

                    setTimeout(() => {
                        document.querySelectorAll('.image-result').forEach(img => img.classList.add('show'));
                    }, 50);

                        

                    }else{
                        imageResults.innerHTML = '<p>Nenhuma imagem encontrada</p>';
                        containerDiv.classList.remove('expandedImg');

                    }

            }catch(error){
                console.error('Erro ao buscar imagens:', error);
                imageResults.innerHTML = '<p>Erro ao buscar imagens. Tente novamente.</p>';
                containerDiv.classList.remove('expandedImg');
            }

        }
    });
});

