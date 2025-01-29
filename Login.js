import React, { useState } from 'react';
const Login = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Please enter your name.');
      return;
    }
    onLogin(name);
  };

  return (
    <div>
      <h1>Welcome to Letter Lasso!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p1>
          Enter your name:
          </p1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default Login;
