import React from 'react';
import styles from './Users.css';

const Users = (props) => (
  <div className={styles.users}>
    {props.users.map(user => 
      <div key={user}>{user}</div>
    )}
  </div>
)

export default Users;
