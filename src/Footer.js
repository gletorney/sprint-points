import React from 'react';
import FooterAdmin from './FooterAdmin';
import FooterNotAdmin from './FooterNotAdmin';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    let hidden = this.props.myUser.hide;
    this.state = {
      hide: hidden
    }
  }

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

  handleHideCard = () => {
    var message = {
      id: this.props.myUser.id,
      name: this.props.myUser.name,
      hide: 1,
      type: 'hide-card',
      team: window.team
    };
    window.socket.send(
      JSON.stringify(message)
    );
    window.localStorage.setItem('hide', 1);
    this.setState({
      hide: 1
    })
  }

  handleShowCard = () => {
    var message = {
      id: this.props.myUser.id,
      name: this.props.myUser.name,
      hide: 0,
      type: 'show-card',
      team: window.team
    };
    window.socket.send(
      JSON.stringify(message)
    );
    window.localStorage.removeItem('hide');
    this.setState({
      hide: 0
    })
  }

  render() {
    const isAdmin = this.props.myUser.admin;
    const isHiden = this.state.hide;
    return (
      <div>
        {isAdmin ? (
          <FooterAdmin 
            hidden={isHiden} 
            onShowCard={this.handleShowCard} 
            onHideCard={this.handleHideCard} /> 
        ) : (
          <FooterNotAdmin 
            hidden={isHiden} 
            onShowCard={this.handleShowCard} 
            adminName={this.props.adminName} 
            onHideCard={this.handleHideCard} 
            onClaimAdmin={this.handleClaimAdmin}/>
        )}
      </div>
    )
  }
}

export default Footer;