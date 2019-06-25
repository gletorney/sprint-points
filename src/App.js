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
    const myUser = fetchMyUser() || null;
    this.state = { 
      me: myUser,
      team: '',
      votes: '',
      isVoting: 'on',
      isAdmin: 'off'
    };
    //my team
    this.socket = connectToSocket(window.location.hash);
  }

  helloUser = (userId, userName, userAvatar) => {
    let updatedUser = {
      id: userId,
      name: userName,
      avatar: userAvatar
    }
    this.setState({ 
      me: updatedUser      
    });
  }

  handleEditUser = () => {
    this.setState({ 
      editUser: 1
    });
  }

  sendPing = () => {
    let socket = this.socket;
    var message = {
      type: "Ping",
      date: Date.now()
    };
    socket.send(JSON.stringify(message));
  }

  render() {
    const {
      me: myUser
    } = this.state;

    const teamName = window.location.hash;

    if (myUser.name && teamName && this.state.editUser !== 1){
      var readyToPlay = true
    }

    let team = [
      {'id' : 2, 'name': 'Groot', 'avatar': 'icofont-bat', 'score': 8 },
      {'id' : 3, 'name': 'Star-lord','avatar': 'icofont-pineapple','score': 2},
      {'id' : 4, 'name': 'Gamora','avatar': 'icofont-butterfly','score': 5}
    ]

    return (
      <div>
        <div className="app-board">
          <span onClick={this.sendPing}>
            CLICK
          </span>
          <Header myUser={myUser}/>
          <main className="row">
            <TeamMenu 
              team={team}
              myUser={myUser}
              onEditUser={this.handleEditUser}
            />
            <CardSet team={team} votingState={this.state.isVoting} />
            <VotingPanel />
          </main>
        </div>
        {readyToPlay ? ( 
          <Footer /> 
        ) : (  
          <LogInModal onAddUser={this.helloUser} /> 
        )}
      </div>
    );
  }
}

export default App;