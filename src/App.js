import React from 'react';
//import { fetchMyUser } from './utils';
import Header from './Header';
import TeamMenu from './TeamMenu';
import CardSet from './CardSet';
import Footer from './Footer';
import LogInModal from './LogInModal';
import VotingPanel from './VotingPanel';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      editUser: '',
      avatar: ''
    };
    this.hasTeam = window.location.hash;
    this.socket = new WebSocket('wss://sp-websocket.herokuapp.com', this.hasTeam);
    this.socket.onmessage = function(msg) {
      console.log(msg);
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

  sendPing = () => {
    let socket = this.socket;
    var message = {
      type: "date sent - received",
      date: Date.now()
    };
    socket.send(JSON.stringify(message));
  }

  render() {

    var me = {
      userId: window.localStorage.getItem('id'),
      name: window.localStorage.getItem('name'),
      avatar: window.localStorage.getItem('avatar')
    }
  
    if (me.userId && this.hasTeam && this.state.editUser !== 1){
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