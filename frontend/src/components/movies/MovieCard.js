import React from 'react'
import { Link } from 'react-router-dom';

function MovieCard(props) {
    const showInfo = (e) => {
          const info = e.currentTarget.childNodes[0].childNodes[0];
          e.currentTarget.style.animationName = 'select';
          info.style.animationName = 'slideUp';       
    }

    const hideInfo = (e) => {
        const info = e.currentTarget.childNodes[0].childNodes[0];
          e.currentTarget.style.animationName = 'deselect';
          info.style.animationName = 'slideDown';
    }
    
    const colorCodeScore = () => {
        if(props.voteAverage >= 8) {
            return <p className='card-critic-average good-card-score'>{props.voteAverage}</p>
        }
        else if(props.voteAverage >= 5) {
            return <p className='card-critic-average meh-card-score'>{props.voteAverage}</p>
        }
        else {
            return <p className='card-critic-average bad-card-score'>{props.voteAverage}</p> 
        }
    }

        return (
            <Link className="movie-link"  to={`/movies/${props.id}`}>
            <div onMouseEnter={showInfo} onMouseLeave={hideInfo} className='movie-card'>
                <div style={{backgroundImage: `url(${props.image})`}} className='card-poster'> 
                <div className="movie-card-info">
                    <p className='card-title'>{props.title}</p>
                    {colorCodeScore()}
                </div>
                </div>
            </div>
            </Link>
        )
}

export default MovieCard;