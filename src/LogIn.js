import React, { Component } from 'react';
import SelectIcon from './SelectIcon';
import { relative } from 'path';

class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      avatar: ''
    };
  }
  
  handleNameInput = (e) => {
    let inputVal = e.target.value;
    let userId = new Date().getTime(); 
    this.setState({
      id: userId,
      name: inputVal
    });
  }

  handleAvatarInput = (e) => {
    let inputVal = e.target.value;
    this.setState({
      avatar: inputVal
    });
  }

  createUser = () => {
    let userId = this.state.id;
    let userName = this.state.name;
    let userAvatar = this.state.avatar;
    if (userName.length < 1){
      let elem = document.querySelector("input[type='text']");
      elem.style.borderLeft = '6px solid red';
      elem.style.avatar = 'red';
    }
    this.props.onAddUser(userId, userName, userAvatar);
    window.localStorage.setItem('id', userId); 
    window.localStorage.setItem('name', userName); 
    window.localStorage.setItem('avatar', userAvatar); 
  }

  showSelectIcon = () => {
    let iconsElem = document.querySelector("#SelectIcon");
    let formElem = document.querySelector("#JoinTeam");
    iconsElem.classList.add("show");
    formElem.style.display = 'none';
  }

  render() {
    var team = decodeURIComponent(window.location.hash);
    var team = team.replace('#','');

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
          <input type="text" placeholder="Your name" onChange={this.handleNameInput} className="display-block"></input>
          <input id="AvatarClass" type="hidden" value="icofont-pizza-slice" placeholder="avatar code (#111)" onChange={this.handleAvatarInput} className="display-block marg-top-10"></input>
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