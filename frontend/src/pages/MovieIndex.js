import React from 'react';
import axios from 'axios';

class MovieIndex extends React.Component {

    componentDidMount() {
        axios.get('http://localhost:8000/premier/profile')
            .then((response) => console.log(response.data))
    }
    render() {
        return (
            <h1>All Movies</h1>
        )
    }
}

export default MovieIndex;