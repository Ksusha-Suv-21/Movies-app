
import MovieCard from '../Movie_card';

import './Movies_list.css';

function MoviesList ({ error, isLoaded, movies }) {
    if (error) {
     return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
    return (
    <div className="card-list">
      {movies.map(movie => 
        <MovieCard key={movie.id} movie={movie} />
      )}
    </div>
  );
}
}


export default MoviesList;

/*



   return (
    <div className="card-list">
      {items.map((item) => (
        <MovieCard key={item.id} item={item} />))}
    </div>
  );

<div className="card-list">
      <MovieCard/>
        
    </div>
    */