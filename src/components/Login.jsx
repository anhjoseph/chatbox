import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Authenticate from '../services/authenticateService';
import Socket from '../services/socketService';
 
class Login extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      username: this.state.username,
      password: this.state.password
    }).then(({ data }) => {
      if (data.token) {
        Authenticate.setToken(data.token);
        Socket.emitUser(this.state.username);
        this.props.history.push('/');
      }
    }).catch(err => {
      console.log('error logging in', err);
    });
  }

  handleClick() {
    this.props.history.push('/signup');
  }

  render() {
    return Authenticate.isAuthenticated() ? (
      <Redirect to="/" />
    ) : (
      <div>
        <form onSubmit={this.handleLogin}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" onChange={this.handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={this.handleChange} />
          </div>
          <div>
            <input type="submit" value="Log In" />
          </div>
        </form>

        <div>
          <button onClick={this.handleClick}>Sign Up</button>
        </div>
      </div>
    )
  }
}

export default Login;
