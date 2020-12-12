import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import ReviewModal from './ReviewModal';

class Reviews extends React.Component {
    state = {
        reviews: [],
    }


    refreshList = (data) => {
        this.setUserAverage(this.setState({reviews:data}))
    }

    setUserAverage = (refreshList) => {
        let total = 0;
        let avg = '---'
        const reviews = this.state.reviews
        const size = this.state.reviews.length
        if(size > 1) {
            for(let i = 0; i < size; i++ ) {
                total += reviews[i].score
            }
            avg = (total / size).toFixed(1);
        }
        this.props.getUserScore(avg)
    }

    renderReviews = () => {
        const userList = [];
        return this.state.reviews.map((review) => {
            userList.push(review);
            return(
                <li className="review-text"><Link exact to={`/profiles/${review.user-1}`}>{review.username}</Link><br/>{review.content}<br/>{review.score}/10</li>
            )
            
        })
    }

    componentDidMount() {
        let showId = this.props.showId;
        let type = ''
        let id = ''
        if(showId) {
            type = 'shows'
            id = showId
        }
        else {
            type = 'movies'
            id = this.props.movieId 
        }
        axios.get(`https://premier-min.herokuapp.com/premier/${type}/${id}/reviews`)
            .then((response) => this.setState({reviews: response.data}))
            .then(() => this.setUserAverage())
        
    }

    render() {
        return (
            <>
            <div className="review-section">
                <h3 className="review-header">User Reviews</h3>
                <ul className="review-grid">
                {this.props.loggedIn && this.state.done === false &&
                    <ReviewModal refreshList={this.refreshList} title={this.props.title} user={this.props.user} showId={this.props.showId} movieId={this.props.movieId}/>
                }
                {this.renderReviews()}
                </ul>
            </div>
            </>
        )
    }
    
}

export default Reviews;