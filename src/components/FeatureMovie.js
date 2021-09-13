import react from "react";
import './FeatureMovie.css';
export default ({item}) =>{
//item é a prop que eu passei para o meu componente FeatureMovie
//peganod a data da API por filme
    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name)
    }

    let description = item.overview;
    if(description.lenght > 200){
        description = description.substring(0,200) + '...';
    }
    return(
        <section className='featured' style={{
            backgroudSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path}) `

        }}>
         <div className='featured--vertical'>
            <div className='featured--horizontal'>
             <div className='featured--name'>{item.original_name}</div>
                <div className='featured--info'>
                    <div className='featured--points'>{item.vote_average} pontos</div>
                    <div className='featured--year'>{firstDate.getFullYear()}</div>
                    <div className='featured--seasons'>{item.number_of_seasons} Temporada{ item.number_of_seasons > 1 ? 's' : '' }</div>
                    </div>
                    <div className='featured--description'>{description}</div>
                    <div className='featured--buttons'>
                        <a href={`/watch/${item.id}`} className='featured--watch'> ​► Assistir</a>
                        <a href={`/list/add/${item.id}`} className='featured--list' >+ Minha Lista</a>
                    <div className='featured--genres'><strong>Gêneros: </strong>{genres.join(', ')}</div>
                </div>
             </div>
        </div>
        </section>
    );

}