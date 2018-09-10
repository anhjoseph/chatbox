import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Authenticate from '../services/authenticateService';
import styles from './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
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
      <div className={styles.signup}>
        <div className={styles.title}>
          Sign in to your account
        </div>
        <form onSubmit={this.handleSignup}>
          <div className={styles.info}>
            <input className={styles.input} type="text" placeholder="username" name="username" onChange={this.handleChange} />
          </div>
          <div className={styles.info}>
            <input className={styles.input} type="password" placeholder="password" name="password" onChange={this.handleChange} />
          </div>
          <div>
            <input className={styles.button} type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    )
  }
};

export default Signup;
