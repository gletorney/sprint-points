import React, { Component } from 'react';
import { fetchMyUser } from './utils';
import Header from './Header';
import TeamMenu from './TeamMenu';
import CardSet from './CardSet';
import Footer from './Footer';
import LogInModal from './LogInModal';
import VotingPanel from './VotingPanel';

const socket = new WebSocket('ws://sp-websocket.herokuapp.com');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      editUser: '',
      avatar: ''
    };

    socket.onmessage = function (event) {
      console.log(event.data);
    }
  }

  helloUser = (userId, userName, userAvatar) => {
    this.setState({ 
      id: userId,
      name: userName,
      avatar: userAvatar,
      editUser: '',
      voting: 0
    });
  }

  handleEditUser = () => {
    this.setState({ 
      editUser: 1
    });
  }

  sendWsPing = () => {
    socket.send({ clicked: true });
  }

  render() {
    var me = {
      userId: window.localStorage.getItem('id'),
      name: window.localStorage.getItem('name'),
      avatar: window.localStorage.getItem('avatar')
    }
  
    let hasTeam = window.location.hash;

    var readyToPlay;
    if (me.userId && hasTeam && this.state.editUser != 1){
      var readyToPlay = true
    } else {
      var readyToPlay = false
    }

    let team = [
      {'id' : 2, 'name': 'Groot', 'avatar': 'icofont-bat', 'score': 8 },
      {'id' : 3, 'name': 'Star-lord','avatar': 'icofont-pineapple','score': 2},
      {'id' : 4, 'name': 'Gamora','avatar': 'icofont-butterfly','score': 5}
    ]

    return (
      <div>
        <div className="app-board" onClick={this.sendWsPing} >
          <Header myUser={me}/>
          <main className="row">
            <TeamMenu 
              team={team}
              myUser={me}
              onEditUser={this.handleEditUser}
            />
            <CardSet team={team} votingState={this.state.voting} />
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