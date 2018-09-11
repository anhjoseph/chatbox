import React from 'react';
import styles from './User.css';

const User = (props) => (
  <div className={styles.user}>
    <div className={styles.username}>{props.user.username}</div>
    <div className={props.user.status ? styles.online : styles.offline} />
  </div>
);

export default User;
