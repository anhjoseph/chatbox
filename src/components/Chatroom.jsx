import React, { Component } from 'react';
import axios from 'axios';
import { listenMessage, listenUser } from '../services/socket';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import Channels from './Channels.jsx';
import Users from './users.jsx';

class Chatroom extends Component {
  constructor() {
    super();

    listenMessage(this);
    listenUser(this);

    this.state = {
      messages: [],
      channels: [],
      users: []
    };
  };

  componentDidMount() {
    this.fetchMessages();
    this.fetchChannels();
    this.fetchUsers();
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

  fetchChannels() {
    axios.get('/api/channels').then(({ data }) => {
      this.setState({
        channels: data
      })
    }).catch(err => {
      console.log('error fetching channels', err);
    })
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
  
  render() {
    return (
      <div>
        <div>
          CHATROOM
        </div>
        <Channels channels={this.state.channels} />
        <Users users={this.state.users} />
        <Messages messages={this.state.messages} />
        <Chatbox />
      </div>
    )
  }
};

export default Chatroom;
