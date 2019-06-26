import React from 'react';
import Card from './Card';

class CardSet extends React.Component {

  constructor(props) {
    super(props);
    let data = this.props.myUser;
    this.state = {
      play: [data]
    }
  } 

  componentDidMount() {
    const socket = this.props.socket;
    socket.onmessage = function(event) {
      const data = event.data;
      this.setState = {
        play: [data]
      }
    };
    
  }

  render() {
    const data = this.state.play;

    // test array:
    // let team = [
    //   {'id' : 2, 'name': 'Groot', 'avatar': 'icofont-bat', 'score': 8 },
    //   {'id' : 3, 'name': 'Star-lord','avatar': 'icofont-pineapple','score': 2},
    //   {'id' : 4, 'name': 'Gamora','avatar': 'icofont-butterfly','score': 5}
    // ]
  
    console.log('team=',team)
    console.log('data=',data)
    
    return (
      <div id="CardsRow" className="cardsrow center-col background-eee marg-bottom-20">
        {data.map(
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

