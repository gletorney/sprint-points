export function fetchMyUser(){
  let userId = window.localStorage.getItem('id'); 
  let myName = window.localStorage.getItem('name'); 
  let myColor = window.localStorage.getItem('color'); 
  if (myName){
    const myUser = {
      userId: userId,
      name: myName,
      color: myColor
    }
    return myUser
  } 
}

export function setupBoard(){
  var winH = window.innerHeight;
  var margins = 20;
  var board = document.querySelector('.app-board');
  board.style.height = (winH - margins) + 'px';
}
