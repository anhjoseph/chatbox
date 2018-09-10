import socketIOClient from 'socket.io-client';
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
    socket.on('user connected', (user) => {
      const index = context.state.users.indexOf(user);
      if (index === -1) {
        context.setState({
          users: [...context.state.users, user].sort()
        });
      }
    })
  },

  listenUserDisconnect: function(context) {
    socket.on('user disconnected', (user) => {
      let users = [...context.state.users];
      const index = users.indexOf(user);
      if (index !== -1) {
        users.splice(index, 1);
        context.setState({
          users: users
        });
      }
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
