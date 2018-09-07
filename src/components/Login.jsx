import React, { Component } from 'react';
import axios from 'axios';
import socketService from '../services/socketService';
 
class Login extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
        localStorage.setItem('token', data.token);
        socketService.emitUser(this.state.username);
      }
    }).catch(err => {
      console.log('error logging in', err);
    });
  }

  render() {
    return (
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
      </div>
    )
  }
}

export default Login;
