import React from 'react';

const Signup = (props) => (
  <div>
    <form onSubmit={props.handleSignup}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" onChange={props.handleChange}/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={props.handleChange}/>
      </div>
      <div>
        <input type="submit" value="Sign Up"/>
      </div>
    </form>
  </div>
);

export default Signup;