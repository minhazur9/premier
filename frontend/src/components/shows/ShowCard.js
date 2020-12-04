import React from 'react'
import { Link } from 'react-router-dom';

function ShowCard(props) {
    // Show title and rating
    const showInfo = (e) => {
        const info = e.currentTarget.childNodes[0].childNodes[0].childNodes[0];
        e.currentTarget.childNodes[0].childNodes[0].style.animationName = "fadeToBlack"
        e.currentTarget.style.animationName = 'select';
        info.style.animationName = 'slideUp';         
    }

    // Hide title and rating
   const hideInfo = (e) => {
        const info = e.currentTarget.childNodes[0].childNodes[0].childNodes[0];
        e.currentTarget.childNodes[0].childNodes[0].style.animationName = "fadeFromBlack"
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
        <Link className="movie-link"  to={`/shows/${props.id}`}>
        <div onMouseEnter={showInfo} onMouseLeave={hideInfo} className='movie-card'>
            <div style={{backgroundImage: `url(${props.image})`}} className='card-poster'> 
            <div className="card-overlay">
            <div className="movie-card-info">
                <p className='card-title'>{props.title}</p>
                {colorCodeScore()}
            </div>
            </div>
            </div>
            
        </div>
        </Link>
    )
}

export default ShowCard;