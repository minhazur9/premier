import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ProfileIndex extends React.Component {
    state = {
        users:[]
    }

    componentDidMount() {
        axios.get('https://premier-min.herokuapp.com/premier/profiles/')
        .then((response) => {
            this.setState({users:response.data})
        })
    }

    renderProfiles = () => {
        const users = this.state.users;
        return users.map((user) => {
            return (

            <Link to={`/profiles/${user.user-1}`}><li className='profile-item'>{user.username}</li></Link>
            )
        })
    }

    render() {
        return (
            <>
            <h1 className="profile-index-header">Check out other lists!</h1>
            {this.renderProfiles()}
            </>
        )
    }

}

export default ProfileIndex;