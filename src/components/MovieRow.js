import React, { useEffect, useState } from "react";
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items})=>{

    const [scrollx, setScrollx] = useState(0);

    //aqui eu recebo o tile do meu tmdb, na página app e passo como parametro para setar o seu uso no movie list
   const handleLeftArrow = () =>{
        let x = scrollx + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollx(x);
   }

   const handleRighttArrow = () =>{
    let x = scrollx - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;

    if((window.innerWidth - listW) > x ){
        x = (window.innerWidth - listW) - 60;
    }

    setScrollx(x);
}
   

    return(
        <div className="movierow">
            <h2>{title}</h2>
            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize:50}}/>
            </div>
            <div className='movieRow--right'onClick={handleRighttArrow}>
                 <NavigateNextIcon style={{fontSize:50}}/>
            </div>
            <div className='movierow--listarea'>
                {/* //para fazer um slider com as imagens eu tenho que ter duas divs, uma que vai englobar todo as imagens e a div que as contem
                e a div com as imagens para fazer o rolamento */}
                <div className="movierow--list" style={{
                    marginLeft: scrollx,
                    width: items.results.length *150
                }}>
                {items.results.length > 0 && items.results.map((item, key)=>(
                    <div key={key} className="movierow--item">
                    <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                    </div>
                ))}
                {/* caso tenha algo para ser exibido o meu item tera um map que vai retornar
                todos os seus items, é um map de items que roda dentro do map do movieList */}
            
                </div>
               </div>
        </div>
    );
}