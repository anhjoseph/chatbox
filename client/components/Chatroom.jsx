import React from 'react';
import Display from './Display.jsx';
import Chatbox from './Chatbox.jsx';

class Chatroom extends React.Component {
  constructor() {
    super();
    this.state = {};
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Display />
        <Chatbox />
      </div>
    )
  }
};

export default Chatroom;