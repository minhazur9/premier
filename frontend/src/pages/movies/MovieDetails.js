import React from 'react';
import axios from 'axios';


class MovieDetails extends React.Component {

    state = {
        movie: {},
        userAverage: '---',
        companyList: [],
        loading: true
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

    // Render all the info about the movie
    renderMovieDetails() {
        const criticAverage = Number(this.state.movie.vote_average).toString();
        const imagePath = 'https://image.tmdb.org/t/p/original'
        console.log(`${imagePath}${this.state.image}`)
        return (
            <>
                <div style={{backgroundImage: `url(${imagePath}${this.state.movie.poster_path})`}} className='movie-poster'></div>
                <div className="details-text">
                    <h1 className="title">{this.state.movie.title}</h1>
                    <p className='tagline'>{this.state.movie.tagline}</p>
                    <p className="critic-score-header">Average Critic Score</p>
                    {this.renderCriticRating(criticAverage)}
                    <p className="user-score-header">Average User Score</p>
                    {this.renderUserRating(this.state.userAverage)}
                    <p className="run-time">Runtime: {this.state.movie.runtime} Minutes</p>
                    <ul className="production">{this.renderProductionCompanies()}</ul>
                </div>
            </>
        )
    }

    componentDidMount() {
        const movieId = this.props.match.params.movieId
        const key = '47b253083f612b83066bfaf81a01e411'
        console.log(movieId)
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({movie:response.data, companyList:response.data.production_companies, loading:false})
        })
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