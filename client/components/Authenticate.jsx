import React from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasProfile: true,
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleClick() {
    this.setState({
      hasProfile: false
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      username: this.state.username,
      password: this.state.password
    }).then(user => {
      if (user) {
        this.props.toggleStatus();
      }
    }).catch(err => {
      console.log('error logging in', err);
    })
  }

  handleSignup(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      username: this.state.username,
      password: this.state.password
    }).then(() => {
      this.setState({
        hasProfile: true
      })
    }).catch(err => {
      console.log('error signing up', err);
    })
  }

  render() {
    if (this.state.hasProfile) {
      return (
        <Login handleClick={this.handleClick} handleChange={this.handleChange} handleLogin={this.handleLogin} />
      )
    } else {
      return (
        <Signup handleChange={this.handleChange} handleSignup={this.handleSignup} />
      )
    }
  }
};

export default Authenticate;