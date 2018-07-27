import React from 'react';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import socketIOClient from 'socket.io-client';

class Chatroom extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  };

  render() {
    const socketIO = socketIOClient('http://localhost:3000');
    socketIO.on('send', (msg) => {
      this.setState({
        messages: [...messages, msg]
      });
    })

    return (
      <div>
        <Messages messages={this.state.messages}/>
        <Chatbox socketIO={socketIO}/>
      </div>
    )
  }
};

export default Chatroom;