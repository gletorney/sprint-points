export function fetchMyUser(){
  let userId = window.localStorage.getItem('id') || ''; 
  let myName = window.localStorage.getItem('name') || ''; 
  let myAvatar = window.localStorage.getItem('avatar') || ''; 
  const myUser = {
    id: userId,
    name: myName,
    avatar: myAvatar,
  };
  return myUser
};

export function connectToSocket(){
  if (window.location.hash){
    let socket = new WebSocket('wss://sp-websocket.herokuapp.com', window.location.hash);
    return socket;
  }
};

export function parseMessage(currentState, newPlayerAction, myUser){
  const type = newPlayerAction.type;
  const id = newPlayerAction.id;
  const score = newPlayerAction.score;
  const admin = newPlayerAction.admin;
  const socket = new WebSocket('wss://sp-websocket.herokuapp.com', window.location.hash);
  
  let players = currentState;
  switch (type) {
    case 'hello-user':
      if (id !== myUser.id){
          socket.onopen = function (event) {
            socket.send(
              JSON.stringify(
                  { ...myUser, type: 'hello-user-response' }
                )
              )
          };
        }
      break;
    case 'hello-user-response':
        players = updatePlayers(currentState, newPlayerAction);
        break;
    case 'vote':
      players = updatePlayers(currentState, newPlayerAction);
      console.log('Incoming Vote', score)
      break;
    case 'claim-admin':
        players = updatePlayers(currentState, { admin: false });
        players = updatePlayers(currentState, newPlayerAction);
        console.log('Incoming Admin', admin)
      break;
    default:
      players = [myUser];
  }
  return players;
}

function updatePlayers(currentPlayers, newPlayerData) {
  const srcClone = currentPlayers.slice();   // clone original source array
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
  
  return srcClone;
}
