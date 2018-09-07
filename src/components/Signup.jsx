import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Authenticate from '../services/authenticateService';

class Signup extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSignup(e) {
    e.preventDefault();
    axios.post('/auth/signup', {
      username: this.state.username,
      password: this.state.password
    }).then(() => {
      this.props.history.push('/login');
    }).catch(err => {
      console.log('error signing up', err);
    });
  }

  render() {
    return Authenticate.isAuthenticated() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <form onSubmit={this.handleSignup}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" onChange={this.handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    )
  }
};

export default Signup;
