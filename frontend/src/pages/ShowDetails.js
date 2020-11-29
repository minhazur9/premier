import React from 'react';
import axios from 'axios';


class ShowDetails extends React.Component {

    state = {
        name: '',
        image: '',
    }

    renderShowDetails() {
        const imagePath = 'https://image.tmdb.org/t/p/original'
        console.log(`${imagePath}${this.state.image}`)
        return (
            <>
            <h1>{this.state.name}</h1>
            <div style={{backgroundImage: `url(${imagePath}${this.state.image})`}} className='movie-poster'></div>
            </>
        )
    }

    componentDidMount() {
        const showId = this.props.match.params.showId
        const key = '47b253083f612b83066bfaf81a01e411'
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${key}&language=en-US`)
        .then((response) => {
            console.log(response.data)
            this.setState({title:response.data.name, image:response.data.poster_path})
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