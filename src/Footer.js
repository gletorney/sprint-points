import React from 'react';

class Footer extends React.Component {

  claimAdmin = () => {
    var message = {
      id: this.props.myUser.id,
      name: this.props.myUser.name,
      admin: true,
      type: 'claim-admin'
    };
    window.socket.send(
      JSON.stringify(message)
    );
  }

  render() {
    const myUser = this.props.myUser;
    return (
      <div className="footer font-0-9">
          You are currently logged in as <b className="pad-right-5">{myUser.name}</b> | Admin is {this.props.adminName ? this.props.adminName : '(unclaimed)'} | <span onClick={this.claimAdmin} className="pad-left-5 bold color-blue cursor-pointer">Claim admin</span>
      </div>
    )
  }
}

export default Footer;