import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Chatroom from './Chatroom.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Authenticate from '../services/authenticateService';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Route exact path="/" 
          render={props =>
            Authenticate.isLoggedIn() ? (
              <Chatroom {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </div>
    )
  }
};

export default App;
