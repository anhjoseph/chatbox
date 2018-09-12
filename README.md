# Real-time Chatroom
A node.js real-time chat application powered by Socket.io and Express

* Front-end Framework: **React**, **React-router**
* Back-end: **Node.js**, **Express.js**, **Socket.io**
* Database: **PostgreSQL**
* Bundle: **Webpack**, **Babel**

## How To Use
```bash
# Clone this repository
$ git clone https://github.com/anhjoseph/real-time-chat.git

# Go into the repository
$ cd real-time-chat

# Install dependencies
$ npm install

# Compile, bundle the app
$ npm run build

# Run the app
$ npm start
```

## Features
* Signup and Login authentication with JWT and bcrypt
* JWT-protected API routes
* Send messages to users in a channel
* Display messages pertaining to current channel
* Display list of users and their current online status
* Create, join, and leave channels
* Persist messages, channels, and users in DB
