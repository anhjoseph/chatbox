import React from 'react';
import Message from './Message.jsx';

const Messages = (props) => (
  <div>
    {props.messages.map((message, i) => 
      <Message message={message} key={i} />
    )}
  </div>
)

export default Messages;