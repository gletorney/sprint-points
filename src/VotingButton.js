import React from 'react';
import { resetButtonState } from './utils';

class VotingButton extends React.Component {

  sendPing = (e, socket) => {
    let value = e.target.value;
    var message = {
      id: this.props.myUser.id,
      score: value,
      type: 'vote'
    };
    socket.send(
      JSON.stringify(message)
    );
    resetButtonState();
    e.target.style.backgroundColor = '#C93A27'
  }

  render() {

    const score = this.props.score;
    const socket = window.socket;

    return (
      <div className="pad-bottom-5">
        <button type="submit" name="score" value={score} onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">{score}</button>
      </div>
    )
  }
}

export default VotingButton;