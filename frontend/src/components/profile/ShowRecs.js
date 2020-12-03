import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowRecs extends React.Component {
    state = {
        shows: []
    }

    componentDidMount() {
        const userId = Number(this.props.profileId)+1
        axios.get(`http://localhost:8000/premier/profiles/${userId}/shows`)
        .then((response) => this.setState({shows:response.data}))
    }

    rendershows() {
        return this.state.shows.map((show) => {
            return(
                <li className="recs"><Link className="rec-link" to={`/shows/${show.show_id}`}><p>{show.title}</p></Link></li>
            )
            
        })
    }

    render() {
        return (
            <>
            <div className="movie-recs">
            <ul>
            {this.rendershows()}
            </ul>
            </div>
            </>
        )
    }

}

export default ShowRecs;