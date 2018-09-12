import React from 'react';
import Message from './Message.jsx';
import styles from './Messages.css';

const Messages = (props) => (
  <main className={styles.messages}>
    <div className={styles.container}>
      {props.messages.map((message, i) => 
        <Message message={message} key={i} />
      )}
    </div>
  </main>
)

export default Messages;
