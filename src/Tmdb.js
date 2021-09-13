//nesse arquivo faremos todas as requisições necessarias a api, ou seja, nenhuma requisição será feitao no meio do projeto

const API_KEY = 'e1aff8260b1264a658d49ef071459d23';
const API_BASE = 'https://api.themoviedb.org/3'
//KEY E LINK DA API PARA REQUISIÇÃO

//função que faz um fetch na url que vou pegar o resutaldo e retornar o json

const basicfetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    //pegando o json da minha requisição para retornar os dados da minha lista 
    const json = await req.json();
    return json;
}



//exportando o json da api para uso externo
//lista de exibição no site
export default {
    gethomelist: async() =>{
        return[
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicfetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items:  await basicfetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'top rated',
                title: 'Em Alta',
                items: await basicfetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicfetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicfetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicfetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicfetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicfetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },

    getMovieInfo: async (movieId, type) =>{
        let info = {};

        if(movieId){
            switch(type){
                case 'movie':
                   info = await basicfetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv':
                    info = await basicfetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}