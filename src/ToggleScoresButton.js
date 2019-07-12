import React from 'react';

class ToggleScoresButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleScores: 0
    }
  }
  
  toggleScores = () => {
    let score = this.state.toggleScores ? 0 : 1;
    this.setState({ 
      toggleScores: score      
    });
    this.props.onToggleScore(score);
  }

  render() {
    return (
      <div className="pad-10 border-bottom-1-ccc background-eee">
        Admin: 
        {this.state.toggleScores ? (
          <span onClick={this.toggleScores} className="pad-left-5 color-red float-right bold cursor-pointer display-inline-block">
           Reset play
          </span>
        ) : (
          <span onClick={this.toggleScores} className="pad-left-5 color-blue bold cursor-pointer display-inline-block">
           Show scores
          </span>
        )}
      </div>
    )
  }
}

export default ToggleScoresButton;