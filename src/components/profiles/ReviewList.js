import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ReviewList extends React.Component {
    state = {
        reviews: [],
    }

    handleDelete = (e) => {
        const userId = Number(this.props.profileId)+1
        const reviewId = e.currentTarget.parentNode.id
        console.log(e.currentTarget.parentNode)
        const config = {
            method: 'get',
            url: `https://premier-min.herokuapp.com/premier/profiles/${userId}/reviews/${reviewId}/delete`,
            headers: { 
              'Authorization': `JWT ${localStorage.getItem('token')}`,
            },
          };
          axios(config)
          window.location.reload()
          
    }

    componentWillUnmount() {
        this._isMounted = false;
     }
    
    componentDidMount() {
        const userId = Number(this.props.profileId)+1
        axios.get(`https://premier-min.herokuapp.com/premier/profiles/${userId}/reviews`)
        .then((response) => 
        {
            this.setState({reviews:response.data})
        })
    }

    renderReviews() {
        return this.state.reviews.map((review) => {
            let id = '';
            let type = '';
            if(review.movie_id) {
                id = review.movie_id
                type = 'movies'
            }
            else {
                id = review.show_id
                type = 'shows'
                console.log(id)
            }
            return(
                <li id={id} className="recs"><Link key={id} className="rec-link" to={`/${type}/${id}`}><p>{review.title}<span className="score-span">{review.score}/10</span></p></Link>
                {this.props.userId-1 == this.props.profileId &&
                <a onClick={this.handleDelete} className="delete-from-rec waves-effect waves-light btn">Delete</a>
                }
                </li>
            )
            
        })
    }

    render() {
        return (
            <>
            <div className="review-list">
                {this.renderReviews()}
            </div>
            </>
        )
    }

}

export default ReviewList;