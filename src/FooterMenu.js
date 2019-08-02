import React from 'react';

class FooterMenu extends React.Component {

  closeModal = () => {
    document.getElementById('FooterMenu').style.display = 'none';
  }

  reloadWindow = () => {
    window.location.reload();
  }

  render() {
    const isCardHidden = this.props.hiddenCard;
    const isChatHidden = this.props.hiddenChat;
    console.log('isChatHidden =', isChatHidden)
    return (
      <div id="FooterMenu" className="overlay">
        <div className="modal">
          <div className="mono-titles pad-bottom-20 pad-top-20">
            Options
          </div>
          <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc">
            {isCardHidden ? (
              <span className="color-blue cursor-pointer" onClick={this.props.onShowCard}>
                Show my card
              </span>
            ) : (
              <span className="color-blue cursor-pointer" onClick={this.props.onHideCard}>
                Hide my card
              </span>
            )}
          </div>
          {isChatHidden ? (
            <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc color-blue cursor-pointer" onClick={this.props.onShowChat}>
              Show chat
            </div> 
          ) : (
            <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc color-blue cursor-pointer" onClick={this.props.onHideChat}>
              Hide chat
            </div>
          )}
          <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc color-blue cursor-pointer" onClick={this.props.onClearChat}>
            Clear chat history
          </div>
          <div className="pad-top-10 pad-bottom-10 border-bottom-1-ccc color-blue cursor-pointer" onClick={this.reloadWindow}>
            Reload board
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



            