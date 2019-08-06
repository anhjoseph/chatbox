import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
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
      [e.target.name]: e.target.value,
    });
  }

  handleSignup(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    axios
      .post('/auth/signup', {
        username,
        password,
      })
      .then(({ data }) => {
        if (data) {
          this.setState({
            error: data,
          });
        } else {
          history.push('/login');
        }
      });
  }

  render() {
    const { error } = this.state;
    return Authenticate.isAuthenticated() ? (
      <Redirect to="/" />
    ) : (
      <div className={styles.signup}>
        <div className={styles.title}>Sign in to your account</div>
        <form onSubmit={this.handleSignup}>
          <div className={styles.info}>
            <input
              className={styles.input}
              type="text"
              placeholder="username"
              name="username"
              maxLength="15"
              onChange={this.handleChange}
            />
            <div className={styles.error}>{error}</div>
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
          <div>
            <input className={styles.button} type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Signup;
