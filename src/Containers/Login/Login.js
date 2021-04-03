import React, { useState, useEffect } from 'react';
import './Login.css';
import { Button, TextField } from '@material-ui/core';
import { fetchCurrentUser, signIn } from '../../firebase';

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await fetchCurrentUser();
      console.log(currentUser);
      setUser(currentUser);
    }
    fetchData();
  }, [email]);

  const handleLogin = async () => {
    console.log('email:', email);
    console.log('password:', password)
    await signIn(email, password);
  }

  return (
    <div className='login-page'>
      <div className='login-card'>
        <h3>Masuk ke PasarKerja</h3>
        <div className="form-item">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth="true"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div className="form-item">
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth="true"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div className="form-item" onClick={() => handleLogin()}>
          <div className="login-btn">
            Masuk
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;