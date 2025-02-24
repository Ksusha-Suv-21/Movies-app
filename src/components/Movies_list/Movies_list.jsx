import MovieCard from '../Movie_card'
import { Spin, Alert } from 'antd'

import './Movies_list.css'

import PropTypes from 'prop-types'

function MoviesList({ error, isLoaded, movies, onChangeRate }) {
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
          <MovieCard key={movie.id} movie={movie} onChangeRate={onChangeRate} />
        ))}
      </div>
    )
  }
}

export default MoviesList

MoviesList.propTypes = {
  onChangeRate: PropTypes.func,
}
