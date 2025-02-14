import { Component } from 'react'
import { Card } from 'antd'
import Rating from '../Rating/Rating'
import GenresContext from '../GenresProvider/genresContext'

import { parseISO, format } from 'date-fns'

import './Movie_card.css'

import PropTypes from 'prop-types'

export default class MovieCard extends Component {
  static contextType = GenresContext
  render() {
    const { movie, onChangeRate } = this.props

    const { poster_path, title, release_date, overview, vote_average, id, genre_ids, rating } = movie

    function shorten(text, maxLenght) {
      if (text.length > maxLenght) {
        return `${text.slice(0, maxLenght).split(' ').slice(0, -1).join(' ')}...`
      } else {
        return `${text}...`
      }
    }

    let cutOverview = shorten(overview, 160)

    let currentDate = release_date ? format(parseISO(release_date), 'MMMM d, yyyy') : '-'

    function colorMap(vote_average) {
      if (vote_average <= 3) {
        return '#E90000'
      } else if (vote_average <= 5) {
        return '#E97E00'
      } else if (vote_average <= 7) {
        return '#E9D100'
      } else {
        return '#66E900'
      }
    }

    let contextRatings = this.context.moviesRating
    let contextRating = contextRatings && contextRatings[id] ? contextRatings[id] : undefined
    let currentRating = rating ? rating : contextRating ? contextRating : undefined
    return (
      <Card className="card" id={id}>
        <img className="card_picture" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="Обложка фильма" />
        <div className="content">
          <div className="card_title"> {title} </div>
          <span className="card-popularity" style={{ borderColor: colorMap(vote_average) }}>
            {vote_average}
          </span>
          <div className="card_date"> {currentDate} </div>
          {genre_ids && (
            <div className="card_genres">
              {genre_ids.map((genre) => (
                <span className="genres_tags" key={genre}>
                  {this.context?.genres &&
                    this.context.genres.length &&
                    this.context.genres.find((element) => {
                      return element.id === genre
                    }).name}
                </span>
              ))}
            </div>
          )}

          <div className="card_description"> {cutOverview} </div>
          <Rating onChange={onChangeRate} movieId={id} value={currentRating} />
        </div>
      </Card>
    )
  }
}

MovieCard.defaultProps = {
  onChangeRate: () => {},
}

MovieCard.propTypes = {
  onChangeRate: PropTypes.func,
}
