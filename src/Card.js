import React from 'react';

class Card extends React.Component {
  render() {
    const {id, name, avatar, score} = this.props;
    return (
      <div key={name} id={id} className='card background-fff'>
        {this.props.showScore ? (
          <div className='card-score height-100'>{score}</div>
        ) : (
          <div className='card-avatar'><i className={avatar}></i></div>
        )}
        <div className='card-name'>{name}</div>
      </div> 
    )
  }
}
export default Card;

