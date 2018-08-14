import React from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class Authorize extends React.Component() {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false
    }
  }

  render() {
    if (this.state.newUser) {
      return <Signup newUser={this.state.newUser}/>;
    } else {
      return <Login isLoggedIn={this.props.isLoggedIn}/>;
    }
  }
}

export default Authorize;