import React from 'react';
import axios from 'axios';


class MovieDetails extends React.Component {

    state = {
        movie: {}
    }

    renderMovieDetails() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        console.log(`${imagePath}${this.state.image}`)
        return (
            <div className="details-background">
            <div style={{backgroundImage: `url(${imagePath}${this.state.movie.poster_path})`}} className='movie-poster'></div>
            <div className="details-text">
            <h1 className="title">{this.state.movie.title}</h1>
            <p className='tagline'>{this.state.movie.tagline}</p>

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