import React from 'react';
import Card from './Card';
import { parseMessage,connectToSocket } from './utils';
import { checkForAdminChange } from './utils';
import ToggleScoresButton from './ToggleScoresButton';

class CardSet extends React.Component {

  constructor(props) {
    super(props);
    let data = this.props.myUser;
    this.state = {
      players: [data],
      showScores: 0
    }
  }

  componentDidMount() {
    const socket = connectToSocket(); 
    const myUser = this.props.myUser;
    socket.onmessage = (event) => {
      const newPlayerAction = JSON.parse(event.data);
      this.setState((prevState) => {
        const currentPlayers = prevState.players;
        const players = parseMessage(currentPlayers, newPlayerAction, myUser);
        if (players == 'show-all-scores'){
          return { showScores: 1 }
        } else {
          return { players }
        }
      })
    };
  }

  handleToggleScore = (s) => {
    const socket = connectToSocket();
    const myUser = this.props.myUser;
    let payLoad;
    if (s){
      payLoad = 'show-all-scores'
    } else {
      payLoad = 'reset-all-scores'
    }
    socket.onopen = function (event) {
      socket.send(
        JSON.stringify(
            { ...myUser, type: payLoad }
          )
        )
    };
  }

  render() {
    const players = this.state.players;
    let adminButton;
    if (this.props.myUser.admin){
      adminButton = <ToggleScoresButton onToggleScore={this.handleToggleScore}/>;
    };
      
    return (
      <div id="CardsRow" className="center-col background-eee marg-bottom-20">
        {adminButton}
        <div className="cardsrow">
          {players.map(
            (card, i) =>
              <Card 
                key={card.name}
                id={card.id}
                name={card.name}
                avatar={card.avatar}
                score={card.score}
                showScore={this.state.showScores}
                />
          )}
        </div>
      </div>
    )
  }
}

export default CardSet;

