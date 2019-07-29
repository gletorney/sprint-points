import React from 'react';

class Chat extends React.Component {

  componentDidMount(){
    //set maxHeight
    let chatHeight = document.getElementById('Chat').offsetHeight - 100 + 'px';
    document.getElementById('ChatMessageContainer').style.maxHeight = chatHeight;

    let oldChat = window.localStorage.getItem('chat'+window.team);
    document.getElementById('ChatMessageContainer').innerHTML = oldChat;
  }

  handleFirstClick = (e) => {
    document.getElementById('ChatInput').placeholder = 'Press Enter to send';
  }
  
  weChat = (e) => {
    let myUser = window.myUser;
    let newMessageText = document.getElementById('ChatInput').value;
    var cleanText = newMessageText.replace(/(<([^>]+)>)/ig,"").trim();
    if(cleanText.length && e.keyCode === 13 && !e.shiftKey){
      window.socket.send(
        JSON.stringify({ 
          ...myUser, type: 'chat', chatMessage: cleanText, team: window.team 
        })
      )
      document.getElementById('ChatInput').placeholder = 'Sent!';
      document.getElementById('ChatInput').value = '';
      document.getElementById('ChatInput').style.height = null;
    } else if (e.shiftKey){
      let text = document.getElementById('ChatInput');
      text.style.height = 'auto';
      text.style.height = text.scrollHeight+'px';
    }
  }

  render() {
    return (
      <div id="Chat" className="right-col">
        <div id="ChatMessageContainer">
          
        </div>
        <textarea placeholder="Message the group" id="ChatInput" onClick={this.handleFirstClick} onKeyUp={this.weChat}></textarea>
        
      </div>
    )
  }
}

export default Chat;