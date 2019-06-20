import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="overlay">
				  <div className="modal">
            Sign up here
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Modal;