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