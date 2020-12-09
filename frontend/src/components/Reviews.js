import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

import ReviewModal from '../components/ReviewModal';

class Reviews extends React.Component {
    state = {
        reviews: [],
    }

    renderReviews = () => {
        return this.state.reviews.map((review) => {
            return(
                <li className="review-text"><Link exact to={`/profiles/${review.user-1}`}>{review.username}</Link><br/>{review.content}<br/>{review.score}/10</li>
            )
            
        })
    }

    componentDidMount() {
        let type = ''
        let id = ''
        if(this.props.showId) {
            type = 'shows'
            id = this.props.showId
        }
        else {
            type = 'movies'
            id = this.props.movieId 
        }
        axios.get(`http://localhost:8000/premier/${type}/${id}/reviews`)
            .then((response) => this.setState({reviews: response.data}))
    }

    render() {
        return (
            <>
            <div className="review-section">
                <h3 className="review-header">User Reviews</h3>
                <ul className="review-grid">
                    <ReviewModal title={this.props.title} user={this.props.user} showId={this.props.showId} movieId={this.props.movieId}/>
                    {this.renderReviews()}
                </ul>
            </div>
            </>
        )
    }
    
}

export default Reviews;