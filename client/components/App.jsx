import React, { Component } from 'react';
import Chatroom from './Chatroom.jsx';
import Authenticate from './Authenticate.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  toggleStatus() {
    this.setState({
      isLoggedIn: true
    })
  }
 
  render() {
    if (this.state.isLoggedIn) {
      return <Chatroom />;
    } else {
      return <Authenticate toggleStatus={this.toggleStatus} />;
    }
  }
};

export default App;
