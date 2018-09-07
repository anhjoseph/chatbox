import React, { Component } from 'react';
import socket from '../services/socketService';
import Authenticate from '../services/authenticateService';

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
    e.preventDefault();
    e.target.reset();
    socket.emitMessage({
      username: Authenticate.getUser(),
      text: this.state.message
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
