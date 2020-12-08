import React from "react";
import M from "materialize-css";
import axios from 'axios';
import "materialize-css/dist/css/materialize.min.css";

class ReviewModal extends React.Component {
  state = {
    content: "",
  }

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

  changeColor = (e) => {
      const thumb = document.querySelector('input[type=range]+.thumb')
      const value = document.querySelector('#rating-slider').value
      if (value > 7) {
          thumb.classList.add('good-slider')
          thumb.classList.remove('meh-slider')
          thumb.classList.remove('bad-slider')
      } 
      else if (value > 4) {
          thumb.classList.add('meh-slider')
          thumb.classList.remove('good-slider')
          thumb.classList.remove('bad-slider')
      }
      else {
        thumb.classList.add('bad-slider')
        thumb.classList.remove('good-slider')
        thumb.classList.remove('meh-slider')
      }
  }

  handleChange = (e) => {
     this.setState({content: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
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
            <form action="">
                <p class="range-field">
                    <input onChange={this.changeColor}  type="range" id="rating-slider" min="1" max="10" />
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