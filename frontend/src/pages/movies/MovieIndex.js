import React from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import MovieNav from '../../components/movies/MovieNav'
import {Link} from 'react-router-dom'


class MovieIndex extends React.Component {

    state = {
        movies: [],
        loading: true,
        page: 1
    } 

    handlePrevPage = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page - 1;
        this.setState({page:pageNum})
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({movies: response.data.results, loading: false}))
    }

    handleNextPage = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page + 1;
        this.setState({page:pageNum})
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({movies: response.data.results, loading: false}))
    }

    

    // Render Loading Icon
    renderLoadingIcon() {
        return (
            <div className="lds-facebook"><div></div><div></div><div></div></div>
        )
    }

    // Render Movie Cards
    renderMovieCards() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return this.state.movies.map((movie) => {
            return (
                <>
                <MovieCard key={movie.id} id={movie.id} title={movie.title} image={`${imagePath}${movie.poster_path}`}/>   
                </>
            )     
        })
    }
     
    componentDidMount() {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({movies: response.data.results, loading: false}))
    }

    componentWillUnmount() {
        this._isMounted = false;
     }
     
    render() {
        return (
            <>
            <h1>All Movies</h1>
            <MovieNav/>
                <ul className="movie-list">
                {this.state.loading ? this.renderLoadingIcon() : this.renderMovieCards() }
                {this.state.page < 70 &&
                <Link to="/movies" onClick={this.handleNextPage}><i class="fas fa-arrow-circle-right fa-4x"></i></Link> }
                {this.state.page > 1 &&
                <Link to="/movies" onClick={this.handlePrevPage}><i class="fas fa-arrow-circle-left fa-4x"></i></Link> }
                </ul>
            </>
        )
    }
}

export default MovieIndex;