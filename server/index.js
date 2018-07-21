const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(port, () => {
  console.log(`server running at ${port}`);
});