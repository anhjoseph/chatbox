import React from 'react';
import PropTypes, { shape } from 'prop-types';
import styles from './User.css';

const User = ({ user }) => (
  <div className={styles.user}>
    <div className={styles.username}>{user.username}</div>
    <div className={user.status ? styles.online : styles.offline} />
  </div>
);

User.propTypes = {
  user: shape({
    username: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
  }).isRequired,
};

export default User;
