import React, { Component } from 'react';
import socket from '../services/socketService';
import styles from './Channels.css';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      channelName: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    const { channelName } = this.state;
    socket.emitChannel(channelName);
  }

  render() {
    const { channel, channels, handleClick } = this.props;
    return (
      <aside className={styles.channels}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Channel name"
            maxLength="16"
            className={styles.input}
            onChange={this.handleChange}
          />
          <div>
            <button type="submit" className={styles.button}>
              Create Channel
            </button>
          </div>
        </form>
        <div className={styles.list}>
          {channels.map(el => (
            <div
              className={
                channel === el ? styles.currentChannel : styles.channel
              }
              key={channel}
              onClick={() => handleClick(channel)}
              onKeyPress={() => handleClick(channel)}
              role="menuitem"
              tabIndex={0}
            >
              {channel}
            </div>
          ))}
        </div>
      </aside>
    );
  }
}

export default Channels;
