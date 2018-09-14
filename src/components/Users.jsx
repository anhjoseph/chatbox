import React from 'react';
import User from './User';
import styles from './Users.css';

const Users = ({ users }) => (
  <div className={styles.users}>
    <div className={styles.header}>Members</div>
    {users.map(user => (
      <User user={user} key={user.username} />
    ))}
  </div>
);

export default Users;
