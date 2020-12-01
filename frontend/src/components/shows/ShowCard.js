import React from 'react'
import { Link } from 'react-router-dom';

class ShowCard extends React.Component {
    // Show title and rating
    showInfo = (e) => {
          const info = e.currentTarget.childNodes[0].childNodes[0];
          e.currentTarget.style.animationName = 'select';
          info.style.animationName = 'slideUp';       
    }

    // Hide title and rating
    hideInfo = (e) => {
        const info = e.currentTarget.childNodes[0].childNodes[0];
          e.currentTarget.style.animationName = 'deselect';
          info.style.animationName = 'slideDown';
    }
    


    render() {
        return (
            <Link className="movie-link"  to={`/shows/${this.props.id}`}>
            <div onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo} className='movie-card'>
                <div style={{backgroundImage: `url(${this.props.image})`}} className='card-poster'> 
                <div className="movie-card-info">
                    <p className='card-title'>{this.props.title}</p>
                </div>
                </div>
                
            </div>
            </Link>
        )
    }
}

export default ShowCard;