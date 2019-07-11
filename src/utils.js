export function fetchMyUser(){
  let userId = window.localStorage.getItem('id') || ''; 
  let myName = window.localStorage.getItem('name') || ''; 
  let myAvatar = window.localStorage.getItem('avatar') || ''; 
  let admin = window.localStorage.getItem('admin') || ''; 
  const myUser = {
    id: userId,
    name: myName,
    avatar: myAvatar,
    admin: admin
  };
  window.myUser = myUser;
  return myUser
};

export function connectToSocket(){
  if (window.location.hash){
    let socket = new WebSocket('wss://sp-websocket.herokuapp.com', [window.location.hash]);
    return socket;
  } 
};

export function parseMessage(currentState, newPlayerAction){

  const type = newPlayerAction.type;
  const id = newPlayerAction.id;
  const myUser = window.myUser;
  let players = currentState;

  console.log('Ping type = ',type)

  // console.log('Players=', players)
  // console.log('id = ',newPlayerAction.id)
  // console.log('myUser = ',myUser)
  // console.log('newPlayerAction = ',newPlayerAction)
  // console.log('currentState = ',currentState)
  // console.log('myUser = ',myUser)
  // console.log('newPlayerAction = ',newPlayerAction)
  // console.log('currentState = ',currentState)
  
  switch (type) {
    case 'hello-user':
      if (myUser.id && (id !== myUser.id)){
        players = updatePlayers(currentState, newPlayerAction);
        window.socket.send(
          JSON.stringify(
              { ...myUser, type: 'hello-response', team: window.team }
            )
          )
      } else {
        players = [myUser];
      }
      break;
    case 'hello-response':
        players = updatePlayers(currentState, newPlayerAction);
        let checkPlayers = players[0];
        if (!checkPlayers.name){
          players = [myUser];
        }
        break;
    case 'logout-user':
      players = removePlayers(currentState, newPlayerAction);
      break;
    case 'vote':
    case 'hide-card':
      players = updatePlayers(currentState, newPlayerAction);
      break;
    case 'claim-admin':
      players = updatePlayers(currentState, { admin: false });
      players = updatePlayers(currentState, newPlayerAction);
      break;  
    case 'show-all-scores':
      players = 'show-all-scores';
      lockButtonState();
      break;
    case 'reset-all-scores':
      players = updatePlayers(currentState, { score: false });
      players = updatePlayers(currentState, newPlayerAction);
      players = 'reset-all-scores-ready';
      resetButtonState();
      break;
    default:
      players = [myUser];
    }
    return players;
}

function updatePlayers(currentPlayers, newPlayerData) {
  const srcClone = currentPlayers.slice();   // clone original source array
  if (srcClone[0].id){
    if (newPlayerData.id) {
      const existingPlayer = srcClone.find(el => el.id === newPlayerData.id);  // find an existing player in the set
      if (existingPlayer){
        Object.assign(existingPlayer, newPlayerData);
      } else {
        srcClone.push(newPlayerData);
      }
    } else {
      srcClone.forEach(player => Object.assign(player, newPlayerData)); // utility functions for all players
    }
  }
  return srcClone;
}

function removePlayers(currentPlayers, deletedPlayer) {
  const srcClone = currentPlayers.slice();   // clone original source array
  srcClone.forEach(function(thisPlayer, i){
    if (thisPlayer.id === deletedPlayer.id){
      srcClone.splice(i, 1);
    }
  });
  return srcClone;
}

export function checkAdminChange(myId, players){
  let match;
  players.forEach(function(player){
    if (player.admin && player.id === myId){
      match = 1;
    }
  });
  return match;
};

export function resetButtonState(){
  let buttons = document.getElementsByName('score');
  buttons.forEach(
    function(button) {
      button.removeAttribute('style');
      button.removeAttribute('disabled');
    }
  )
};

export function lockButtonState(){
  let buttons = document.getElementsByName('score');
  buttons.forEach(
    function(button) {
      button.setAttribute('disabled',true);
    }
  )
};
