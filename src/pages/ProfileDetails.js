import React from 'react';
import axios from 'axios';

import MovieRecs from '../components/profile/MovieRecs'
import ShowRecs from '../components/profile/ShowRecs';
import ReviewList from '../components/profile/ReviewList';

class ProfileDetails extends React.Component {

    state = {
        profile: {},
    }

    componentDidMount() {
        const profileId = this.props.profileId
        axios.get(`https://premier-min.herokuapp.com/premier/profiles/${profileId}`)
            .then((response) => {
                this.setState({profile:response.data[0]})
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
     }


    render() {
        const userId = this.props.userId
        return (
            <div className="profile-details">
            <h3 className="full-name">{this.state.profile.first_name} {this.state.profile.last_name}</h3>
            {this.state.profile.profile_pic && 
                <div className="profile-pic"> <img className="pic-src" src={`https://premier-min.herokuapp.com/${this.state.profile.profile_pic}`} alt="profile-pic"/></div>
            }
            {this.state.profile.profile_pic == "" &&
                <div className="profile-pic"> <img className="pic-src" src={`https://premier-min.herokuapp.com/static/default-picture_0_0.png`} alt="profile-pic"/></div>
             }
            
            <h3 className="reviews-list-header">My Reviews</h3>
            <ReviewList userId={userId} profileId={this.props.profileId}/>
            <h3 className="movie-recs-header">Movies</h3>
            <MovieRecs userId={userId} profileId={this.props.profileId}/>
            <h3 className="show-recs-header">Shows</h3>
            <ShowRecs userId={userId} profileId={this.props.profileId}/>
            </div>
        )
    }
}

export default ProfileDetails;