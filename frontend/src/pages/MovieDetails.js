import React from 'react';
import axios from 'axios';


class MovieDetails extends React.Component {

    state = {
        title: '',
        image: '',
    }

    renderMovieDetails() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        console.log(`${imagePath}${this.state.image}`)
        return (
            <>
            <h1>{this.state.title}</h1>
            <div style={{backgroundImage: `url(${imagePath}${this.state.image})`}} className='movie-poster'></div>
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
            this.setState({title:response.data.title, image:response.data.poster_path})
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