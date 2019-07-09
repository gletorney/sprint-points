import React from 'react';

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: ''
    }
  }

  handleInput = (e) => {
    let inputVal = e.target.value;
    let teamName = encodeURI(inputVal.replace(' ', '+'));
    this.setState({
      team: teamName
    });
  }

  createTeam = () => {
    this.props.onAddTeam(this.state.team);
    window.location.hash = this.state.team;
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <div className="mono-titles pad-bottom-20 pad-top-20">
            Create<br/> 
            a new team<br/>
            &mdash;
          </div>
          <input type="text" placeholder="Team name" className="team-name-input display-block" onChange={this.handleInput}></input>
          <div className="pad-top-30 pad-bottom-20 border-bottom-1-ccc">
            <span onClick={this.createTeam} className="button block text-center">Create team</span>
          </div>
          <div className="pad-top-20 text-center font-0-8">
            Already have a team?<br/>
            Get the link from a friend.
          </div>
        </div>
      </div>
    )
  }
}

export default CreateTeam;