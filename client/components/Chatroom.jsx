import React from 'react';
import Chatbox from './Chatbox.jsx';

class Chatroom extends React.Component {
  constructor() {
    super();
    this.state = {};
  };

  render() {
    return (
      <Chatbox />
    )
  }
};

export default Chatroom;