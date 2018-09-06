import React, { Component } from 'react';
import Chatroom from './Chatroom.jsx';
import Login from './Login.jsx';
import Authenticate from '../services/authenticateService';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  render() {
    return (
      Authenticate.isLoggedIn() ? <Chatroom /> : <Login />
    ) 
  }
};

export default App;
