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
      hideCard: 1,
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
    document.getElementById('ChatInput').placeholder = 'A clean slate';
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
  }

  handleHideChat = () => {
    this.props.resetState({
      hideChat: 1,
      alert: 'Hide that noise.'
    });
    document.getElementById('VotingPanel').style.maxWidth = '100%';
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
  }

  handleShowChat = () => {
    this.props.resetState({
      hideChat: 0,
      alert: 'Back in the game!'
    });
    //close modal
    document.getElementById('FooterMenu').style.display = 'none';
  }

  render() {
    const isAdmin = this.props.myUser.admin;
    return (
      <div>
        {isAdmin ? (
          <FooterAdmin /> 
        ) : (
          <FooterNotAdmin 
            onClaimAdmin={this.handleClaimAdmin} />
        )}
        <FooterMenu
          onLogout={this.handleLogout}
          hiddenCard={this.state.hideCard} 
          onShowCard={this.handleShowCard} 
          onHideCard={this.handleHideCard} 
          hiddenChat={this.props.hideChat} 
          onClearChat={this.handleClearChat} 
          onHideChat={this.handleHideChat} 
          onShowChat={this.handleShowChat} 
        />
        <div className="text-center pad-20">
          <img src="https://files.visura.co/users/10/d8d295f39053f70c2f1ea12a1b5a7187.png" height="35" />
        </div>
      </div>
    )
  }
}

export default Footer;