import React from 'react';

const Login = (props) => (
  <div>
    <form onSubmit={props.handleLogin}>
      <div>
        <label>Username:</label>
        <input type="text" name="username"/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={props.handleChange}/>
      </div>
      <div>
        <input type="submit" value="Log In" onChange={props.handleChange}/>
      </div>
    </form>

    <button>
      Sign Up
    </button>
  </div>
)

export default Login;