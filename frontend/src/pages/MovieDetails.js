import React from 'react';
import axios from 'axios';


class MovieDetails extends React.Component {

    state = {
        title: ''
    }

    renderMovieDetails() {
        return (
            <h1>{this.state.title}</h1>
        )
    }

    componentDidMount() {
        const movieId = this.props.match.params.movieId
        const key = '47b253083f612b83066bfaf81a01e411'
        console.log(movieId)
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({title:response.data.title})
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