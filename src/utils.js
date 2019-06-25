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
}

export function connectToSocket(team){
  if (team){
    let socket = new WebSocket('wss://sp-websocket.herokuapp.com', team);
    return socket;
  }
}