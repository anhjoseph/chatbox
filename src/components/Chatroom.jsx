import React, { Component } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import Channels from './Channels.jsx';
import Users from './users.jsx';
import authService from '../services/authenticateService';
import socketService from '../services/socketService';

class Chatroom extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      channels: [],
      messages: []
    };

    this.config = {
      headers: {
        Authorization: 'Bearer ' + authService.getToken()
      }
    };

    socketService.listenUser(this);
    socketService.listenChannel(this);
    socketService.listenMessage(this);

    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchChannels = this.fetchChannels.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
  };

  componentDidMount() {
    this.fetchUsers();
    this.fetchChannels();
    this.fetchMessages();
  }

  fetchUsers() {
    axios.get('/api/users', this.config).then(({ data }) => {
      this.setState({
        users: data
      })
    }).catch(err => {
      console.log('error fetching users', err);
    })
  }

  fetchChannels() {
    axios.get('/api/channels', this.config).then(({ data }) => {
      this.setState({
        channels: data
      })
    }).catch(err => {
      console.log('error fetching channels', err);
    })
  }

  fetchMessages() {
    axios.get('/api/messages', this.config).then(({ data }) => {
      this.setState({
        messages: data
      })
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  }

  render() {
    return (
      <div>
        <div>
          CHATROOM
        </div>
        <Users users={this.state.users} />
        <Channels channels={this.state.channels} />
        <Messages messages={this.state.messages} />
        <Chatbox />
      </div>
    )
  }
};

export default Chatroom;
