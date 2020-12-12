import React from 'react';
import axios from 'axios';

import VideoModal from '../../components/VideoModal'
import Reviews from '../../components/Reviews'

class ShowDetails extends React.Component {

    state = {
        show: {},
        userAverage: '---',
        loading: true,
        clicked:false,
        genreList: [],
        trailerLink: '',
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
            {criticAverage.length === 1 ? criticAverage + '.0' : criticAverage}
        </div>
        )
    }

    renderTrailer() {
        const showId = this.props.showId
        const videoPath = 'https://www.youtube.com/embed/'
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            if(response.data.results !== undefined && response.data.results.length > 0) {
                const videoKey = response.data.results[0].key
                this.setState({trailerLink:videoPath+videoKey})
            }
        })
        
    }


    renderUserRating(userAverage) {
        let colorClass = ""
        if (!Number(userAverage)) {
            userAverage = '---'
            colorClass = ""
        }
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

    handleAddToList = (e) => {
          e.currentTarget.classList.toggle("added");
          e.preventDefault();
          const config = {
            method: 'post',
            url: 'https://premier-min.herokuapp.com/premier/shows/add',
            headers: { 
              'Authorization': `JWT ${localStorage.getItem('token')}`,
            },
            data : {
                'show_id': this.state.show.id, 
                'title':this.state.show.name,
                'user': this.props.user.id
            }
          };
          axios(config)
          this.setState({clicked:true})
          
    }

    renderDates() {
        const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
        const releaseDate = new Date(this.state.show.first_air_date)
        const lastDate = new Date(this.state.show.last_air_date)
        return (
            <p className="dates">{`${months[releaseDate.getMonth()]} ${releaseDate.getDate()} ${releaseDate.getFullYear()} -
                                         ${months[lastDate.getMonth()]} ${lastDate.getDate()} ${lastDate.getFullYear()}`}
                    </p>
        )
    }
    
    // Render All the data of the show
    renderShowDetails() {
        const userAverage = Number(this.state.userAverage).toString();
        const criticAverage = Number(this.state.show.vote_average).toString();
        const imagePath = 'https://image.tmdb.org/t/p/original'
        return (
            <>
                <div style={{backgroundImage: `url(${imagePath}${this.state.show.poster_path})`}} className='movie-poster'></div>
                <div className="details-text">
                <h1>{this.props.loggedIn}</h1>
                {this.props.loggedIn && !this.state.clicked &&
                <button onClick={this.handleAddToList} className="add-to-rec waves-effect waves-light btn">Add to List</button> ||
                this.props.loggedIn && this.state.clicked  &&
                <button onClick={(e) => e.preventDefault()} className="add-to-rec waves-effect waves-light btn added">Added</button>
                }
                
                    <h1 className='title'>{this.state.show.name}</h1>
                    <p className='tagline'>{this.state.show.tagline}</p>
                    <p className="critic-score-header">Average Critic Score</p>
                    {this.renderCriticRating(criticAverage)}
                    <p className="user-score-header">Average User Score</p>
                    {this.renderUserRating(userAverage)}
                    <p className="episode-count">{this.state.show.number_of_episodes} Episodes</p>
                    <p className="season-count">{this.state.show.number_of_seasons} Seasons</p>
                    <div className="column2">
                    {this.renderDates()}
                    <ul className="genres">{this.renderGenres()}</ul>
                    </div>
                    <div className="column3">
                    <p className="overview-header">Overview</p>
                    <p className="overview">{this.state.show.overview}</p>
                    </div>
                    <div className="column4"><VideoModal trailerLink={this.state.trailerLink} /></div>
                </div>
                </>
        )
    }

    renderGenres() {
        return this.state.genreList.slice(0,3).map((genre) => (
            <li className="genre-name">{genre.name}</li>
        ))
    }

    getUserScore = (score) => {
        this.setState({userAverage:score}) 
    }


    componentDidMount() {
        const showId = this.props.showId
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${key}&language=en-US`)
        .then((response) => {
            this.setState({show:response.data, loading:false, genreList:response.data.genres, showId:this.props.showId})
        })
        for(let i = 0; i < this.props.shows.length; i++) {
            if(this.props.shows[i].show_id == this.props.showId) {
                this.setState({clicked:true})
                return;
            }
        }
        this.renderTrailer()
    }
    
    render() {
        const user = this.props.user;
        return(
            <>
                <div className='details-background'>
                {this.state.loading ? this.renderLoadingIcon() : this.renderShowDetails() }
                </div>
                <Reviews getUserScore={this.getUserScore} loggedIn={this.props.loggedIn} title= {this.state.show.name} user = {user} showId = {this.props.showId}/>
            </>
        )
    }
}

export default ShowDetails;