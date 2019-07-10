import React from 'react';
import { resetButtonState } from './utils';

class VotingButton extends React.Component {

  sendPing = (e) => {
    let value = e.target.value;
    var message = {
      id: this.props.myUser.id,
      score: value,
      type: 'vote',
      team: window.team
    };
    window.socket.send(
      JSON.stringify(message)
    );
    resetButtonState();
    e.target.style.backgroundColor = '#C93A27'
  }

  render() {

    const score = this.props.score;

    return (
      <div className="pad-bottom-5">
        <button type="submit" name="score" value={score} onClick={(e) => this.sendPing(e)} className="block button font-1-2">{score}</button>
      </div>
    )
  }
}

export default VotingButton;