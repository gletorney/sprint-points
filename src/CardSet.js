import React from 'react';
import Card from './Card';
import { fetchMyUser, parseMessage } from './utils';
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
    const socket = window.socket;     
    if (socket){
      socket.onmessage = (event) => {
        let myUser;
        myUser = this.props.myUser;
        if (!myUser.name){
          myUser = fetchMyUser();
        }
        const newPlayerAction = JSON.parse(event.data);
        this.setState((prevState) => {
          const currentPlayers = prevState.players;
          const players = parseMessage(currentPlayers, newPlayerAction, myUser);
          if (players === 'show-all-scores'){
            return { showScores: 1 }
          } else  if (players === 'reset-all-scores-ready'){
            return { showScores: 0 }
          } else {
            return{ players }
          }
        })
      };
    } 
  }

  handleToggleScore = (s) => {
    let payLoad;
    if (s){
      payLoad = 'show-all-scores'
    } else {
      payLoad = 'reset-all-scores'
    }
    window.socket.send(
      JSON.stringify({ type: payLoad })
      )
  }

  render() {
    const players = this.state.players;
    const showScores = this.state.showScores;

    let adminButton;
    if (this.props.myUser.admin){
      adminButton = <ToggleScoresButton onToggleScore={this.handleToggleScore}/>;
    };
      
    return (
      <div id="CardsRow" className="center-col background-eee marg-bottom-10">
        {adminButton}
        <div className="cardsrow">
          {players.map(
            (card, i) =>
              <Card 
                key={card.id}
                id={card.id}
                name={card.name}
                avatar={card.avatar}
                score={card.score}
                showScores={showScores}
                />
          )}
        </div>
      </div>
    )
  }
}

export default CardSet;

