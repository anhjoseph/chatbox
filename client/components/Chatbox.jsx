import React from 'react';
import socketIOClient from 'socket.io-client';

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  };

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handlePost(e) {
    e.preventDefault();
    const socket = socketIOClient('http://localhost:3000');
    socket.emit('send', this.state.message);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handlePost}>
          <input onChange={this.handleChange}/>
          <button>Send</button>
        </form>
      </div>
    )
  }
};

export default Chatbox;