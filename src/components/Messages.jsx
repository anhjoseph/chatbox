import React from 'react';
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

export default Messages;
