import React from 'react';
import Message from './Message.jsx';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div>
        {this.props.messages.map((message, i) => 
          <Message message={message} key={i} />
        )}
      </div>
    )
  }
}

export default Messages;