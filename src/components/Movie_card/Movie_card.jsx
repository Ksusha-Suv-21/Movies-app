import { Component } from 'react'
import { Card } from 'antd'
import Rating from '../Rating/Rating'
import GenresContext from '../GenresProvider/genresContext'
import shorten from '../../utils/ShotenOverview'
import classnames from 'classnames'

import { parseISO, format } from 'date-fns'

import './Movie_card.css'

import PropTypes from 'prop-types'

export default class MovieCard extends Component {
  render() {
    const { movie, onChangeRate } = this.props

    const { poster_path, title, release_date, overview, vote_average, id, genre_ids, rating } = movie

    let cutOverview = shorten(overview, 160)

    let currentDate = release_date ? format(parseISO(release_date), 'MMMM d, yyyy') : '-'

    let cardPopularityClasses = classnames('card_popularity', {
      'card_popularity--l4': vote_average <= 3,
      'card_popularity--l6': vote_average <= 5,
      'card_popularity--l8': vote_average <= 7,
      'card_popularity--u7': vote_average > 7,
    })

    return (
      <Card className="card" id={id}>
        <img
          className="card_picture"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          onError={(event) => {
            event.currentTarget.src = 'https://elm48.ru/bitrix/templates/kitlisa-market/img/shop.png'
          }}
          alt="Обложка фильма"
        />
        <div className="content">
          <div className="card_title"> {title} </div>
          <span className={cardPopularityClasses}>{Math.round(vote_average)}</span>
          <div className="card_date"> {currentDate} </div>

          <GenresContext.Consumer>
            {({ genres }) => {
              return (
                <div className="card_genres">
                  {genre_ids.map((genre) => (
                    <span className="genres_tags" key={genre}>
                      {genres &&
                        genres.length &&
                        genres.find((element) => {
                          return element.id === genre
                        }).name}
                    </span>
                  ))}
                </div>
              )
            }}
          </GenresContext.Consumer>

          <div className="card_description"> {cutOverview} </div>
          <GenresContext.Consumer>
            {({ moviesRating }) => {
              let currentRating
              if (moviesRating && moviesRating[id]) {
                currentRating = moviesRating[id]
              } else if (rating) {
                currentRating = rating
              }

              return <Rating onChange={onChangeRate} movieId={id} value={currentRating} />
            }}
          </GenresContext.Consumer>
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
