import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { channels, channel, handleClick } = this.props;
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
          {channels.map(channelName => (
            <div
              className={
                channel === channelName ? styles.currentChannel : styles.channel
              }
              key={channelName}
              onClick={() => handleClick(channelName)}
              onKeyPress={() => handleClick(channelName)}
              role="menuitem"
              tabIndex={0}
            >
              {channelName}
            </div>
          ))}
        </div>
      </aside>
    );
  }
}

Channels.propTypes = {
  channel: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Channels;
