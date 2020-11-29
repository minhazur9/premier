import React from 'react';
import axios from 'axios';
import MovieCard from '../components/movies/MovieCard';
import MovieNav from '../components/movies/MovieNav'


class MovieIndex extends React.Component {

    state = {
        movies: [],
    } 

    

    renderMovieCards() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return this.state.movies.map((movie) => {
            return (
                <MovieCard key={movie.id} id={movie.id} title={movie.title} image={`${imagePath}${movie.poster_path}`}/>   
            )     
        })
    }
     
    componentDidMount() {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({movies: response.data.results}))
    }
    render() {
        return (
            <>
            <h1>All Movies</h1>
            <MovieNav/>
                <ul className="movie-list">
                {this.renderMovieCards()}
                </ul>
                
            
            </>
        )
    }
}

export default MovieIndex;