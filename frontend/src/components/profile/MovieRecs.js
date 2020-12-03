import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class MovieRecs extends React.Component {
    state = {
        movies: []
    }

    componentDidMount() {
        const userId = Number(this.props.profileId)+1
        axios.get(`http://localhost:8000/premier/profiles/${userId}/movies`)
        .then((response) => this.setState({movies:response.data}))
    }

    renderMovies() {
        return this.state.movies.map((movie) => {
            return(
                <li className="recs"><Link className="rec-link" to={`/movies/${movie.fields.movie_id}`}><p>{movie.fields.title}</p></Link></li>
            )
            
        })
    }

    render() {
        return (
            <>
            <div className="movie-recs">
            <ul>
            {this.renderMovies()}
            </ul>
            </div>
            </>
        )
    }

}

export default MovieRecs;