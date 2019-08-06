import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Chatroom from './Chatroom';
import Login from './Login';
import Signup from './Signup';

const App = () => (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <PrivateRoute exact path="/" component={Chatroom} />
  </div>
);

export default App;
