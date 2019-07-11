import React from 'react';
import FooterAdmin from './FooterAdmin';
import FooterNotAdmin from './FooterNotAdmin';

class Footer extends React.Component {

  handleClaimAdmin = () => {
    var message = {
      id: this.props.myUser.id,
      name: this.props.myUser.name,
      admin: true,
      type: 'claim-admin',
      team: window.team
    };
    window.socket.send(
      JSON.stringify(message)
    );
    window.localStorage.setItem('admin', true);
  }

  render() {
    const isAdmin = this.props.myUser.admin;
    return (
      <div>
        {isAdmin ? (
          <FooterAdmin />
        ) : (
          <FooterNotAdmin adminName={this.props.adminName} onClaimAdmin={this.handleClaimAdmin}/>
        )}
      </div>
    )
  }
}

export default Footer;