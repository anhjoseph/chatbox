import React from 'react';
import axios from 'axios';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: this.props.channels
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      channelname: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/channels', {
      channelname: this.state.channelname
    })
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
          <select>
            {this.state.channels.map((channel) => {
              <option>{channel}</option>
            })}
          </select>
        </div>
      </div>
    )
  }
}

export default Channels;