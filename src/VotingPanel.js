import React from 'react';

class VotingPanel extends React.Component { 

  sendPing = (e, web) => {
    var score = e.target.value;
    var message = {
      user: this.props.myUser,
      score: score
    };
    web.socket.send(JSON.stringify(message));
  }

  render() {
    const socket = this.props;
    return (
      <div className="right-col">
        <div className="bold font-1-3 pad-20 border-bottom-1-ccc">
          Vote
        </div>
        <div className="pad-20 pos-relative vote-panel">
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="1" onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">1</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="2" onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">2</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="3" onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">3</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="5" onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">5</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="8" onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">8</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="13" onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">13</button>
          </div>
          <div>
            <button type="submit" name="score" value="-" onClick={(e) => this.sendPing(e, socket)} className="block button font-1-2">—</button>
          </div>
        </div>
      </div>
    )
  }
}

export default VotingPanel;

