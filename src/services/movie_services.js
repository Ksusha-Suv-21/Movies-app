
export default class MovieService {

  getMovies = async function(url) {
    
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`)
    }
    return await res.json()
  }

  apiCallGet = async function (url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OThjZjVlYzc3YmNjNjNkMTRlOTY0NTViYzE2NjgwMiIsIm5iZiI6MTczMjYyMzk2OS4wNSwic3ViIjoiNjc0NWJlNjE2ZWVmNWI0M2E1ZmNhMDZkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cz91Jdtoi6_0TUvi_4Kr7S1Bs_gbFlftZWX1YoGnVsY'
      }
    }
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`)
    }
    return await res.json()
  }

  addRate = async function ( movieId, rate) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OThjZjVlYzc3YmNjNjNkMTRlOTY0NTViYzE2NjgwMiIsIm5iZiI6MTczMjYyMzk2OS4wNSwic3ViIjoiNjc0NWJlNjE2ZWVmNWI0M2E1ZmNhMDZkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cz91Jdtoi6_0TUvi_4Kr7S1Bs_gbFlftZWX1YoGnVsY'
      }, 
      body: JSON.stringify({
        'value': rate
      })

      
    }
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`)
    }
    return await res.json()
  }


  searchMovies = async (pageNumber = 1, searchQuery = '') => {
    let res
    if(searchQuery) {
      res = await this.getMovies(
        `https://api.themoviedb.org/3/search/movie?api_key=998cf5ec77bcc63d14e96455bc166802&query=${searchQuery}&page=${pageNumber}`
      )
    } else {
      res = await this.getMovies(
        `https://api.themoviedb.org/3/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&page=${pageNumber}`
      )
    }
    
    return res
  }

  ratedMovies = async (pageNumber = 1, sessionId = null) => { 
    return sessionId ? await this.apiCallGet(`https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${pageNumber}&sort_by=created_at.asc`) : null
  }

  guestSession = async () => {
    const res = await this.apiCallGet('https://api.themoviedb.org/3/authentication/guest_session/new')
    return res
  }

  getGenres = async () => {
    const res = await this.apiCallGet('https://api.themoviedb.org/3/genre/movie/list?language=en')
    return res
  }
  
}


