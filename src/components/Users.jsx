import React from 'react';

const Users = (props) => (
  <div>
    {props.users.map(user => 
      <div key={user}>{user}</div>
    )}
  </div>
)

export default Users;