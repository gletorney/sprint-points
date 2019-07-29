import React from 'react';

class FooterMenu extends React.Component {

  closeModal = () => {
    document.getElementById('FooterMenu').style.display = 'none';
  }

  render() {
    const cardIsHidden = this.props.hiddenCard;
    const isAdmin = this.props.isAdmin;
    return (
      <div id="FooterMenu" className="overlay">
        <div className="modal">
          <div className="mono-titles pad-bottom-20 pad-top-20">
            Options
          </div>
          <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc">
            {isAdmin ? (
              <span className="ital">
                You are admin
              </span>
            ) : (
              <span className="color-blue cursor-pointer" onClick={this.props.onClaimAdmin}>
                Claim admin
              </span>
            )}
          </div>
          <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc">
            {cardIsHidden ? (
              <span className="color-blue cursor-pointer" onClick={this.props.onShowCard}>
                Show my card
              </span>
            ) : (
              <span className="color-blue cursor-pointer" onClick={this.props.onHideCard}>
                Hide my card
              </span>
            )}
          </div>
          {/* 
          <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc color-blue cursor-pointer" onClick={this.props.onHideChat}>
            Hide chat
          </div> 
          */}
          <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc color-blue cursor-pointer" onClick={this.props.onClearChat}>
            Clear chat
          </div>
          <div className="pad-top-20 text-center">
            <span className="outline-button width-50" onClick={this.closeModal}>
              Close
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default FooterMenu;



            