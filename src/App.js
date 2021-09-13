import React, { useEffect,  useState } from 'react';
import Tmdb from './Tmdb';
import './App.css'
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';


export default () => {

const [movieList, setMovieList] = useState ([]);
const [featureData, setFeatureData] = useState (null);
const[black, setBlack] = useState (false)

useEffect(()=>{
  const LoadAll = async () =>{
    //aqui no vamos pegar a lista completa usando um useeffect pata alterar quando o indicador entre chaves for visto
    //vamos dar um load no tmdb
    let list = await Tmdb.gethomelist();
    setMovieList(list);

    //aqui após pegar a lista nos pegamos o filme e destaque e setamos ele no
    //no meu useState featureData
    let originals = list.filter(i => i.slug === "originals")
    //aqui estou fazendo um filtro na minha lista, minha condição é que
    //o i seja igual a i.slug e este igual a originals, dessa forma eu 
    //vou retornar a lista de originais
    let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length))
    //aqui estou fazedno um aleatorio na minha lista, para que haja mudança aleatória de intes
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    //usando o getinfo criado no componente tmdb para retornar a serie selecionada

   setFeatureData(chosenInfo);

  }
  LoadAll();
}, []);

//aqui os faremos o efeito de rolagem de página, ou seja, o cabeçalho vai
//ficar escuro assim que página rolar
useEffect(()=>{
  const scroll = ()=>{
    if(window.scrollY > 10){
      setBlack(true)
    }
    else{
      setBlack(false)
    }
  }
  window.addEventListener('scroll', scroll);

  // return () =>{
  //   window.removeEventListener('scroll', scroll);
  // }
},[])


  return (
    <div className='page'>

    <Header black={black}/>
      {/* aqui estamos fazendo a pre vizualicação do filme de DESTAQUE
      que fica na parte de sima do aplicativo
      estamos exibindo o componente na tela caso exista alguma filme na 
      minha lista, e retornando ele em uma props usando o useState  */}

     {featureData &&
     <FeatureMovie item={featureData}/>
     }
      

      <section className='lists'>
       {movieList.map((item, key)=>(
         //aqui eu tenho um componente que ir retornar a lista de filmes
         //ao inves de fazer tudo aqui de forma direta, eu faço em uma página exerna e chamo ela com os dado
         <MovieRow key={key} title={item.title} items={item.items}/> //essa duas props estão sendo recebidas no meu movierow
         //obrigatoriamente toda map tem que ter uma key
       ))}
      </section>
      <footer>
        Feito em aula com b7web<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos no site Themoviedb.org

      </footer>
      {movieList.length <= 0 &&
       <div className='loading'>
       <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif'></img>
     </div>
      }
    </div>
  );
};
