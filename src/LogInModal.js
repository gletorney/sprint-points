import React from 'react';
import LogIn from './LogIn';
import CreateTeam from './CreateTeam';

class LogInModal extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      team: window.location.hash
    };
  }

  handleAddTeam = (team) => {
    this.setState({ team });
  }

  handleAddUser = () => {
    this.props.onAddUser();
  }

  render() {
    const teamName = this.state.team;
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