import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import styles from './Messages.css';

const Messages = ({ messages }) => (
  <main className={styles.messages}>
    <div className={styles.container}>
      {messages.map(message => (
        <Message message={message} key={message.username + message.timestamp} />
      ))}
    </div>
  </main>
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Messages;
