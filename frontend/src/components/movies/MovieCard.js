import React from 'react'

class MovieCard extends React.Component {
    showInfo = (e) => {
          const info = e.currentTarget.childNodes[0].childNodes[0];
          e.currentTarget.style.animationName = 'select';
          info.style.animationName = 'slideUp';       
    }

    hideInfo = (e) => {
        const info = e.currentTarget.childNodes[0].childNodes[0];
          e.currentTarget.style.animationName = 'deselect';
          info.style.animationName = 'slideDown';
    }
    


    render() {
        return (
            <div onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo} className='movie-card'>
                <div style={{backgroundImage: `url(${this.props.image})`}} className='card-poster'> 
                <div className="movie-card-info">
                    <p className='card-title'>{this.props.title}</p>
                </div>
                </div>
                
            </div>
        )
    }
}

export default MovieCard;