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

    handleDelete = (e) => {
        const userId = Number(this.props.profileId)+1
        const showId = e.currentTarget.parentNode.id

        const config = {
            method: 'get',
            url: `http://localhost:8000/premier/profiles/${userId}/shows/${showId}/delete`,
            headers: { 
              'Authorization': `JWT ${localStorage.getItem('token')}`,
            },
          };
          axios(config)
          window.location.reload()
    }


    rendershows() {
        return this.state.shows.map((show) => {
            return(
                <li id={show.show_id }className="recs"><Link key={show.show_id}className="rec-link" to={`/shows/${show.show_id}`}><p>{show.title}</p></Link>
                <a onClick={this.handleDelete} className="delete-from-rec waves-effect waves-light btn">Delete</a>
                </li>
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