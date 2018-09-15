import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import styles from './Message.css';

const Message = ({ message }) => (
  <div className={styles.message}>
    <div className={styles.heading}>
      <span className={styles.username}>{message.username}</span>
      <span className={styles.time}>{message.timestamp}</span>
    </div>
    <div className={styles.text}>
      <Linkify>{message.text}</Linkify>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
};

export default Message;
