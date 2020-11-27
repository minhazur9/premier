import React from 'react';
import axios from 'axios';
import MovieCard from '../components/movies/MovieCard';
import MovieNav from '../components/movies/MovieNav'


class MovieIndex extends React.Component {

     key = '47b253083f612b83066bfaf81a01e411'
    // componentDidMount() {
    //     axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=en-US&page=1`)
    //         .then((response) => console.log(response.data))
    // }
    render() {
        return (
            <>
            <h1>All Movies</h1>
            <MovieNav/>
                <ul className="movie-list">
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>

                </ul>
            
            </>
        )
    }
}

export default MovieIndex;