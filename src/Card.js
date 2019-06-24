import React from 'react';

class Card extends React.Component {
  render() {
    const {name, avatar, score} = this.props;
    return (
      <div key="{name}" className='card background-fff'>
        {this.props.voting ? (
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

