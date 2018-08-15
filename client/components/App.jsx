import React from 'react';
import Chatroom from './Chatroom.jsx';
import Login from './Login.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin() {
    axios.post('/auth/login', {
      username: this.state.username,
      password: this.state.password,
    }).done(({ user }) => {
      if (user) {
        this.setState({
          isLoggedIn: true
        })
      }
    }).catch(err => {
      console.log('error logging in', err);
    })
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Chatroom />;
    } else {
      return <Login handleLogin={this.handleLogin} handleChange={this.handleChange} />;
    }
  }
}

export default App;