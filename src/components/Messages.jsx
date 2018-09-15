import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import styles from './Messages.css';

const Messages = ({ messages }) => (
  <main className={styles.messages}>
    <div className={styles.container}>
      {messages.map((message, i) => (
        <Message message={message} key={i} />
      ))}
    </div>
  </main>
);

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ).isRequired,
};

export default Messages;
