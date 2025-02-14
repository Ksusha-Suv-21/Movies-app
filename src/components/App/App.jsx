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
    genres: [],
    activeTab: 'search',
    moviesRating: {},
  }

  componentDidMount() {
    const { searchValue, activeTab } = this.state

    this.guestSessions()
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

  changeRate = (movieId, rate) => {
    const { moviesRating } = this.state
    this.movieService
      .addRate(movieId, rate)
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

  getRatedMovies = () => {
    const { currentRatedPage, userSessionId } = this.state

    this.movieService
      .ratedMovies(currentRatedPage, userSessionId)
      .then((data) => {
        this.setState({
          movies: data.results,
          isLoaded: false,
          currentRatedPage,
          totalRatedPages: data.total_pages,
        })
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error,
        })
      })
  }

  getMoviesRating = (pageNumber = 1) => {
    const { userSessionId } = this.state
    this.movieService
      .ratedMovies(pageNumber, userSessionId)
      .then((data) => {
        let moviesRating
        if (data?.results?.length) {
          moviesRating = data.results.map((movie) => {
            let result = {}
            result[movie.id] = movie.rating
            return result
          })
          moviesRating = Object.assign({}, ...moviesRating)
          this.setState({
            moviesRating,
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
            userSessionId: data.guest_session_id,
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

  gotMovies = () => {
    const { currentPage } = this.state

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
    this.setState(
      {
        currentRatedPage: page,
      },
      () => {
        this.getRatedMovies()
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
    const { searchValue } = this.state
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
      this.getRatedMovies()
    }
  }

  render() {
    const { error, isLoaded, movies, totalPages, currentPage, searchValue, currentRatedPage, totalRatedPages } =
      this.state

    return (
      <>
        <Layout>
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
                    <GenresContext.Provider
                      value={{ genres: this.state.genres, moviesRating: this.state.moviesRating }}
                    >
                      <MoviesList
                        onChangeRate={this.changeRate}
                        movies={movies}
                        error={error}
                        isLoaded={isLoaded}
                        searchValue={searchValue}
                      />
                    </GenresContext.Provider>
                    <Pagination
                      defaultCurrent={1}
                      total={totalPages}
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
                    <GenresContext.Provider value={{ genres: this.state.genres }}>
                      <MoviesList movies={movies} error={error} isLoaded={isLoaded} />
                    </GenresContext.Provider>
                    <Pagination
                      defaultCurrent={1}
                      total={totalRatedPages}
                      showSizeChanger={false}
                      currentPage={currentRatedPage}
                      onChange={this.changeRatedPage}
                    />
                  </Space>
                ),
              },
            ]}
          />
        </Layout>
      </>
    )
  }
}
