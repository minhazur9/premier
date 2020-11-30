import React from 'react';
import axios from 'axios';


class ShowDetails extends React.Component {

    state = {
        show: {},
        userAverage: 'NA'
    }

    
    renderShowDetails() {
        const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
        const releaseDate = new Date(this.state.show.first_air_date)
        const lastDate = new Date(this.state.show.last_air_date)
        console.log(releaseDate);
        const criticAverage = Number(this.state.show.vote_average).toString();
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return (
            <div className='details-background'>
                <div style={{backgroundImage: `url(${imagePath}${this.state.show.poster_path})`}} className='movie-poster'></div>
                <div className="details-text">
                    <h1 className='title'>{this.state.show.name}</h1>
                    <p className='tagline'>{this.state.show.tagline}</p>
                    <p className="critic-score-header">Average Critic Score</p>
                    <div className='score-container'>
                        {criticAverage.length === 1 ? criticAverage + '.0' : criticAverage}
                    </div>
                    <p className="user-score-header">Average User Score</p>
                    <div className='score-container user-score'>{this.state.userAverage}</div>
                    <p className="episode-count">{this.state.show.number_of_episodes} Episodes</p>
                    <p className="season-count">{this.state.show.number_of_seasons} Seasons</p>
                    <p className="dates">{`${months[releaseDate.getMonth()]} ${releaseDate.getDate()} ${releaseDate.getFullYear()} -
                                         ${months[lastDate.getMonth()]} ${lastDate.getDate()} ${lastDate.getFullYear()}`}
                    </p>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const showId = this.props.match.params.showId
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({show:response.data})
        })
    }
    
    render() {
        return(
            <>
                {this.renderShowDetails()}
            </>
        )
    }
}

export default ShowDetails;