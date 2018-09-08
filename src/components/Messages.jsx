import React from 'react';
import Message from './Message.jsx';
import styles from './Messages.css';

const Messages = (props) => (
  <div className={styles.messages}>
    {props.messages.map((message, i) => 
      <Message message={message} key={i} />
    )}
  </div>
)

export default Messages;
