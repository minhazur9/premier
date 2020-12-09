import React from 'react';
import axios from 'axios';

import ReviewModal from '../components/ReviewModal';

class Reviews extends React.Component {
    state = {
        reviews: [],
    }

    renderReview = () => {

    }

    render() {
        return (
            <>
            <div className="review-section">
                <h3 className="review-header">User Reviews</h3>
                <ul className="review-grid">
                    <ReviewModal user= {this.props.user} showId={this.props.showId} movieId={this.props.movieId}/>
                </ul>
            </div>
            </>
        )
    }
    
}

export default Reviews;