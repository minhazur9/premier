import React from 'react';
import axios from 'axios';


class MovieDetails extends React.Component {

    state = {
        movie: {},
        userAverage: '---',
        companyList: [],
        loading: true,
        clicked: false,
        genreList: [],
        trailerLink: ''
    }

    // Render Loading Icon
    renderLoadingIcon() {
        return (
            <div className="lds-facebook details-loading-container">
            <div className='details-loading'>   
            </div><div className='details-loading'>
            </div><div className='details-loading'></div>
            </div>
        )
    }

    // Render all the production comapnies of the movie
    renderProductionCompanies() {
        return this.state.companyList.slice(0,3).map((company) => (
            <li className="company-name">{company.name}</li>
        ))
    }

    renderCriticRating(criticAverage) {
        let colorClass = ""
        if (!Number(criticAverage)) colorClass = ""
        else if (Number(criticAverage) >= 8) colorClass = "good"
        else if (Number(criticAverage) >= 5) colorClass = "meh"
        else colorClass = "bad"
        return (
            <div className={`score-container ${colorClass}`}>
            {Number(criticAverage) >= 8 && console.log(this.className)}
            {criticAverage.length === 1 ? criticAverage + '.0' : criticAverage}
        </div>
        )
    }

    renderUserRating(userAverage) {
        let colorClass = ""
        if (!Number(userAverage)) colorClass = ""
        else if (Number(userAverage) >= 8) colorClass = "good"
        else if (Number(userAverage) >= 5) colorClass = "meh"
        else colorClass = "bad"
        return (
            <div className={`score-container user-score ${colorClass}`}>
            {Number(userAverage) >= 8 && console.log(this.className)}
            {userAverage.length === 1 ? userAverage + '.0' : userAverage}
        </div>
        )
    }

    renderDate() {
        const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
        const releaseDate = new Date(this.state.movie.release_date)
        return (
            <p className="movie-release">Release: {`${months[releaseDate.getMonth()]} ${releaseDate.getDate()} ${releaseDate.getFullYear()}`}</p>
        )
    }

    renderGenres() {
        return this.state.genreList.slice(0,3).map((genre) => (
            <li className="genre-name">{genre.name}</li>
        ))
    }

    renderTrailer() {
        const movieId = this.props.movieId
        const videoPath = 'https://www.youtube.com/watch?v='
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`)
        .then((response) => {
            const videoKey = response.data.results[0].key
            this.setState({trailerLink:videoPath+videoKey})
        })
    }

    // Render all the info about the movie
    renderMovieDetails() {
        const criticAverage = Number(this.state.movie.vote_average).toString();
        const imagePath = 'https://image.tmdb.org/t/p/original'
        console.log(`${imagePath}${this.state.image}`)
        return (
            <>
                <div style={{backgroundImage: `url(${imagePath}${this.state.movie.poster_path})`}} className='movie-poster'></div>
                <div className="details-text">
                {this.props.loggedIn && !this.state.clicked &&
                <a onClick={this.handleAddToList} className="add-to-rec waves-effect waves-light btn">Add to List</a> ||
                this.props.loggedIn && this.state.clicked  &&
                <a onClick={(e) => e.preventDefault()} className="add-to-rec waves-effect waves-light btn added">Added</a>
                }
                    <h1 className="title">{this.state.movie.title}</h1>
                    <p className='tagline'>{this.state.movie.tagline}</p>
                    <p className="critic-score-header">Average Critic Score</p>
                    {this.renderCriticRating(criticAverage)}
                    <p className="user-score-header">Average User Score</p>
                    {this.renderUserRating(this.state.userAverage)}
                    <p className="run-time">Runtime: {this.state.movie.runtime} Minutes</p>
                    <ul className="production">{this.renderProductionCompanies()}</ul>
                    {this.renderDate()}
                    <ul className="genres">{this.renderGenres()}</ul>
                    <p className="overview-header">Overview</p>
                    <p className="overview">{this.state.movie.overview}</p>
                    {this.renderVideoModal()}
                </div>
            </>
        )
    }

    renderVideoModal() {
        return (
            <>
    
  <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  </>
        )
    }

    handleAddToList = (e) => {
        e.currentTarget.classList.toggle("added");
        e.preventDefault();
        const config = {
          method: 'post',
          url: 'http://localhost:8000/premier/movies/add',
          headers: { 
            'Authorization': `JWT ${localStorage.getItem('token')}`,
          },
          data : {
              'movie_id': this.state.movie.id, 
              'title':this.state.movie.title,
              'user': this.props.user.id
          }
        };
        axios(config)
        this.setState({clicked:true})
        
  }

    componentDidMount() {
        const movieId = this.props.movieId
        const key = '47b253083f612b83066bfaf81a01e411'
        console.log(movieId)
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({movie:response.data, 
                          companyList:response.data.production_companies, 
                          genreList:response.data.genres, 
                          loading:false})
        })
        this.renderTrailer()
        for(let i = 0; i < this.props.movies.length; i++) {
            if(this.props.movies[i].movie_id == this.props.movieId) {
                this.setState({clicked:true})
                return;
            }
        }
    }
    
    render() {
        return(
            <>
                <div className='details-background'>
                {this.state.loading ? this.renderLoadingIcon() : this.renderMovieDetails() }
                </div>
            </>
        )
    }
}

export default MovieDetails;