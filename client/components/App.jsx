import React from 'react';
import Chatroom from './Chatroom.jsx';
import Login from './Login.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    // if (this.state.isLoggedIn) {
      return <Chatroom />;
    // } else {
      // return <Login isLoggedIn={this.state.isLoggedIn}/>;
    }
  // }
}

export default App;