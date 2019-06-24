import React from 'react';
import Card from './Card';

class CardSet extends React.Component {
  render() {
    const { team } = this.props;
    return (
      <div id="CardsRow" className="cardsrow center-col background-eee marg-bottom-20">
        {team.map(
          (card, i) =>
            <Card 
              key={card.id}
              name={card.name}
              avatar={card.avatar}
              score={card.score}
              voting={this.props.voting}
              />
        )}
      </div>
    )
  }
}

export default CardSet;

