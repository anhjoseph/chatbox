import React from 'react';
import Chatroom from './Chatroom.jsx';
import Login from './Login.jsx';

const App = (props) => {
  if (props.isLoggedIn) {
    return <Chatroom />;
  } else {
    return <Login />;
  }
}

export default App;