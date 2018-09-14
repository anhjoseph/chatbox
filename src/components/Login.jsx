import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Authenticate from '../services/authenticateService';
import socket from '../services/socketService';
import styles from './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post('/auth/login', {
        username,
        password,
      })
      .then(({ data }) => {
        if (data.token) {
          Authenticate.setToken(data.token);
          socket.emitUserConnect(Authenticate.getUser());
          this.props.history.push('/');
        }
      });
  }

  handleClick() {
    this.props.history.push('/signup');
  }

  render() {
    return Authenticate.isAuthenticated() ? (
      <Redirect to="/" />
    ) : (
      <div className={styles.login}>
        <div className={styles.title}>Sign in to your account</div>
        <form onSubmit={this.handleLogin}>
          <div className={styles.info}>
            <input
              className={styles.input}
              type="text"
              placeholder="username"
              name="username"
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.info}>
            <input
              className={styles.input}
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.loginButton}>
            <input className={styles.button} type="submit" value="Sign In" />
          </div>
        </form>

        <div className={styles.register}>
          <button className={styles.button} onClick={this.handleClick}>
            Create an account
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
