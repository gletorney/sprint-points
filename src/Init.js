import React from 'react';
import App from './App';
import Connecting from './Connecting';
import { connectToSocket } from './utils';

class Init extends React.Component {
  constructor(props) {
    super(props);
    let newDate = new Date()
    this.state = {
      refresh: newDate
    };
  }

  handleRefresh = () =>{
    let newDate = new Date()
    this.setState({ 
      refresh: newDate
    });
  }
  
  render() {
    const socket = connectToSocket();
    if (socket){
      if (socket.readyState > 1) {
        return <Connecting onRefresh={this.handleRefresh} />;
      } else {
        return <App onSocketClosed={this.handleRefresh} />;
      }
    } else {
      //setup new user
      return <App onSocketClosed={this.handleRefresh} />;
    }
  }
}

export default Init;