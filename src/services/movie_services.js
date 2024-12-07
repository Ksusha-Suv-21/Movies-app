
export default class MovieService {

  async getMovies (url) {
    
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`)
    }
    return await res.json()
  }
    
  async searchMovies () {
    const res = await this.getMovies(
      'https://api.themoviedb.org/3/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&s=return'
    )
    return res
  }
}
    
  
  
  
  
  
  
/*
  
  export default class  MovieService {
  
    url = "https://api.themoviedb.org/3/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&s=return"
  
    async getMovies(url) {
        const res = await fetch(${this.url})
  
        if(!res.ok) {
            throw new Error(Could not fetch ${url} + , received ${res.status})
        }
        return await res.json()
    }
  
    async searchMovies () {
        const res = await this.getMovies()
        return res.results
    }
  }
  
  const movDB = new MovieService()
  
  movDB.searchMovies().then((body) => {
    console.log(body)
  })
  
  

  ----------------------------------------
  

  
  getMovies("https://api.themoviedb.org/3/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&s=return")
      .then((body) => {
          console.log(body.results)
      })
      .catch((err) => {
          console.log("Could not fetch", err)
      })
  

  
  */