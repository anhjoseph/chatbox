import React from 'react';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: this.props.channels
    }
  }

  createChannel() {
    
  }

  render() {
    return (
      <div>
        <select>
          <option></option>
        </select>
      </div>
    )
  }
}

export default Channels;