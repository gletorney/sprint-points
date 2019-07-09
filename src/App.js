import React from 'react';
import { fetchMyUser, connectToSocket } from './utils';
import Header from './Header';
import TeamMenu from './TeamMenu';
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
    };
    window.socket = connectToSocket();
  }

  componentDidMount() {
    //Init returning user
    let me = this.state.me;
    if (this.state.me.name && window.socket){
      console.log('Did Mount')
      window.socket.onopen = function (event) {
        this.send(
          JSON.stringify(
            { ...me, type: 'hello-user' }
          )
        )
      };
    }
  }

  helloUser = () => {
    //Init new user
    const myUser = fetchMyUser();
    console.log('Hello User')
    if (window.socket.readyState === 1){
      window.socket.send(
        JSON.stringify(
          { ...myUser, type: 'hello-user' }
        )
      );
    } else {
      console.log('TRYING AGAIN')
      this.helloUser();
    }
    this.setState({ 
      me: myUser
    });
  }

  handleLogout = () => {
    const myUser = fetchMyUser();
    if (window.socket){
      window.socket.onopen = function (event) {
        this.send(
          JSON.stringify(
            { ...myUser, type: 'logout-user' }
          )
        )
      };
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
            <TeamMenu 
              team={this.state.board}
              myUser={myUser}
            />
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
      </div>
    );
  }
}

export default App;