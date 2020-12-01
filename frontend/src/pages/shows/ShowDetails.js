import React from 'react';
import axios from 'axios';


class ShowDetails extends React.Component {

    state = {
        show: {},
        userAverage: '---',
        loading: true
    }

    // Render Loading Icon
    renderLoadingIcon() {
        return (
            <div className="lds-facebook details-loading-container">
            <div className='details-loading'>   
            </div><div className='details-loading'>
            </div><div className='details-loading'></div>
            </div>
        )
    }

    renderCriticRating(criticAverage) {
        let colorClass = ""
        if (!Number(criticAverage)) colorClass = ""
        else if (Number(criticAverage) >= 8) colorClass = "good"
        else if (Number(criticAverage) >= 5) colorClass = "meh"
        else colorClass = "bad"
        return (
            <div className={`score-container ${colorClass}`}>
            {Number(criticAverage) >= 8 && console.log(this.className)}
            {criticAverage.length === 1 ? criticAverage + '.0' : criticAverage}
        </div>
        )
    }

    renderUserRating(userAverage) {
        let colorClass = ""
        if (!Number(userAverage)) colorClass = ""
        else if (Number(userAverage) >= 8) colorClass = "good"
        else if (Number(userAverage) >= 5) colorClass = "meh"
        else colorClass = "bad"
        return (
            <div className={`score-container user-score ${colorClass}`}>
            {Number(userAverage) >= 8 && console.log(this.className)}
            {userAverage.length === 1 ? userAverage + '.0' : userAverage}
        </div>
        )
    }
    
    // Render All the data of the show
    renderShowDetails() {
        const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
        const criticAverage = Number(this.state.show.vote_average).toString();
        const releaseDate = new Date(this.state.show.first_air_date)
        const lastDate = new Date(this.state.show.last_air_date)
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return (
            <>
                <div style={{backgroundImage: `url(${imagePath}${this.state.show.poster_path})`}} className='movie-poster'></div>
                <div className="details-text">
                    <h1 className='title'>{this.state.show.name}</h1>
                    <p className='tagline'>{this.state.show.tagline}</p>
                    <p className="critic-score-header">Average Critic Score</p>
                    {this.renderCriticRating(criticAverage)}
                    <p className="user-score-header">Average User Score</p>
                    {this.renderUserRating(this.state.userAverage)}
                    <p className="episode-count">{this.state.show.number_of_episodes} Episodes</p>
                    <p className="season-count">{this.state.show.number_of_seasons} Seasons</p>
                    <p className="dates">{`${months[releaseDate.getMonth()]} ${releaseDate.getDate()} ${releaseDate.getFullYear()} -
                                         ${months[lastDate.getMonth()]} ${lastDate.getDate()} ${lastDate.getFullYear()}`}
                    </p>
                </div>
                </>
        )
    }

    componentDidMount() {
        const showId = this.props.match.params.showId
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({show:response.data, loading:false})
        })
    }
    
    render() {
        return(
            <>
                <div className='details-background'>
                {this.state.loading ? this.renderLoadingIcon() : this.renderShowDetails() }
                </div>
            </>
        )
    }
}

export default ShowDetails;