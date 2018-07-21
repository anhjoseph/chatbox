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
  
  componentDidMount() {
    const messageServer = new WebSocket('ws://localhost:3000');
  }

  handleChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handlePost() {
    messageServer.send(this.state.message);
  }

  render() {
    return (
      <div>
        <form>
          <input onChange={this.handleChange}/>
          <button onSubmit={this.handlePost}></button>
        </form>
      </div>
    )
  }
};

export default Chatbox;