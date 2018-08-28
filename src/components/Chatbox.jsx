import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class Chatbox extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handlePost(e) {
    const socket = socketIOClient('http://localhost:3000');
    e.preventDefault();
    e.target.reset();
    socket.emit('message', {
      text: this.state.message,
      timestamp: new Date().toLocaleString()
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlePost}>
          <input onChange={this.handleChange} />
          <button>Send</button>
        </form>
      </div>
    )
  }
};

export default Chatbox;
