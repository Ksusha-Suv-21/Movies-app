import { Component } from 'react'

import { Layout, Space } from "antd"

import MoviesList from '../Movies_list/Movies_list'

import './App.css'
import 'antd/dist/reset.css'

export default class App extends Component {

  state = {
    error: null,
    isLoaded: false,
    movies: []
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&s=return")
    .then(res => res.json())
    .then(
      (data) => {
        this.setState({ 
        movies: data.results,
        isLoaded: true
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
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
              <MoviesList movies={movies} error={error} isLoaded={isLoaded} />
            </Space>
        </Layout>
      </>
    )
  }
}
