import React from 'react';

const Login = (props) => (
  <div>
    <form action="/login" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username"/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password"/>
      </div>
      <div>
        <input type="submit" value="Log In"/>
      </div>
    </form>
    <button onClick={}>
      Sign Up
    </button>
  </div>
)

export default Login;