import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ShowRecs extends React.Component {
    state = {
        shows: []
    }

    componentDidMount() {
        const userId = Number(this.props.profileId)+1
        axios.get(`https://premier-min.herokuapp.com/premier/profiles/${userId}/shows/`)
        .then((response) => {
            this.setState({shows:response.data})
        })
    }

    handleDelete = (e) => {
        const userId = Number(this.props.profileId)+1
        const showId = e.currentTarget.parentNode.id

        const config = {
            method: 'get',
            url: `https://premier-min.herokuapp.com/premier/profiles/${userId}/shows/${showId}/delete`,
            headers: { 
              'Authorization': `JWT ${localStorage.getItem('token')}`,
            },
          };
        //   e.currentTarget.parentNode.style.visibility = "hidden"
          axios(config).then(() => this.refreshList())
    }

    refreshList = () => {
        const userId = Number(this.props.profileId)+1
        axios.get(`https://premier-min.herokuapp.com/premier/profiles/${userId}/shows/`)
        .then((response) => {
            this.setState({shows:response.data})
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
     }


    rendershows() {
        return this.state.shows.map((show) => {
            return(
                <li id={show.show_id }className="recs"><Link key={show.show_id}className="rec-link" to={`/shows/${show.show_id}`}><p>{show.title}</p></Link>
                {this.props.userId-1 == this.props.profileId &&
                <button onClick={this.handleDelete} className="delete-from-rec waves-effect waves-light btn">Delete</button>
                }
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