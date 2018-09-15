import React from 'react';
import PropTypes from 'prop-types';
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

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  ).isRequired,
};

export default Users;
