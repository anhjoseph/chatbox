import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import Chatroom from './Chatroom.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const App = () => {
  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute exact path="/" component={Chatroom} />
    </div>
  )
}

export default App;
