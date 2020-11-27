import React from 'react'

class MovieCard extends React.Component {
    render() {
        return (
            <div className='movie-card'>
                <div style={{backgroundImage: `url(${this.props.image})`}} className='card-poster'>  </div>
            </div>
        )
    }
}

export default MovieCard;