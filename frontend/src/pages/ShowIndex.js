import React from 'react'
import axios from 'axios'
import MovieNav from '../components/movies/MovieNav'
import MovieCard from '../components/movies/MovieCard'

class ShowIndex extends React.Component {
    state = {
        shows: []
    }

    renderMovieCards() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return this.state.movies.map((movie) => {
            return (
                <MovieCard key={movie.id} id={movie.id} title={movie.original_title} image={`${imagePath}${movie.poster_path}`}/>   
            )     
        })
    }

    componentDidMount() {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`)
            .then((response) => console.log(response.data))
    }

    render() {
        return(
        <>
        <h1>All Shows</h1>
        <MovieNav/>
        <ul className="show-lis">

        </ul>
        </>
        )
    }
}

export default ShowIndex;