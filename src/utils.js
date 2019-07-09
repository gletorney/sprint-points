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

  const socket = new WebSocket('wss://sp-websocket.herokuapp.com', window.location.hash);

  const type = newPlayerAction.type;
  const id = newPlayerAction.id;
  let players = currentState;

  console.log('Ping Type = ',type)
  console.log('myUser = ',myUser)
  console.log('newPlayerAction = ',newPlayerAction)
  console.log('currentState = ',currentState)
  
  switch (type) {
    case 'hello-user':
      if (id !== myUser.id){
        console.log('test')
        players = updatePlayers(currentState, newPlayerAction);
        socket.onopen = function (event) {
          socket.send(
            JSON.stringify(
                { ...myUser, type: 'hello-user-response' }
              )
            )
        };
      } else {
        players = [myUser];
      }
      break;
    case 'hello-user-response':
        if (currentState.id){
          players = updatePlayers(currentState, newPlayerAction);
        } else {
          players = updatePlayers([myUser], newPlayerAction);
        }
      break;
    case 'logout-user':
      players = removePlayers(currentState, newPlayerAction);
      break;
    case 'vote':
      players = updatePlayers(currentState, newPlayerAction);
      break;
    case 'claim-admin':
      players = updatePlayers(currentState, { admin: false });
      players = updatePlayers(currentState, newPlayerAction);
      break;  
    case 'show-all-scores':
      players = 'show-all-scores';
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
    console.log('Players=', players)
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

function removePlayers(currentPlayers, newPlayerData) {
  const srcClone = currentPlayers.slice();   // clone original source array
  const deleteId = newPlayerData.id;
  const deletedClone = delete srcClone[deleteId];
  console.log('deletedClone==',deletedClone);
  return deletedClone;
}

export function checkForAdminChange(myId, players){
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
    }
  )
};
