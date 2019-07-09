import React from 'react';
import { fetchMyUser } from './utils';
import Header from './Header';
import CardSet from './CardSet';
import Footer from './Footer';
import LogInModal from './LogInModal';
import VotingPanel from './VotingPanel';

class App extends React.Component {

  constructor(props) {
    super(props);
    const myUser = fetchMyUser();
    this.state = { 
      board: [],
      isVoting: 'on',
      isAdmin: 0,
      me: myUser,
      team: '',
      alert:''
    };
  }

  componentDidMount() {
    //Check for returning user
    let me = this.state.me;
    if (this.state.me.name && window.socket){
      window.socket.send(
        JSON.stringify(
          { ...me, type: 'hello-user' }
        )
      )
    };
  }

  componentDidUpdate(){
    if (this.state.alert){
      let alertDiv = document.getElementsById('alert');
      alertDiv.style.display = 'block';
      this.alertApp(this.state.alert);
    }
  }

  helloUser = () => {
    //Add new user
    const myUser = fetchMyUser();
    if (window.socket){
      if (window.socket.readyState === 1){
        window.socket.send(
          JSON.stringify(
            { ...myUser, type: 'hello-user' }
          )
        );
      this.alertApp(null);
      } else {
        this.alertApp('Lost connection');
        this.helloUser();
      }
    }
    this.setState({ 
      me: myUser
    });
  }

  alertApp(alertNotice) {
    this.setState((prevState) => {
      return {alert: alertNotice}
    });
  }

  handleLogout = () => {
    const myUser = fetchMyUser();
    if (window.socket){
      window.socket.send(
        JSON.stringify(
          { ...myUser, type: 'logout-user' }
        )
      )
    }
    this.setState({ 
      me: ''
    });
    window.localStorage.removeItem('id'); 
    window.localStorage.removeItem('name'); 
    window.localStorage.removeItem('avatar'); 
  }

  sendPing = (myUser) => {
    if (window.socket){
      window.socket.onopen = function (event) {
        window.socket.send(
          JSON.stringify(myUser)
        );
      };
    }
  }

  render() {
    const {
      me: myUser
    } = this.state;

    const teamName = window.location.hash;

    if (myUser.name && teamName && this.state.editUser !== 1){
      var readyToPlay = true
    }

    return (
      <div>
        <div className="app-board">
          <Header 
            myUser={myUser}
            onLogout={this.handleLogout} />
          <main className="row">
            <CardSet 
              myUser={myUser} 
              board={this.state.board} 
              votingState={this.state.isVoting} />
            <VotingPanel 
              myUser={this.state.me} />
          </main>
        </div>
        {readyToPlay ? ( 
          <Footer myUser={this.state.me} /> 
        ) : (  
          <LogInModal onAddUser={this.helloUser} /> 
        )}
        <div id="Alert">{this.state.alert}</div>
      </div>
    );
  }
}

export default App;