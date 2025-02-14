import { useContext } from 'react'
import MovieCard from '../Movie_card'
import { Spin, Alert } from 'antd'

import GenresContext from '../GenresProvider/genresContext'

import './Movies_list.css'

import PropTypes from 'prop-types'

function MoviesList({ error, isLoaded, movies, onChangeRate }) {
  const { genres, moviesRating } = useContext(GenresContext)

  if (error) {
    return <Alert message="Error" description="Что-то пошло не так... Скоро мы всё исправим!" type="error" />
  } else if (!navigator.onLine) {
    return <Alert message="Error" description="Отсутствует подключение к интренету" type="error" />
  } else if (isLoaded) {
    return <Spin size="large" />
  } else if (!movies.length) {
    return <Alert description="Ничего не найдено" type="info" />
  } else {
    return (
      <div className="card-list">
        {movies.map((movie) => (
          <GenresContext.Provider key={movie.id} value={{ genres, moviesRating }}>
            <MovieCard key={movie.id} movie={movie} onChangeRate={onChangeRate} />
          </GenresContext.Provider>
        ))}
      </div>
    )
  }
}

export default MoviesList

MoviesList.defaultProps = {
  onChangeRate: () => {},
}

MoviesList.propTypes = {
  onChangeRate: PropTypes.func,
}
