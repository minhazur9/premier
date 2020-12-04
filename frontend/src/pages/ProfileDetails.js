import React from 'react';
import axios from 'axios';

import ProfilePic from '../components/profile/ProfilePic'
import MovieRecs from '../components/profile/MovieRecs'
import ShowRecs from '../components/profile/ShowRecs';

class ProfileDetails extends React.Component {

    state = {
        profile: {},
    }

    componentDidMount() {
        const profileId = this.props.profileId
        axios.get(`http://localhost:8000/premier/profiles/${profileId}`)
            .then((response) => {
                console.log(response.data);
                this.setState({profile:response.data[0]})
            })
    }


    render() {
        const userId = this.props.userId
        console.log(this.state.profile)
        return (
            <div className="profile-details">
            <h3 className="full-name">{this.state.profile.first_name} {this.state.profile.last_name}</h3>
            <ProfilePic />
            <h3 className="movie-recs-header">Movies</h3>
            <MovieRecs userId={userId} profileId={this.props.profileId}/>
            <h3 className="show-recs-header">Shows</h3>
            <ShowRecs userId={userId} profileId={this.props.profileId}/>
            </div>
        )
    }
}

export default ProfileDetails;