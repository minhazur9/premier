import React from 'react';
import axios from 'axios';
import MovieCard from '../../components/movies/MovieCard';
import {Link} from 'react-router-dom'


class MovieIndex extends React.Component {

    state = {
        movies: [],
        loading: true,
        page: 1,
        catagory: 'now_playing'
    } 

    handlePrevMoviePage = () => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page - 1;
        const catagory = this.state.catagory;
        this.setState({page:pageNum})
        axios.get(`https://api.themoviedb.org/3/movie/${catagory}?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({movies: response.data.results, loading: false}))
    }

    handleNextMoviePage = () => {
        const key = '47b253083f612b83066bfaf81a01e411'
        const pageNum = this.state.page + 1;
        const catagory = this.state.catagory;
        this.setState({page:pageNum})
                   https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
        axios.get(`https://api.themoviedb.org/3/movie/${catagory}?api_key=${key}&language=en-US&page=${pageNum}`)
            .then((response) => this.setState({movies: response.data.results, loading: false}))
    }

    rerender

    

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
                <MovieCard key={movie.id} id={movie.id} voteAverage={movie.vote_average} title={movie.title} image={`${imagePath}${movie.poster_path}`}/>   
                </>
            )     
        })
    }

    renderPopularCards() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return this.state.movies.map((movie) => {
            return (
                <>
                <MovieCard key={movie.id} id={movie.id} voteAverage={movie.vote_average} title={movie.title} image={`${imagePath}${movie.poster_path}`}/>   
                </>
            )     
        })
    }
     
    componentDidMount() {
        const key = '47b253083f612b83066bfaf81a01e411'
        const catagory = this.state.catagory;
        console.log(catagory)
        axios.get(`https://api.themoviedb.org/3/movie/${catagory}?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({movies: response.data.results, loading: false}))
    }
    

    renderPopular = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'popular', movies: response.data.results}) )
    }

    renderTopRated = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'top_rated', movies: response.data.results}) )
    }

    renderNowPlaying = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'now_playing', movies: response.data.results}) )
    }

    renderUpcoming = (e) => {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`)
            .then((response) => this.setState({catagory:'upcoming', movies: response.data.results}) )
    }
 
    componentWillUnmount() {
        this._isMounted = false;
     }
     
    render() {
        return (
            <>
            <h1>Now Playing</h1>
            <aside className='nav-wrapper #03a9f4 light-blue movie-nav '>
            <ul>
                <li className='catagory-item'><Link to='#' onClick={this.renderNowPlaying} className='catagory-link' >Now Playing</Link></li>
                <li className='catagory-item'><Link to='#' onClick={this.renderPopular} className='catagory-link' >Popular</Link></li>
                <li className='catagory-item'><Link to='#' onClick={this.renderTopRated} className='catagory-link' >Top Rated</Link></li>
                <li className='catagory-item'><Link to='#' onClick={this.renderUpcoming} className='catagory-link' >Upcoming</Link></li>
            </ul>
    </aside>
                <ul className="movie-list">
                {this.state.loading ? this.renderLoadingIcon() : this.renderMovieCards() }
                {this.state.page < 70 &&
                <Link to="#" onClick={this.handleNextMoviePage}><i className="fas fa-arrow-circle-right fa-4x"></i></Link> }
                {this.state.page > 1 &&
                <Link to="#" onClick={this.handlePrevMoviePage}><i className="fas fa-arrow-circle-left fa-4x"></i></Link> }
                </ul>
            </>
        )
    }
}

export default MovieIndex;