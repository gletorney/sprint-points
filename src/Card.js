import React from 'react';

class Card extends React.Component {
  render() {
    const {id, name, avatar, score, showScores} = this.props;
    return (
      <div key={name} id={id} className='card background-fff'>
        {showScores ? (
          <div className='card-score height-100'>{score}</div>
        ) : (
          <div className={score ? 'card-avatar color-red' : 'card-avatar'}><i className={avatar}></i></div>
        )}
        <div className='card-name'>{name}</div>
      </div> 
    )
  }
}
export default Card;

