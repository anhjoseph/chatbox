import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:3000');

const emitUser = (username) => {
  socket.emit('user', {
    username: username
  });
};

const emitChannel = () => {

};

const emitMessage = (e, msg) => {
  e.preventDefault();
  e.target.reset();
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

const listenChannel = () => {

};

module.exports = {
  emitUser: emitUser,
  emitMessage: emitMessage,
  listenUser: listenUser,
  listenMessage: listenMessage
};
