import React, { Component } from 'react';
import axios from 'axios';
import { listenUser, listenChannel, listenMessage } from '../services/socket';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import Channels from './Channels.jsx';
import Users from './users.jsx';

class Chatroom extends Component {
  constructor() {
    super();

    listenUser(this);
    listenChannel(this);
    listenMessage(this);

    this.state = {
      users: [],
      channels: [],
      messages: []
    };
  };

  componentDidMount() {
    this.fetchUsers();
    this.fetchChannels();
    this.fetchMessages();
  }

  fetchUsers() {
    axios.get('/api/users').then(({ data }) => {
      this.setState({
        users: data
      })
    }).catch(err => {
      console.log('error fetching users', err);
    })
  }

  fetchChannels() {
    axios.get('/api/channels').then(({ data }) => {
      this.setState({
        channels: data
      })
    }).catch(err => {
      console.log('error fetching channels', err);
    })
  }

  fetchMessages() {
    axios.get('/api/messages').then(({ data }) => {
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
