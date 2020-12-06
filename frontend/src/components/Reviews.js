import React from 'react';
import axios from 'axios';

class Reviews extends React.Component {
    state = {
        reviews: []
    }

    renderReview = () => {
        
    }

    render() {
        return (
            <>
            <div className="review-section">
                <h3 className="review-header">User Reviews</h3>
                <div className="review-grid">
                    
                </div>
            </div>
            </>
        )
    }
    
}

export default Reviews;