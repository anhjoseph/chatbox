import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import axios from 'axios';
import Messages from './Messages';
import Chatbox from './Chatbox';
import Channels from './Channels';
import Users from './Users';
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
      messages: [],
    };

    this.config = {
      headers: {
        Authorization: `Bearer ${Authenticate.getToken()}`,
      },
    };

    this.listeners = this.listeners.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchChannels = this.fetchChannels.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

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
      data.sort((a, b) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        if (a.username < b.username) {
          return -1;
        }
        return 1;
      });
      this.setState({
        users: data,
      });
    });
  }

  fetchChannels() {
    axios.get('/api/channels', this.config).then(({ data }) => {
      const index = data.indexOf('default');
      data.splice(index, 1);
      const channels = data.sort();
      channels.unshift('default');
      this.setState({
        channels,
      });
    });
  }

  fetchMessages(channel) {
    axios
      .get('/api/messages', {
        params: {
          channel,
        },
        headers: {
          Authorization: `Bearer ${Authenticate.getToken()}`,
        },
      })
      .then(({ data }) => {
        this.setState({
          messages: data,
        });
      });
  }

  handleClick(channel) {
    socket.joinChannel(this, channel);
    this.fetchMessages(channel);
  }

  handleLogout() {
    const { history } = this.props;
    socket.emitUserDisconnect(Authenticate.getUser());
    Authenticate.removeToken();
    history.push('/login');
  }

  render() {
    const { users, channels, channel, messages } = this.state;
    return (
      <div className={styles.chatroom}>
        <div className={styles.title}>{channel}</div>
        <div className={styles.logout}>
          <button
            className={styles.button}
            type="button"
            onClick={this.handleLogout}
          >
            Log Out
          </button>
        </div>
        <Channels
          channels={channels}
          channel={channel}
          handleClick={this.handleClick}
        />
        <Messages messages={messages} />
        <Users users={users} />
        <Chatbox channel={channel} />
      </div>
    );
  }
}

Chatroom.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Chatroom;
