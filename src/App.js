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
      adminName: '',
      me: myUser,
      team: '',
      alert: ''
    };
  }

  componentDidMount = () => {
    //Check for returning user
    let me = this.state.me;
    if (this.state.me.name && window.socket){
      window.socket.send(
        JSON.stringify(
          { ...me, type: 'hello-user', team: window.team }
        )
      );
    };
  }

  componentDidUpdate = () => {
    if (this.state.alert){
      let alertDiv = document.getElementById('Alert');
      alertDiv.style.bottom = '10px';
      alertDiv.innerText = this.state.alert;
      setInterval(
        () => hideAlert(),
        5000
      );
      function hideAlert(){
        alertDiv.style.bottom = '-300px';
      }
    };
  }

  componentDidCatch = (error, info) => {
    this.props.onError();
  }

  helloUser = () => {
    //Add new user
    const myUser = fetchMyUser();
    if (window.socket){
      if (window.socket.readyState === 1){
        window.socket.send(
          JSON.stringify(
            { ...myUser, type: 'hello-user', team: window.team }
          )
        );
      }
    }
    this.setState({ 
      me: myUser,
      alert: 'Welcome'
    });
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
  }

  handleChangeAdmin = (adminName) => {
    let string = adminName + ' is now Admin.';
    this.setState({ 
      alert: string,
      adminName: adminName
    });
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
              votingState={this.state.isVoting}
              onChangeAdmin={this.handleChangeAdmin} />
            <VotingPanel 
              myUser={this.state.me} />
          </main>
        </div>
        {readyToPlay ? ( 
          <Footer 
            myUser={this.state.me} 
            adminName={this.state.adminName} /> 
        ) : (  
          <LogInModal 
            onAddUser={this.helloUser} /> 
        )}
        <div id="Alert"><i className="icofont-fox"></i> {this.state.alert}</div>
      </div>
    );
  }
}

export default App;