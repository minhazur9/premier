import React from "react";
import M from "materialize-css";
import axios from 'axios';
import "materialize-css/dist/css/materialize.min.css";



class ReviewModal extends React.Component {
  state = {
    content: "",
    score: 10,
  }

  thumb = document.querySelector("input[type=range]+.thumb .value")

  componentDidMount() {
    const options = {
      onOpenStart: () => {

      },
      onOpenEnd: () => {
        
      },
      onCloseStart: () => {
        
      },
      onCloseEnd: () => {
        
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);
  }

  handleChange = (e) => {
     this.setState({content: e.target.value})
  }

  setScore = (e) => {
    this.setState({score: document.querySelector('#rating-slider').value})
  }

  handleSubmit = (e) => {
    let endpoint = ""
    if(this.props.showId) endpoint = 'http://localhost:8000/premier/shows/reviews/add'
    else endpoint = 'http://localhost:8000/premier/movies/reviews/add'
      const config = {
        method: 'post',
        url: endpoint,
        headers: { 
          'Authorization': `JWT ${localStorage.getItem('token')}`,
        },
        data : {
            'show_id': this.props.showId, 
            'movie_id': this.props.movieId,
            "content": this.state.content,
            'score': this.state.score,
            'user': this.props.user.id
        }
      };
      axios(config)

    
  }

  render() {
    return (
      <>
        <a
          className="waves-effect waves-light btn modal-trigger add-review"
          data-target="modal2"
        >
          Add Review
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal2"
          className="modal"
        >
          <div className="modal-content">
          <h3 className="score-header">Rate it!</h3>
            <form action="" onSubmit={this.handleSubmit}>
                <p class="range-field">
                    <input onChange={this.setScore}  type="range" id="rating-slider" min="1" max="10" />
                </p>
                <h4 className="score-header">Review</h4>
                <textarea onChange={this.handleChange} name="review-content" id="review-content" cols="20" rows="30"></textarea>
                <button className="waves-effect waves-light btn review-submit">Submit</button>
            </form>
            <button className="modal-action modal-close waves-effect waves-light btn review-cancel">Cancel</button>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </>
    );
  }
}

export default ReviewModal;