import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:3000');

const socketService = {
  emitUser: function(username) {
    socket.emit('user', {
      username: username
    });
  },
  
  emitChannel: function(channel) {
    socket.emit('channel', {
      channel: channel
    });
  },
  
  emitMessage: function(msg) {
    socket.emit('message', {
      text: msg,
      timestamp: new Date().toLocaleString()
    });
  },
  
  listenUser: function(context) {
    socket.on('user', (user) => {
      context.setState({
        users: [...context.state.users, user]
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
        channels: [...context.state.channels, channel]
      });
    });
  }
};

export default socketService;
