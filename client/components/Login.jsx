import React from 'react';
import Signup from './Signup.jsx';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasProfile: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  };

  handleClick() {
    this.setState({
      hasProfile: false
    });
  };

  handleSignup() {
    axios.post('/auth/signup', {
      username: this.state.username,
      password: this.state.password
    }).done(() => {
      this.setState({
        hasProfile: true
      })
    });
  };

  render() {
    if (this.state.hasProfile) {
      return (
        <div>
          <form onSubmit={this.props.handleLogin}>
            <div>
              <label>Username:</label>
              <input type="text" name="username"/>
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" onChange={this.props.handleChange}/>
            </div>
            <div>
              <input type="submit" value="Log In" onChange={this.props.handleChange}/>
            </div>
          </form>

          <button onClick={this.handleClick}>
            Sign Up
          </button>
        </div>
      )
    } else {
      return (
        <Signup handleSignup={this.handleSignup}/>
      )
    }
  }
}

export default Login;