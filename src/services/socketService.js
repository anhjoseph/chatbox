import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:3000');

const socketService = {
  emitUserConnect: function(username) {
    socket.emit('user connected', username);
  },

  emitUserDisconnect: function(username) {
    socket.emit('user disconnected', username)
  },
  
  emitChannel: function(channel) {
    socket.emit('channel', {
      channel: channel
    });
  },
  
  emitMessage: function(msgObj) {
    socket.emit('message', {
      username: msgObj.username,
      text: msgObj.text,
      timestamp: new Date().toLocaleString()
    });
  },
  
  listenUserConnect: function(context) {
    socket.on('user connected', (user) => {
      const index = context.state.users.indexOf(user);
      if (index === -1) {
        context.setState({
          users: [...context.state.users, user]
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
        channels: [...context.state.channels, channel]
      });
    });
  }
};

export default socketService;
