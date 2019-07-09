import React from 'react';
import App from './App';
import Connecting from './Connecting';
import { connectToSocket } from './utils';

class Init extends React.Component {
  constructor(props) {
    super(props);
    let newDate = new Date()
    this.state = {
      refresh: newDate,
      status: ''
    };
    window.socket = connectToSocket();
    window.team = window.location.hash;
  }

  handleRefresh = () =>{
    // console.log('HandleRefresh')
    if (this.state.status !== 1){
      let status = window.socket.readyState;
      let newDate = new Date();
      this.setState({ 
        refresh: newDate,
        status: status
      });
      console.log('Refreshing, status = ', status)
    }
  }
  
  render() {
    if (window.socket && window.team){
      if (window.socket.readyState === 1) {
        return <App />;
      } else {
        return <Connecting onRefresh={this.handleRefresh} />;
      }
    } else if (!window.team){
      return <App />;
    } else {
      return <Connecting onRefresh={this.handleRefresh} />;
    }
  }
}

export default Init;