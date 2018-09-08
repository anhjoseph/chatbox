import React from 'react';
import styles from './Message.css';

const Message = (props) => (
  <div>
    <div className={styles.heading}>
      <span className={styles.username}>{props.message.username}</span><span className={styles.time}>{props.message.timestamp}</span>
    </div>
    <div className={styles.text}>
      {props.message.text}
    </div>
  </div>
);

export default Message;
