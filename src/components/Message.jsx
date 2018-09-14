import React from 'react';
import Linkify from 'react-linkify';
import styles from './Message.css';

const Message = ({ message }) => (
  <div className={styles.message}>
    <div className={styles.heading}>
      <span className={styles.username}>{message.username}</span>
      <span className={styles.time}>{message.timestamp}</span>
    </div>
    <div className={styles.text}>
      <Linkify>{message.text}</Linkify>
    </div>
  </div>
);

export default Message;
