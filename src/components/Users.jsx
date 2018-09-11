import React from 'react';
import User from './User.jsx';
import styles from './Users.css';

const Users = (props) => (
  <div className={styles.users}>
    <div className={styles.header}>
      Members
    </div>
    {props.users.map(user => 
      <User user={user} key={user.username} />
    )}
  </div>
)

export default Users;
