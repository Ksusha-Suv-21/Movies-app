import { Component } from 'react'
import { Layout, Space, Pagination, Tabs } from 'antd'

import MovieService from '../../services/movie_services'
import MoviesList from '../Movies_list/Movies_list'
import SearchPanel from '../SearchPanel/SearchPanel'

import GenresContext from '../GenresProvider/genresContext'

import debounce from 'lodash.debounce'

import './App.css'
import 'antd/dist/reset.css'

export default class App extends Component {
  movieService = new MovieService()

  state = {
    error: null,
    isLoaded: true,
    movies: [],
    totalPages: 0,
    totalRatedPages: 0,
    currentPage: 1,
    currentRatedPage: 1,
    searchValue: '',
    userSessionId: null,
    guestSessionId: localStorage.getItem('guestSessionId') ? localStorage.getItem('guestSessionId') : null,
    genres: [],
    activeTab: 'search',
    moviesRating: {},
    requstToken: null,
  }

  componentDidMount() {
    const { searchValue, activeTab, guestSessionId } = this.state

    if (!guestSessionId) {
      this.guestSessions()
    }

    this.getMoviesRating()
    this.getGenresList()

    if (activeTab === 'search') {
      if (searchValue) {
        this.searchMovie()
      } else {
        this.gotMovies()
      }
    } else {
      this.getRatedMovies()
    }
  }

  getGenresList = () => {
    this.movieService
      .getGenres()
      .then((data) => {
        this.setState({
          genres: data.genres,
        })
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      })
  }

  changeRate = async (movieId, rate) => {
    const { moviesRating, userSessionId, guestSessionId } = this.state

    let res = await this.movieService.addRate(movieId, rate, userSessionId, guestSessionId)
    if (res.success) {
      let newMoviesRating = moviesRating
      newMoviesRating[movieId] = rate
      this.setState({
        moviesRating: newMoviesRating,
      })
    }
  }

  getRatedMovies = async () => {
    const { currentRatedPage, userSessionId } = this.state
    this.setState({
      movies: [],
    })
    let res = await this.movieService.ratedMovies(currentRatedPage, userSessionId)
    this.setState({
      movies: res.results,
      isLoaded: false,
      currentRatedPage,
      totalRatedPages: res.total_pages,
    })
  }

  getRatedMoviesGuest = async () => {
    const { currentRatedPage, guestSessionId } = this.state
    this.setState({
      movies: [],
    })
    try {
      let res = await this.movieService.ratedMoviesGuest(currentRatedPage, guestSessionId)
      this.setState({
        movies: res.results,
        isLoaded: false,
        currentRatedPage,
        totalRatedPages: res.total_pages,
      })
    } catch (e) {
      console.error(e)
    }
  }

  getMoviesRating = (pageNumber = 1) => {
    const { userSessionId, moviesRating } = this.state

    this.movieService
      .ratedMovies(pageNumber, userSessionId)
      .then((data) => {
        let currentMoviesRating
        if (data?.results?.length) {
          currentMoviesRating = data.results.map((movie) => {
            let result = {}
            result[movie.id] = movie.rating
            return result
          })
          currentMoviesRating = Object.assign({}, ...currentMoviesRating)
          this.setState({
            moviesRating: Object.assign(moviesRating, currentMoviesRating),
          })
          if (data.totalPages > pageNumber) {
            this.getMoviesRating(pageNumber++)
          }
        }
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      })
  }

  guestSessions = () => {
    this.movieService
      .guestSession()
      .then((data) => {
        if (data.success) {
          this.setState({
            guestSessionId: data.guest_session_id,
          })
          localStorage.setItem('guestSessionId', data.guest_session_id)
        }
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      })
  }

  gotMovies = () => {
    const { currentPage } = this.state
    this.setState({
      movies: [],
    })
    this.movieService
      .searchMovies(currentPage)

      .then((data) => {
        this.setState({
          movies: data.results,
          isLoaded: false,
          currentPage,
          totalPages: data.total_pages,
        })
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      })
  }

  searchMovie = () => {
    const { searchValue, currentPage } = this.state
    this.setState({
      movies: [],
    })
    this.movieService
      .searchMovies(currentPage, searchValue)
      .then((data) => {
        this.setState({
          movies: data.results,
          isLoaded: false,
          currentPage,
          totalPages: data.total_pages,
        })
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      })
  }

  changePage = (page) => {
    const { searchValue } = this.state
    this.setState(
      {
        currentPage: page,
      },
      () => {
        if (searchValue) {
          this.searchMovie()
        } else {
          this.gotMovies()
        }
      }
    )
  }

  changeRatedPage = (page) => {
    const { userSessionId } = this.state
    this.setState(
      {
        currentRatedPage: page,
      },
      () => {
        if (userSessionId) {
          this.getRatedMovies()
        } else {
          this.getRatedMoviesGuest()
        }
      }
    )
  }

  handleChange = debounce((e) => {
    this.setState(
      {
        searchValue: e.target.value,
        isLoaded: true,
      },
      () => {
        this.searchMovie()
      }
    )
  }, 1000)

  changeSpace = (space) => {
    const { searchValue, userSessionId } = this.state
    this.setState({
      activeTab: space,
    })

    if (space === 'search') {
      if (searchValue) {
        this.searchMovie()
      } else {
        this.gotMovies()
      }
    } else {
      if (userSessionId) {
        this.getRatedMovies()
      } else {
        this.getRatedMoviesGuest()
      }
    }
  }

  render() {
    const { error, isLoaded, movies, totalPages, currentPage, searchValue, currentRatedPage, totalRatedPages } =
      this.state

    return (
      <Layout>
        <GenresContext.Provider value={{ genres: this.state.genres, moviesRating: this.state.moviesRating }}>
          <Tabs
            onChange={(key) => {
              this.changeSpace(key)
            }}
            defaultActiveKey="1"
            items={[
              {
                label: 'Search',
                key: 'search',
                children: (
                  <Space id="search" direction="vertical" align="center">
                    <SearchPanel onChange={this.handleChange} />
                    <MoviesList
                      onChangeRate={this.changeRate}
                      movies={movies}
                      error={error}
                      isLoaded={isLoaded}
                      searchValue={searchValue}
                    />
                    <Pagination
                      defaultCurrent={1}
                      total={totalPages * 10}
                      showSizeChanger={false}
                      currentPage={currentPage}
                      onChange={this.changePage}
                    />
                  </Space>
                ),
              },
              {
                label: 'Rated',
                key: 'rated',
                children: (
                  <Space id="rated">
                    <MoviesList movies={movies} error={error} isLoaded={isLoaded} />
                    <Pagination
                      defaultCurrent={1}
                      total={totalRatedPages}
                      showSizeChanger={false}
                      currentPage={currentRatedPage}
                      onChange={this.changeRatedPage}
                      className="rated_pagination"
                    />
                  </Space>
                ),
              },
            ]}
          />
        </GenresContext.Provider>
      </Layout>
    )
  }
}

/*

changeRate = async (movieId, rate) => {
    const { moviesRating, userSessionId, guestSessionId } = this.state
    this.movieService
      .addRate(movieId, rate, userSessionId, guestSessionId)
      .then((data) => {
        if (data.success) {
          let newMoviesRating = moviesRating
          newMoviesRating[movieId] = rate
          this.setState({
            moviesRating: newMoviesRating,
          })
        }
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      })
  }

  sessions = (token) => {
    return this.movieService.session(token)
  }

  requestToken = async () => {
    return await this.movieService.requestToken()
  }

  */
