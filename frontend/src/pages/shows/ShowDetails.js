import React from 'react';
import axios from 'axios';


class ShowDetails extends React.Component {

    state = {
        show: {},
        averageScore: 'NA'
    }

    
    renderShowDetails() {
        const voteAverage = Number(this.state.show.vote_average).toString();
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return (
            <div className='details-background'>
                <div style={{backgroundImage: `url(${imagePath}${this.state.show.poster_path})`}} className='movie-poster'></div>
                <div className="details-text">
                    <h1 className='title'>{this.state.show.name}</h1>
                    <p className='tagline'>{this.state.show.tagline}</p>
                    <p className="critic-score-header">Average Critic Score</p>
                    <div className='score-container'>
                    
                    {voteAverage.length === 1 ? voteAverage + '.0' : voteAverage}
                    </div>
                    <p className="user-score-header">Average User Score</p>
                    <div className='score-container user-score'>{this.state.averageScore}</div>
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