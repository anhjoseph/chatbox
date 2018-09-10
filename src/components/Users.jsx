import React from 'react';
import styles from './Users.css';

const Users = (props) => (
  <div className={styles.users}>
    <div className={styles.header}>
      Members
    </div>
    {props.users.map(user => 
      <div className={styles.user} key={user}>{user}</div>
    )}
  </div>
)

export default Users;
