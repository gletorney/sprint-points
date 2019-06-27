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
  const socket = new WebSocket('wss://sp-websocket.herokuapp.com', window.location.hash);
  
  console.log('>>>>>>>>>>> type:', type);

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
        players = mergeArray(currentState, newPlayerAction);
        break;

    case 'vote':
      let score = newPlayerAction.score;

      players = currentState;    
      break;
    default:
      players = [myUser];
  }
  return players;
}

function mergeArray(src, newPlayerAction) {
  const srcClone = src.slice();   // clone original source array
  const found = srcClone.find(el => el.id === newPlayerAction.id);
  console.log('>>>>>>>>>>> srcClone:', srcClone);
  console.log('>>>>>>>>>>> found:', found);
  if (found){
    Object.assign(found, newPlayerAction);
  } else {
    srcClone.push(newPlayerAction);
  }
  return srcClone;
}