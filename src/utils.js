const HEARTBEAT_INTERVAL = 5000;

export function fetchMyUser(){
  let userId = window.localStorage.getItem('id') || ''; 
  let myName = window.localStorage.getItem('name') || ''; 
  let myAvatar = window.localStorage.getItem('avatar') || ''; 
  let admin = window.localStorage.getItem('admin') || ''; 
  let hideCard = window.localStorage.getItem('hideCard') || ''; 
  const myUser = {
    id: userId,
    name: myName,
    avatar: myAvatar,
    admin: admin,
    hideCard: hideCard
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

const myHeartBeat = heartBeat();

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

  myHeartBeat();

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
    case 'user-leaves':
      if (newPlayerAction.id === myUser.id){
        let modal = document.getElementsByClassName("modal");
        modal.style.display = 'none';
      }
      players = removePlayers(currentState, newPlayerAction);
      break;
    case 'vote':
      case 'hide-card':
      case 'show-card':
          players = updatePlayers(currentState, newPlayerAction);
      break;
    case 'claim-admin':
      players = updatePlayers(currentState, { admin: false });
      players = updatePlayers(currentState, newPlayerAction);
      break;  
    case 'show-all-scores':
      players = 'show-all-scores';
      lockButtonState();
      checkForMatchingScores(currentState);
      break;
    case 'reset-all-scores':
      players = updatePlayers(currentState, { score: false });
      players = updatePlayers(currentState, newPlayerAction);
      players = 'reset-all-scores-ready';
      resetButtonState();
      break;
    case 'chat':
      players = updatePlayers(currentState, newPlayerAction); //maintain current player status
      let message = newPlayerAction.chatMessage;
      let name = newPlayerAction.name;
      handleChatMessage(name, message);
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

function handleChatMessage(name, message){
  if (message.includes('###')){
    if(message.includes('reload')){
      window.location.reload();
    }
  } else {
    let CurrentChatContents = document.getElementById('ChatMessageContainer').innerHTML;
    let nameTag = "<u>" + name + "</u>: ";
    let newMessage = "<div class='new-message'>" + nameTag + message + "</div>";
    let newChatBoard = CurrentChatContents + newMessage;
    document.getElementById('ChatMessageContainer').innerHTML = newChatBoard;
    let newChatHeight = document.getElementById('ChatMessageContainer');
    newChatHeight.scrollTop = newChatHeight.scrollHeight;

    let chatStorageName = 'chat' + window.team;
    window.localStorage.setItem(chatStorageName, newChatBoard); 
  }
};

export function resetButtonState(){
  let buttons = document.getElementsByName('score');
  buttons.forEach(
    function(button) {
      button.removeAttribute('style');
      button.removeAttribute('disabled');
      let buttonH = button.dataset.height;
      button.style.height = buttonH;
    }
  )
  let cardsRow = document.getElementById('CardsRow');
  cardsRow.removeAttribute('style');
};

export function lockButtonState(){
  let buttons = document.getElementsByName('score');
  buttons.forEach(
    function(button) {
      button.setAttribute('disabled',true);
    }
  )
};

function heartBeat() {
  let intervalId;
  // let lastDate;
  return function() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      // const now = new Date().valueOf();
      // const dateDiff = lastDate ? now - lastDate : 'first';
      // lastDate = now;
      // console.log('heartBeat', dateDiff);
      window.socket.send('');
    }, HEARTBEAT_INTERVAL);
  }
}

function checkForMatchingScores(players) {
  let allScores = [];
  players.forEach(function(player) {
    if ( (player.hideCard !== 1) && (player.score > 0) ){
      allScores.push(player.score);
    }
  });
  let equal = allScores.every( (val, i, arr) => val === arr[0] );
  if (equal){
    var myArray = [
      "https://media.giphy.com/media/d2ZhT90gIXiiaoq4/giphy.gif",
      "https://media.giphy.com/media/109Ku3hdapZJle/giphy.gif",
      "https://media.giphy.com/media/8eLojIl6PCYmY/giphy.gif",
      "https://media.giphy.com/media/PD6f60SPwIDYs/giphy.gif",
      "https://media.giphy.com/media/3o7WILU5d8p9xY8KFW/giphy.gif",
      "https://media.giphy.com/media/l0Ex4roNL7aUFsgRW/giphy.gif"
    ];
    let randImgSrc = myArray[Math.floor(Math.random()*myArray.length)];
    let cardsRow = document.getElementById('CardsRow');
    cardsRow.style.backgroundImage = "url(" + randImgSrc + ")";
  }
}

