import React from 'react';

const Message = (props) => (
  <div>
    <div>
      <span>{props.message.username}</span><span>{props.message.timestamp}</span>
    </div>
    <div>
      {props.message.text}
    </div>
  </div>
);

export default Message;
