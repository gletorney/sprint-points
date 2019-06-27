import React from 'react';
import Card from './Card';
import { parseMessage } from './utils';

class CardSet extends React.Component {

  constructor(props) {
    super(props);
    let data = this.props.myUser;
    this.state = {
      players: [data]
    }
    console.log('constructor - this.state.players=',this.state.players);
  }

  componentDidMount() {
    const socket = this.props.socket;
    const myUser = this.props.myUser;
    socket.onmessage = (event) => {
      const newPlayerAction = JSON.parse(event.data);
      this.setState((prevState) => {
        const currentPlayers = prevState.players;
        const players = parseMessage(currentPlayers, newPlayerAction, myUser);
        console.log('setState players', players)
        return {
          players
        }
      })
    };
  }

  render() {
    const players = this.state.players;
    
    return (
      <div id="CardsRow" className="cardsrow center-col background-eee marg-bottom-20">
        {players.map(
          (card, i) =>
            <Card 
              key={card.name}
              id={card.id}
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

