import React from 'react';

class Footer extends React.Component {

  claimAdmin = () => {
    const socket = new WebSocket('wss://sp-websocket.herokuapp.com', window.location.hash);
    var message = {
      id: this.props.myUser.id,
      admin: true,
      type: 'claim-admin'
    };
    socket.onopen = function (event) {
      socket.send(
        JSON.stringify(message)
      );
    };
  }

  render() {
    const myUser = this.props.myUser;
    return (
      <div className="footer font-0-9">
          You are currently logged in as <b className="pad-right-5">{myUser.name}</b> | <span onClick={this.claimAdmin} className="pad-left-5 bold color-blue cursor-pointer">Claim admin</span>
      </div>
    )
  }
}

export default Footer;