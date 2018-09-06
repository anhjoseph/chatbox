import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasProfile: true,
      username: '',
      password: ''
    };
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      username: this.state.username,
      password: this.state.password
    }).then(() => {
      this.setState({
        hasProfile: true
      });
    }).catch(err => {
      console.log('error signing up', err);
    });
  }

  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
};

export default Authenticate;
