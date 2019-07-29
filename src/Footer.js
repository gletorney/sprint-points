import React from 'react';
import FooterAdmin from './FooterAdmin';
import FooterNotAdmin from './FooterNotAdmin';
import FooterMenu from './FooterMenu';
import { fetchMyUser } from './utils';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    let hidden = this.props.myUser.hideCard;
    this.state = {
      hideCard: hidden
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
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
  }

  handleHideCard = () => {
    var message = {
      id: this.props.myUser.id,
      name: this.props.myUser.name,
      hideCard: 1,
      type: 'hide-card',
      team: window.team
    };
    window.socket.send(
      JSON.stringify(message)
    );
    window.localStorage.setItem('hideCard', 1);
    this.setState({
      hideCard: 1
    })
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';

  }

  handleShowCard = () => {
    var message = {
      id: this.props.myUser.id,
      name: this.props.myUser.name,
      hideCard: 0,
      type: 'show-card',
      team: window.team
    };
    window.socket.send(
      JSON.stringify(message)
    );
    window.localStorage.removeItem('hideCard');
    this.setState({
      hideCard: 0
    });
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
  }

  handleClearChat = () => {
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
  }

  handleLogout = () => {
    const myUser = fetchMyUser();
    if (window.socket){
      window.socket.send(
        JSON.stringify(
          { ...myUser, type: 'logout-user', team: window.team }
        )
      )
    }
    this.setState({ 
      me: '',
      alert: 'See ya later'
    });
    window.localStorage.removeItem('id'); 
    window.localStorage.removeItem('name'); 
    window.localStorage.removeItem('avatar'); 
    window.localStorage.removeItem('admin'); 
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
    this.props.resetState(
      {alert: 'See ya'}
    );
    setTimeout(function(){ window.location.reload() }, 3000);
  }

  handleClearChat = () => {
    let storageName = 'chat' + window.team;
    window.localStorage.removeItem(storageName); 
    document.getElementById('ChatMessageContainer').innerHTML = '';
    document.getElementById('ChatInput').value = '';
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
  }

  render() {
    const isAdmin = this.props.myUser.admin;
    const isHiddenCard = this.state.hideCard;
    return (
      <div>
        {isAdmin ? (
          <FooterAdmin /> 
        ) : (
          <FooterNotAdmin />
        )}
        <FooterMenu
          admin={isAdmin} 
          onLogout={this.handleLogout}
          onClaimAdmin={this.handleClaimAdmin}
          hiddenCard={isHiddenCard} 
          onShowCard={this.handleShowCard} 
          onHideCard={this.handleHideCard} 
          onClearChat={this.handleClearChat} 
        />
      </div>
    )
  }
}

export default Footer;