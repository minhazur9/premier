import React from 'react';
import axios from 'axios';


class MovieDetails extends React.Component {

    state = {
        movie: {},
        userAverage: 'NA',
    }

    renderMovieDetails() {
        const criticAverage = Number(this.state.movie.vote_average).toString();
        const imagePath = 'https://image.tmdb.org/t/p/original'
        console.log(`${imagePath}${this.state.image}`)
        return (
            <div className="details-background">
                <div style={{backgroundImage: `url(${imagePath}${this.state.movie.poster_path})`}} className='movie-poster'></div>
                <div className="details-text">
                <h1 className="title">{this.state.movie.title}</h1>
                <p className='tagline'>{this.state.movie.tagline}</p>
                <p className="critic-score-header">Average Critic Score</p>
                    <div className='score-container'>
                        {criticAverage.length === 1 ? criticAverage + '.0' : criticAverage}
                    </div>
                <p className="user-score-header">Average User Score</p>
                <div className='score-container user-score'>{this.state.userAverage}</div>
            </div>
            
            
            </div>
        )
    }

    componentDidMount() {
        const movieId = this.props.match.params.movieId
        const key = '47b253083f612b83066bfaf81a01e411'
        console.log(movieId)
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`)
        .then((response) => {
            this.setState({movie:response.data})
        })
    }
    
    render() {
        return(
            <>
                {this.renderMovieDetails()}
            </>
        )
    }
}

export default MovieDetails;