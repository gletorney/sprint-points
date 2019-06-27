import React from 'react';
import { fetchMyUser,connectToSocket } from './utils';
import Header from './Header';
import TeamMenu from './TeamMenu';
import CardSet from './CardSet';
import Footer from './Footer';
import LogInModal from './LogInModal';
import VotingPanel from './VotingPanel';

class App extends React.Component {

  constructor(props) {
    super(props);
    //me
    const myUser = fetchMyUser();
    this.state = { 
      board: [],
      isVoting: 'on',
      isAdmin: 'off',
      me: myUser,
      team: '',
    };

    this.socket = connectToSocket();    
  }

  componentDidMount() {
    const me = this.state.me;
    this.socket.onopen = function (event) {
      this.send(
        JSON.stringify(
            { ...me, type: 'hello-user' }
          )
        )
    };
  }

  helloUser = (userId, userName, userAvatar) => {
    let updatedUser = {
      type: 'hello-user',
      id: userId,
      name: userName,
      avatar: userAvatar
    }
    this.setState({ 
      me: updatedUser      
    });
    let socket = this.socket;
    socket.onopen = function (event) {
      socket.send(JSON.stringify(updatedUser));
    };
  }

  handleEditUser = () => {
    this.setState({ 
      editUser: 1
    });
  }

  sendPing = (myUser) => {
    let socket = this.socket;
    socket.onopen = function (event) {
      socket.send(JSON.stringify(myUser));
    };
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
          <Header myUser={myUser}/>
          <main className="row">
            <TeamMenu 
              team={this.state.board}
              myUser={myUser}
              onEditUser={this.handleEditUser}
            />
            <CardSet myUser={myUser} socket={this.socket} board={this.state.board} votingState={this.state.isVoting} />
            <VotingPanel socket={this.socket} myUser={this.state.me} />
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