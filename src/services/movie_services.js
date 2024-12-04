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


-----------------------------------

export default class MoviesList extends Component {
    constructor(props) {
      super(props)
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      }
    }
  
----------------------------------------

const getMovies = async(url) => {
    const res = await fetch(url)

    if(!res.ok) {
        throw new Error(Could not fetch ${url} + , received ${res.status})
    }

    const body = await res.json()
    return body
}

getMovies("https://api.themoviedb.org/3/discover/movie?api_key=998cf5ec77bcc63d14e96455bc166802&s=return")
    .then((body) => {
        console.log(body.results)
    })
    .catch((err) => {
        console.log("Could not fetch", err)
    })







    

0: 
adult: false
backdrop_path: "/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg"
genre_ids: (3) [878, 28, 12]
id: 912649
original_language: "en"
original_title: "Venom: The Last Dance"
overview: "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance."
popularity: 3073.235
poster_path: "/aosm8NMQ3UyoBVpSxyimorCQykC.jpg"
release_date: "2024-10-22"
title: "Venom: The Last Dance"
video: false
vote_average: 6.5


*/