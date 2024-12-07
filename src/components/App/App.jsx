import { Component } from 'react'

import { Layout, Space, Pagination } from 'antd'

import MovieService from '../../services/movie_services'
import MoviesList from '../Movies_list/Movies_list'
import Header from '../Header/Header'

import './App.css'
import 'antd/dist/reset.css'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    error: null,
    isLoaded: true,
    movies: [],
  }

  componentDidMount() {
    this.movieService.searchMovies()
      .then(
        (data) => {
          this.setState({
            movies: data.results,
            isLoaded: false,
          })
        }
      )
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      }
      )
  }

  render() {
    const { error, isLoaded, movies } = this.state
    return (
      <>
        <Layout>
          <Space direction="vertical" align="center">
            <Header />
            <MoviesList movies={movies} error={error} isLoaded={isLoaded} />
            <Pagination defaultCurrent={1} total={50} />
          </Space>
        </Layout>
      </>
    )
  }
}

/*
componentDidMount() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&s=return')
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            movies: data.results,
            isLoaded: false,
          })
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          })
        }
      )
  }
*/
