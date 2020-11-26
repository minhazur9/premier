import React from 'react';
import axios from 'axios';


class MovieIndex extends React.Component {

     key = '47b253083f612b83066bfaf81a01e411'
    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${this.key}`)
            .then((response) => console.log(response.data))
    }
    render() {
        return (
            <h1>All Movies</h1>
        )
    }
}

export default MovieIndex;