import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class VideoModal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        
      },
      onOpenEnd: () => {
        
      },
      onCloseStart: () => {
      },
      onCloseEnd: () => {
        const iframe = document.querySelector('iframe')
        if (iframe) {
          const src = iframe.getAttribute('src')
          document.querySelector('iframe').setAttribute('src',src)
        }
        
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);
    // If you want to work on instance of the Modal then you can use the below code snippet 
    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          Watch Trailer
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
        bottom-sheet class */}
          <div className="modal-content">
            {this.props.trailerLink !== "" 
            ? <iframe width="945" height="506" src={this.props.trailerLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            :  <h1 className="no-trailer">No Trailer Available</h1>
            }
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </>
    );
  }
}

export default VideoModal;