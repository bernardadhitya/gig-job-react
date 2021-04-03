import React, { useState } from 'react';
import './Login.css';
import { TextField } from '@material-ui/core';
import { signIn } from '../../firebase';
import { useHistory } from "react-router-dom"
import { fetchCurrentUser } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleLogin = async () => {
    console.log('email:', email);
    console.log('password:', password);
    await signIn(email, password);
    const user = await fetchCurrentUser();
    if (user) {
      history.push('/home');
    } else {
      window.alert('Wrong email/password. Please try again');
    }
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