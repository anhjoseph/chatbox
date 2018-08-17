import React from 'react'; 
 
const Login = (props) => (
  <div>
    <form onSubmit={props.handleLogin}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" onChange={props.handleChange}/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={props.handleChange}/>
      </div>
      <div>
        <input type="submit" value="Log In"/>
      </div>
    </form>

    <button onClick={props.handleClick}>
      Sign Up
    </button>
  </div>
);

export default Login;