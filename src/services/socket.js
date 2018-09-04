import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const emitUser = (username) => {
  socket.emit('user', {
    username: username
  });
};

const emitChannel = (channel) => {
  socket.emit('channel', {
    channel: channel
  });
};

const emitMessage = (msg) => {
  socket.emit('message', {
    text: msg,
    timestamp: new Date().toLocaleString()
  });
};

const listenUser = (context) => {
  socket.on('user', (user) => {
    context.setState({
      users: [...context.state.users, user]
    });
  })
};

const listenMessage = (context) => {
  socket.on('message', (msg) => {
    context.setState({
      messages: [...context.state.messages, msg]
    });
  });
};

const listenChannel = (context) => {
  socket.on('channel', (channel) => {
    context.setState({
      channels: [...context.state.channels, channel]
    });
  });
};

module.exports = {
  emitUser: emitUser,
  emitChannel: emitChannel,
  emitMessage: emitMessage,
  listenUser: listenUser,
  listenChannel: listenChannel,
  listenMessage: listenMessage
};
