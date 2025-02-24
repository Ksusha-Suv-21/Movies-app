
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


  session = async (token) => {
    let res
    if (token) {
      res = await this.apiCall(`${this.apiBaseUrl}/authentication/session/new`, 'POST', JSON.stringify({request_token: token}))
    }
    return res
  }

  getGenres = async () => {
    const res = await this.apiCall(`${this.apiBaseUrl}/genre/movie/list?language=en`)
    return res
  }

  requestToken = async () => {
    const res = await this.apiCall(`${this.apiBaseUrl}/authentication/token/new`)
    return res
  }  
  
}




/*

results
: 
Array(20)
0
: 
{adult: false, backdrop_path: '/cVh8Af7a9JMOJl75ML3Dg2QVEuq.jpg', genre_ids: Array(3), id: 762509, original_language: 'en', …}
1
: 
{adult: false, backdrop_path: '/zo8CIjJ2nfNOevqNajwMRO6Hwka.jpg', genre_ids: Array(4), id: 1241982, original_language: 'en', …}
2
: 
{adult: false, backdrop_path: '/zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg', genre_ids: Array(4), id: 939243, original_language: 'en', …}
3
: 
{adult: false, backdrop_path: '/7cNE2qydew1c8fqnlhWjkE3DHc2.jpg', genre_ids: Array(4), id: 927342, original_language: 'ta', …}
4
: 
{adult: false, backdrop_path: '/qfAfE5auxsuxhxPpnETRAyTP5ff.jpg', genre_ids: Array(3), id: 822119, original_language: 'en', …}
5
: 
{adult: false, backdrop_path: '/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg', genre_ids: Array(3), id: 950396, original_language: 'en', …}
6
: 
{adult: false, backdrop_path: '/u7AZ5CdT2af8buRjmYCPXNyJssd.jpg', genre_ids: Array(2), id: 1160956, original_language: 'zh', …}
7
: 
{adult: false, backdrop_path: '/rOMLLMGgDgGG6XeT3P8sUdUb8nl.jpg', genre_ids: Array(3), id: 1126166, original_language: 'en', …}
8
: 
{adult: false, backdrop_path: '/uJK0jjJ8QDOQw5lcNBwu059ht4D.jpg', genre_ids: Array(2), id: 1294203, original_language: 'en', …}
9
: 
{adult: false, backdrop_path: '/v9Du2HC3hlknAvGlWhquRbeifwW.jpg', genre_ids: Array(3), id: 539972, original_language: 'en', …}
10
: 
{adult: false, backdrop_path: '/hfTyu2VPBqLRPo2DauW8q7bh9bm.jpg', genre_ids: Array(3), id: 516729, original_language: 'en', …}
11
: 
{adult: false, backdrop_path: '/vfkzNcVzTRCq3C2jYIZtIjSdwf7.jpg', genre_ids: Array(3), id: 1247019, original_language: 'th', …}
12
: 
{adult: false, backdrop_path: '/rp49ILheIhBwHWiQUvDfVH1fPfI.jpg', genre_ids: Array(3), id: 1138749, original_language: 'en', …}
13
: 
{adult: false, backdrop_path: '/cdN7uvygA0AjzZPcsOspHKULLM3.jpg', genre_ids: Array(1), id: 549509, original_language: 'en', …}
14
: 
{adult: false, backdrop_path: '/qSOMdbZ6AOdHR999HWwVAh6ALFI.jpg', genre_ids: Array(3), id: 1249289, original_language: 'en', …}
15
: 
{adult: false, backdrop_path: '/vZG7PrX9HmdgL5qfZRjhJsFYEIA.jpg', genre_ids: Array(3), id: 912649, original_language: 'en', …}
16
: 
{adult: false, backdrop_path: '/xZm5YUNY3PlYD1Q4k7X8zd2V4AK.jpg', genre_ids: Array(2), id: 993710, original_language: 'en', …}
17
: 
{adult: false, backdrop_path: '/ybSA7fUbYHw8VeRiSJ7tgKJnYWZ.jpg', genre_ids: Array(2), id: 1410082, original_language: 'en', …}
18
: 
{adult: false, backdrop_path: '/bHeUgZKqduubnNl8GshjrpHS9lF.jpg', genre_ids: Array(3), id: 558449, original_language: 'en', …}
19
: 
{adult: false, backdrop_path: '/eHu1ZxFPmqyhnait9VdsOQBEFOk.jpg', genre_ids: Array(2), id: 710295, original_language: 'en', …}
length
: 
20
[[Prototype]]
: 
Array(0)
total_pages
: 
48797
total_results
: 
975940
[[Prototype]]
: 
Object
*/