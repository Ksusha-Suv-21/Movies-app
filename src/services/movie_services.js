
export default class MovieService {

  apiBaseUrl = 'https://api.themoviedb.org/3'
  getMovies = async function(url) {

    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`)
    }
    return await res.json()
  }

  apiCall = async function (url, method = 'GET', body) {
    const options = {
      method,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OThjZjVlYzc3YmNjNjNkMTRlOTY0NTViYzE2NjgwMiIsIm5iZiI6MTczMjYyMzk2OS4wNSwic3ViIjoiNjc0NWJlNjE2ZWVmNWI0M2E1ZmNhMDZkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Cz91Jdtoi6_0TUvi_4Kr7S1Bs_gbFlftZWX1YoGnVsY'
      }
    }
    if (body) {
      options.body = body
    }
    
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`)
    }
    return await res.json()
  }

//?guest_session_id=4ddb6596eb6a6f612626c539c3e36f40&session_id=762509
  addRate = async function ( movieId, rate, session_id, guest_session_id) {
    let url
    if(session_id) {
       url = `${this.apiBaseUrl}/movie/${movieId}/rating?session_id=${session_id}`
    } 
    if(guest_session_id) {
       url = `${this.apiBaseUrl}/movie/${movieId}/rating?guest_session_id=${guest_session_id}`
    }
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
        `${this.apiBaseUrl}/search/movie?api_key=998cf5ec77bcc63d14e96455bc166802&query=${searchQuery}&page=${pageNumber}`
      )
    } else {
      res = await this.getMovies(
        `${this.apiBaseUrl}/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&page=${pageNumber}`
      )
    }
    
    return res
  }

  ratedMoviesGuest = async (pageNumber = 1, sessionId = null) => { 
    return sessionId ? await this.apiCall(`${this.apiBaseUrl}/guest_session/${sessionId}/rated/movies?language=en-US&page=${pageNumber}&sort_by=created_at.asc`) : null
  }

  ratedMovies = async (pageNumber = 1, accountId = null) => { 
    return accountId ? await this.apiCall(`${this.apiBaseUrl}/account/${accountId}/rated/movies?language=en-US&page=${pageNumber}&sort_by=created_at.asc`) : null
  }

  guestSession = async () => {
    const res = await this.apiCall(`${this.apiBaseUrl}/authentication/guest_session/new`)
    return res
  }

  getGenres = async () => {
    const res = await this.apiCall(`${this.apiBaseUrl}/genre/movie/list?language=en`)
    return res
  }

}




/*
 session = async (token) => {
    let res
    if (token) {
      res = await this.apiCall(`${this.apiBaseUrl}/authentication/session/new`, 'POST', JSON.stringify({request_token: token}))
    }
    return res
  }

  requestToken = async () => {
    const res = await this.apiCall(`${this.apiBaseUrl}/authentication/token/new`)
    return res
  }  
*/