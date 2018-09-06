import React from 'react';

const Users = (props) => (
  <div>
    {props.users.map(({ username }) => 
      <div key={username}>{username}</div>
    )}
  </div>
)

export default Users;
