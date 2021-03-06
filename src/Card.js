import React from 'react';

class Card extends React.Component {
  render() {
    const {id, name, avatar, score, showScores, hide} = this.props;
    let cardStyle;
    if (hide){
      cardStyle = {display: 'none'}
    }
    return (
      <div key={name} id={id} className='card background-fff' style={cardStyle}>
        {showScores ? (
          <div className='card-score'>{score}</div>
        ) : (
          <div className={score ? 'card-avatar color-red' : 'card-avatar'}><i className={avatar}></i></div>
        )}
        <div className='card-name'>{name}</div>
      </div> 
    )
  }
}
export default Card;

