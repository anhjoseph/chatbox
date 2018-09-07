import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import Chatroom from './Chatroom.jsx';
import Login from './Login.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Chatroom} />
      </div>
    )
  }
};

export default App;
