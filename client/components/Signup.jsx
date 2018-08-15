import React from 'react';

const Signup = () => (
  <div>
    <form action="/signup" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username"/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password"/>
      </div>
      <div>
        <input type="submit" value="Sign Up"/>
      </div>
    </form>
  </div>
);

export default Signup;