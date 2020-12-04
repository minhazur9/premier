import Axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class ProfileIndex extends React.Component {
    state = {
        usernames:[]
    }

    componentDidMount() {
        axios.get('http://localhost:8000/premier/profiles/')
        .then((response) => {
            console.log(response.data)
        })
    }

    render() {
        return (
            <h1>Profiles</h1>
        )
    }

}

export default ProfileIndex;