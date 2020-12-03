import React from 'react';
import axios from 'axios';

import ProfilePic from '../components/profile/ProfilePic'
import MovieRecs from '../components/profile/MovieRecs'

class ProfileDetails extends React.Component {

    state = {
        profile: {},
    }

    componentDidMount() {
        const profileId = this.props.profileId
        axios.get(`http://localhost:8000/premier/profiles/${profileId}`)
            .then((response) => this.setState({profile:response.data[0].fields}))
    }

    render() {
        return (
            <>
            <h3 className="full-name">{this.state.profile.first_name} {this.state.profile.last_name}</h3>
            <ProfilePic />
            <h3 className="movie-recs-header">Movies</h3>
            <MovieRecs profileId={this.props.profileId}/>
            </>
        )
    }
}

export default ProfileDetails;