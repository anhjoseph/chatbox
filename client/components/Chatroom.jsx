import React from 'react';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import socketIOClient from 'socket.io-client';

class Chatroom extends React.Component {
  constructor() {
    super();

    const socket = socketIOClient('http://localhost:3000');
    socket.on('send', (msg) => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    });

    this.state = {
      messages: []
    };

    this.fetchMessages = this.fetchMessages.bind(this);
  };

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    //grab messages from database
  }

  render() {
    return (
      <div>
        <Messages messages={this.state.messages} />
        <Chatbox />
      </div>
    )
  }
};

export default Chatroom;