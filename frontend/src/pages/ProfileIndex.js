import Axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ProfileIndex extends React.Component {
    state = {
        users:[]
    }

    componentDidMount() {
        axios.get('http://localhost:8000/premier/profiles/')
        .then((response) => this.setState({users:response.data}))
    }

    renderProfiles = () => {
        const users = this.state.users;
        return users.map((user) => {
            return (

            <Link to={`/profiles/${user.user-1}`}><li className='profile-item'>{user.first_name} {user.last_name}</li></Link>
            )
        })
    }

    render() {
        return (
            <>
            <h1>Profiles</h1>
            {this.renderProfiles()}
            </>
        )
    }

}

export default ProfileIndex;