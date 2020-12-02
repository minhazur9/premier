import React from 'react';
import axios from 'axios';

class ProfileDetails extends React.Component {

    state = {
        profile: {}
    }

    componentDidMount() {
        const profileId = this.props.profileId
        axios.get(`http://localhost:8000/premier/profiles/${profileId}`)
            .then((response) => this.setState({profile:response.data[0].fields}))
    }

    render() {
        return (
            <h1>{this.state.profile.first_name} {this.state.profile.last_name}</h1>
        )
    }
}

export default ProfileDetails;