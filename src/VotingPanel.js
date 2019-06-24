import React from 'react';

class VotingPanel extends React.Component {
  render() {
    return (
      <div className="right-col">
        <div className="bold font-1-3 pad-20 border-bottom-1-ccc">
          Vote
        </div>
        <div className="pad-20 pos-relative vote-panel">
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="1" className="block button font-1-2">1</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="2" className="block button font-1-2">2</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="3" className="block button font-1-2">3</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="5" className="block button font-1-2">5</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="8" className="block button font-1-2">8</button>
          </div>
          <div className="pad-bottom-5">
            <button type="submit" name="score" value="13" className="block button font-1-2">13</button>
          </div>
          <div>
            <button type="submit" name="score" value="-" className="block button font-1-2">—</button>
          </div>
        </div>
      </div>
    )
  }
}

export default VotingPanel;

