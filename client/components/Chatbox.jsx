import React from 'react';

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  };

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handlePost() {
    const socketIO = socketIOClient('http://localhost:3000');
    socketIO.emit('send', this.state.message);
    console.log('submitted post');
  }

  render() {
    return (
      <div>
        <form>
          <input onChange={this.handleChange}/>
          <button onSubmit={this.handlePost}>Send</button>
        </form>
      </div>
    )
  }
};

export default Chatbox;