import React from 'react';
import VotingButton from './VotingButton';

class VotingPanel extends React.Component { 

  componentDidMount(){
    this.sizeButtons();
  }

  componentDidUpdate(){
    this.sizeButtons();
  }

  sizeButtons = () => {
    let rowH = document.getElementById("CardsRow").clientHeight;
    let buttonH = rowH / 7;
    let buttons = document.getElementsByName('score');
    buttons.forEach(
      function(button) {
        button.style.height = buttonH + 'px';
        button.dataset.height = buttonH + 'px'; //save the height for toggling style
      }
    )
    let chatElem = document.getElementById("ChatInput");
    if (chatElem){
      chatElem.style.height = buttonH - 10 + 'px';
    }
  }

  render() {
    const myUser = this.props.myUser;
    const buttonList = [1,2,3,5,8,13,'—'];

    return (
      <div id="VotingPanel" className="right-col">
        <div className="pos-relative vote-panel">          
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

