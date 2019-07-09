import React from 'react';
import VotingButton from './VotingButton';

class VotingPanel extends React.Component { 

  render() {
    const myUser = this.props.myUser;
    const buttonList = [1,2,3,5,8,13];

    return (
      <div className="right-col">
        <div className="bold font-1-3 pad-20 border-bottom-1-ccc">
          Vote
        </div>
        <div className="pad-20 pos-relative vote-panel">          
          {buttonList.map(
            (score, i) =>
              <VotingButton 
                key={score}
                score={score}
                myUser={myUser} />
          )}
        </div>
      </div>
    )
  }
}

export default VotingPanel;

