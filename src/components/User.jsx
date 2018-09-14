import React from 'react';
import styles from './User.css';

const User = ({ user }) => (
  <div className={styles.user}>
    <div className={styles.username}>{user.username}</div>
    <div className={user.status ? styles.online : styles.offline} />
  </div>
);

export default User;
