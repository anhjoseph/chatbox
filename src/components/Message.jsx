import React from 'react';

const Message = (props) => (
  <div>
    <div>
      {props.message.timestamp}
    </div>
    <div>
      {props.message.text}
    </div>
  </div>
);

export default Message;