import socketIOClient from 'socket.io-client';
import update from 'immutability-helper';

const socket = socketIOClient();

const socketService = {
  emitUserConnect(username) {
    socket.emit('user connected', username);
  },

  emitUserDisconnect(username) {
    socket.emit('user disconnected', username);
  },

  emitChannel(channel) {
    socket.emit('channel', channel);
  },

  emitMessage(channel, msgObj) {
    socket.emit('message', {
      channel,
      username: msgObj.username,
      text: msgObj.text,
      timestamp: new Date().toLocaleString(),
    });
  },

  joinChannel(context, channel) {
    context.setState({
      channel,
    });
    socket.emit('join', channel);
  },

  listenUserConnect(context) {
    socket.on('user connected', username => {
      let newUsers;
      const usernames = context.state.users.map(user => user.username);
      const index = usernames.indexOf(username);
      if (index !== -1) {
        newUsers = update(context.state.users, {
          [index]: { status: { $set: true } },
        });
      } else {
        newUsers = [{ username, status: false }, ...context.state.users];
      }
      newUsers.sort((a, b) => {
        if (a.status < b.status) {
          return 1;
        }
        if (a.status > b.status) {
          return -1;
        }
        if (a.username < b.username) {
          return -1;
        }
        return 1;
      });
      context.setState({
        users: newUsers,
      });
    });
  },

  listenUserDisconnect(context) {
    socket.on('user disconnected', username => {
      const usernames = context.state.users.map(user => user.username);
      const index = usernames.indexOf(username);
      const newUsers = update(context.state.users, {
        [index]: { status: { $set: false } },
      });
      newUsers.sort((a, b) => {
        if (a.status < b.status) {
          return 1;
        }
        if (a.status > b.status) {
          return -1;
        }
        if (a.username < b.username) {
          return -1;
        }
        return 1;
      });
      context.setState({
        users: newUsers,
      });
    });
  },

  listenMessage(context) {
    socket.on('message', msg => {
      context.setState({
        messages: [...context.state.messages, msg],
      });
    });
  },

  listenChannel(context) {
    socket.on('channel', channel => {
      const { channels } = context.state;
      channels.push(channel);
      const newChannels = channels.slice(1);
      newChannels.sort();
      context.setState({
        channels: ['default', ...newChannels],
      });
    });
  },
};

export default socketService;
