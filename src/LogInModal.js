import React from 'react';
import LogIn from './LogIn';
import CreateTeam from './CreateTeam';

class LogInModal extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      team: ''
    };
  }

  handleAddTeam = (team) => {
    this.setState({ team });
  }

  handleAddUser = (userId, userName, userAvatar) => {
    this.props.onAddUser(userId, userName, userAvatar);
  }

  render() {
    const teamName = this.state.team || window.location.hash;
    return ( 
      <div className="overlay">
        <div className="modal">
          {teamName ? ( 
            <LogIn onAddUser={this.handleAddUser} />
          ) : (  
            <CreateTeam onAddTeam={this.handleAddTeam} />
          )}
        </div>
      </div>
    )
  }
}

export default LogInModal;