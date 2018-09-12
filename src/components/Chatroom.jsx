import React, { Component } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import Channels from './Channels.jsx';
import Users from './Users.jsx';
import Authenticate from '../services/authenticateService';
import socket from '../services/socketService';
import styles from './Chatroom.css';

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      channels: ['default'],
      channel: 'default',
      messages: []
    };

    this.config = {
      headers: {
        Authorization: 'Bearer ' + Authenticate.getToken()
      }
    };

    this.listeners = this.listeners.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchChannels = this.fetchChannels.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  };

  componentDidMount() {
    socket.emitUserConnect(Authenticate.getUser());
    this.fetchUsers();
    this.fetchChannels();
    this.fetchMessages('default');
    this.listeners();
  }

  listeners() {
    socket.listenUserConnect(this);
    socket.listenUserDisconnect(this);
    socket.listenChannel(this);
    socket.listenMessage(this);
  }
  
  fetchUsers() {
    axios.get('/api/users', this.config).then(({ data }) => {
      data.sort(function(a, b) {
        if (a.status < b.status) {
          return -1;
        } else if (a.status > b.status) {
          return 1;
        } else if (a.username < b.username) {
          return -1;
        } else if (a.username > b.username) {
          return 1;
        }
      });
      this.setState({
        users: data
      })
    }).catch(err => {
      console.log('error fetching users', err);
    })
  }

  fetchChannels() {
    axios.get('/api/channels', this.config).then(({ data }) => {
      let channels = data.sort();
      this.setState({
        channels: channels
      });
    }).catch(err => {
      console.log('error fetching channels', err);
    })
  }

  fetchMessages(channel) {
    axios.get('/api/messages', { params: {
      'channel': channel
    }, headers: {
      'Authorization': 'Bearer ' + Authenticate.getToken()
    }}).then(({ data }) => {
      this.setState({
        messages: data
      })
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  }
  
  handleClick(channel) {
    socket.joinChannel(this, channel);
    this.fetchMessages(channel);
  }

  handleLogout() {
    socket.emitUserDisconnect(Authenticate.getUser());
    Authenticate.removeToken();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className={styles.chatroom}>
        <div className={styles.title}>
          {this.state.channel}
        </div>
        <div className={styles.logout}>
          <button className={styles.button} onClick={this.handleLogout}>Log Out</button>
        </div>
        <Channels channels={this.state.channels} channel={this.state.channel} handleClick={this.handleClick} />
        <Messages messages={this.state.messages} />
        <Users users={this.state.users} />
        <Chatbox channel={this.state.channel} />
      </div>
    )
  }
};

export default Chatroom;
