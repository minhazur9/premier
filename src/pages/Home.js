import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Slider from '../components/Slider'

class Home extends React.Component {

    state = {
        popularMovies: []
    }

    

    componentDidMount() {
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`)
        .then((response) => {
            this.setState({popularMovies:response.data.results})
        })

    }

    renderPopularMovies = () => {
        return this.state.popularMovies.map((movie) => {
            return (
                <Link to={`/movies/${movie.id}`} className="popular-link"><li className="popular-item">{movie.title}</li></Link>
            )
            
        })
    } 

    render() {
        return (
            <div className='home-page'> 
            <div className="featured">
                <Slider/>
            </div>
            <h3 className="popular-movies-header">Popular Movies</h3>
            <div className="popular-movies">
            <ul>
                {this.renderPopularMovies()}
            </ul>
            </div>
            </div>
        )
    }
}

export default Home;