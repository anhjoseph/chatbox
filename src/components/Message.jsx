import React from 'react';
import Linkify from 'react-linkify';
import styles from './Message.css';

const Message = (props) => (
  <div className={styles.message}>
    <div className={styles.heading}>
      <span className={styles.username}>{props.message.username}</span><span className={styles.time}>{props.message.timestamp}</span>
    </div>
    <div className={styles.text}>
      <Linkify>{props.message.text}</Linkify>
    </div>
  </div>
);

export default Message;
