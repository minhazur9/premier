import React from 'react'

class MovieCard extends React.Component {
    showInfo = (e) => {
          const info = e.target.childNodes[0]
          if (info && info.className === 'movie-card-info') info.style.animationName = 'slideUp'
           
    }

    hideInfo = (e) => {
        const info = e.target.childNodes[0]
        if (info && info.className === 'movie-card-info') info.style.animationName = 'slideDown'
    }
    


    render() {
        return (
            <div onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo} className='movie-card'>
                <div style={{backgroundImage: `url(${this.props.image})`}} className='card-poster'> 
                <div className="movie-card-info"></div>
                </div>
                
            </div>
        )
    }
}

export default MovieCard;