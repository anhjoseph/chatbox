import React, { Component } from 'react';
import socket from '../services/socketService';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      channelName: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    socket.emitChannel(this.state.channelName);
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} />
            <button>Create Channel</button>
          </form>
        </div>
        <div>
          <form>
            <select name="channels">
              {this.props.channels.map(({ channel }) =>
                <option key={channel} value={channel}>{channel}</option>
              )}
            </select>
          </form>
        </div>
      </div>
    )
  }
}

export default Channels;
