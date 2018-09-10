import React, { Component } from 'react';
import socket from '../services/socketService';
import Authenticate from '../services/authenticateService';
import styles from './Chatbox.css';

class Chatbox extends Component {
  constructor(props) {
    super(props);
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
    socket.emitMessage(this.props.channel, {
      username: Authenticate.getUser(),
      text: this.state.message
    });
  }

  render() {
    return (
      <div className={styles.chatbox}>
        <form className={styles.form} onSubmit={this.handlePost}>
          <input type="text" placeholder="Type your message here" className={styles.input} onChange={this.handleChange} />
        </form>
      </div>
    )
  }
};

export default Chatbox;
