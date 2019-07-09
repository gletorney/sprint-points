import React from 'react';
import SelectIcon from './SelectIcon';

class LogIn extends React.Component {

  createUser = () => {
    let nameValue = document.getElementById('NameInput').value;
    let avatarValue = document.getElementById('AvatarInput').value;
    let userId = new Date().getTime(); 

    if (nameValue.length < 1){
      let elem = document.querySelector("#NameInput");
      elem.style.borderLeft = '6px solid red';
      elem.style.color = 'red';
    } else {
      window.localStorage.setItem('id', userId); 
      window.localStorage.setItem('name', nameValue); 
      window.localStorage.setItem('avatar', avatarValue); 
  
      this.props.onAddUser(userId, nameValue, avatarValue);
    }

  }

  showSelectIcon = () => {
    let iconsElem = document.querySelector("#SelectIcon");
    let formElem = document.querySelector("#JoinTeam");
    iconsElem.classList.add("show");
    formElem.style.display = 'none';
  }

  render() {
    var team = decodeURIComponent(window.location.hash).replace('#','');

    return (
      <div className="overlay">
        <div id="JoinTeam" className="modal">
          <div className="mono-titles pad-bottom-20 pad-top-20">
            Join team:
            <div className="pad-top-5">
              {team}
            </div>
            &mdash;
          </div>
          <input id="NameInput" type="text" placeholder="Your name" className="display-block"></input>
          <input id="AvatarInput" type="hidden" value="icofont-pizza-slice" placeholder="avatar code (#111)" className="display-block marg-top-10"></input>
          <div className="pad-top-10 cursor-pointer line-height1-4" onClick={this.showSelectIcon}>
            <span className="font-1-6 pad-10 border-1-ccc display-inline-block rnd-button marg-top-5">
              <i id="IconPreview" className="icofont-pizza-slice"></i>
            </span>
            <span className="display-inline-block color-blue font-0-8 bold pad-left-10">Select Avatar</span>
          </div>
          <div className="pad-top-30 pad-bottom-10">
            <span onClick={this.createUser} className="button block text-center">Let's play</span>
          </div>
        </div>
        <div id="SelectIcon" className="modal large-modal">
          <SelectIcon />
        </div>
      </div>
    )
  }
}

export default LogIn;