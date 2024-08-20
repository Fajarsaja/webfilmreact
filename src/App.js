import { useEffect, useState } from 'react';
import { getMovieList, searchMovie } from './api';
import './App.css';

const App = () => {

const [ topRatedMovies, setTopRatedMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setTopRatedMovies(result)
    })
  },[])

  const TopRatedMoviesList = () => {
    return topRatedMovies.map((movie, i) => {
      return(
          <div className='Movie-wrapper' key={i}>
              <div className='Movie-title'>{movie.title}</div>
              <img className='Movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
              <div className='Movie-date'>{movie.release_date}</div>
              <div className='Movie-rate'>{movie.vote_average}</div>
           </div>
      )
    })
  }

  const search = async (q) => {
    const query = await searchMovie(q)
    setTopRatedMovies(query.results)
    
  }

  // console.log({  TopRatedMovies : topRatedMovies });
  
  return (
    <div className="App">
      <header className="App-header">
       <div>
          <h1>FAJAR WEB MOVIE LIST</h1>
          <input placeholder='cari film disini....'
                 className='Movie-search'
                 onChange={({target}) => search(target.value)}>
          </input>
          
          <div className='Movie-container'>
              <TopRatedMoviesList/>
          </div>
       </div>
      </header>
    </div>
  );
}

export default App;
