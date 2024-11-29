import { Component } from 'react'
import { Card } from 'antd';

import { parseISO, format } from "date-fns";


import './Movie_card.css';


export default class MovieCard extends Component {
 render() {
  const {movie} = this.props

  const {poster_path, title, release_date, overview} = movie


  function shorten(text, maxLenght) {
    if(text.length > maxLenght) {
      return `${text.slice(0, maxLenght).split(' ').slice(0, -1).join(' ')}...`
    } else {
      return `${text}...`
    }
  }
  
  let cutOverview = shorten(overview, 200)
  
  return (
    <Card className="card">
      <img className="card_picture" src={`https://image.tmdb.org/t/p/w500${poster_path}`}  alt="Обложка фильма"/>
      <div  className="content">
        <div className="card_title"> {title} </div>
            
        <div className="card_date"> {format(parseISO(release_date), "MMMM d, yyyy")} </div>
              
        <div className="card_genres">
          <span className="genres_tags">жанр</span>
          <span className="genres_tags">жанр</span>
          <span className="genres_tags">жанр</span>
        </div>
        <div className="card_description"> {cutOverview} </div>
      </div>
    </Card>
  )
 }
  
}


/*

<img src={`https://image.tmdb.org/t/p/w500`${poster_path}} 
API Read Access Token
   eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OThjZjVlYzc3YmNjNjNkMTRlOTY0NTViYzE2NjgwMiIsIm5iZiI6MTczMjYyNTQ4Ny4xMjk0MzMsInN1YiI6IjY3NDViZTYxNmVlZjViNDNhNWZjYTA2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n8_kik2KGosSjUWuOo3x2Ba_sdjhvd5J6xgBe3y0etw
*/