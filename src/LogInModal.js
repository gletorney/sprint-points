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

  render() {
    const teamName = this.state.team;
    return ( 
      <div>
          {teamName ? ( 
            <LogIn onAddUser={this.props.onAddUser} />
          ) : (  
            <CreateTeam onAddTeam={this.handleAddTeam} />
          )}
      </div>
    )
  }
}

export default LogInModal;