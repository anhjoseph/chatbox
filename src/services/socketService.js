import socketIOClient from 'socket.io-client';
import update from 'immutability-helper';
const socket = socketIOClient();

const socketService = {
  emitUserConnect: function(username) {
    socket.emit('user connected', username);
  },

  emitUserDisconnect: function(username) {
    socket.emit('user disconnected', username);
  },
  
  emitChannel: function(channel) {
    socket.emit('channel', channel);
  },
  
  emitMessage: function(channel, msgObj) {
    socket.emit('message', {
      channel: channel,
      username: msgObj.username,
      text: msgObj.text,
      timestamp: new Date().toLocaleString()
    });
  },

  joinChannel: function(context, channel) {
    context.setState({
      channel: channel
    });
    socket.emit('join', channel);
  },

  listenUserConnect: function(context) {
    socket.on('user connected', function(username) {
      let newUsers;
      let usernames = context.state.users.map(user => {
        return user.username;
      });
      let index = usernames.indexOf(username);
      if (index !== -1) {
        newUsers = update(context.state.users, {[index]: {status: {$set: true}}});
      } else {
        newUsers = [{ username: username, status: false }, ...context.state.users]
      }
      newUsers.sort(function(a, b) {
        if (a.status < b.status) {
          return 1;
        } else if (a.status > b.status) {
          return -1;
        } else if (a.username < b.username) {
          return -1;
        } else if (a.username > b.username) {
          return 1;
        }
      });
      context.setState({
        users: newUsers
      });
    })
  },

  listenUserDisconnect: function(context) {
    socket.on('user disconnected', function(username) {
      let usernames = context.state.users.map(user => {
        return user.username;
      });
      let index = usernames.indexOf(username);
      let newUsers = update(context.state.users, {[index]: {status: {$set: false}}});
      newUsers.sort(function(a, b) {
        if (a.status < b.status) {
          return 1;
        } else if (a.status > b.status) {
          return -1;
        } else if (a.username < b.username) {
          return -1;
        } else if (a.username > b.username) {
          return 1;
        }
      });
      context.setState({
        users: newUsers
      });
    })
  },
  
  listenMessage: function(context) {
    socket.on('message', (msg) => {
      context.setState({
        messages: [...context.state.messages, msg]
      });
    });
  },
  
  listenChannel: function(context) {
    socket.on('channel', (channel) => {
      context.setState({
        channels: [...context.state.channels, channel].sort()
      });
    });
  }
};

export default socketService;
