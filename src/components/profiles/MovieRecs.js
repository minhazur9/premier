import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class MovieRecs extends React.Component {
    state = {
        movies: [],
    }

    handleDelete = (e) => {
        const userId = Number(this.props.profileId)+1
        const movieId = e.currentTarget.parentNode.id

        const config = {
            method: 'get',
            url: `https://premier-min.herokuapp.com/premier/profiles/${userId}/movies/${movieId}/delete`,
            headers: { 
              'Authorization': `JWT ${localStorage.getItem('token')}`,
            },
          };
          axios(config)
          window.location.reload()
    }

    

    componentDidMount() {
        const userId = Number(this.props.profileId)+1
        axios.get(`https://premier-min.herokuapp.com/premier/profiles/${userId}/movies`)
        .then((response) => this.setState({movies:response.data}))
    }

    componentWillUnmount() {
        this._isMounted = false;
     }

    renderMovies() {
        return this.state.movies.map((movie) => {
            return(
                <li id={movie.movie_id} className="recs"><Link key={movie.movie_id} className="rec-link" to={`/movies/${movie.movie_id}`}><p>{movie.title}</p></Link>
                {this.props.userId-1 == this.props.profileId &&
                <a onClick={this.handleDelete} className="delete-from-rec waves-effect waves-light btn">Delete</a>
                }
                </li>
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