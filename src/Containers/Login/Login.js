import React, { useState } from 'react';
import './Login.css';
import { Grid, TextField } from '@material-ui/core';
import { signIn } from '../../firebase';
import { useHistory } from "react-router-dom"
import { fetchCurrentUser } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mode, setMode] = useState('login');

  const history = useHistory();

  const handleLogin = async () => {
    await signIn(email, password);
    const user = await fetchCurrentUser();

    if (user) {
      history.push('/business');
    } else {
      window.alert('Wrong email/password. Please try again');
    }
  }

  return (
    <div className='login-page'>
      <div className='login-card'>
        <h3>Masuk ke PasarKerja</h3>
        {
          mode === 'register' &&
          <div className="form-item">
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  id="first-name"
                  label="Nama Depan"
                  variant="outlined"
                  fullWidth="true"
                  value={firstName}
                  onChange={(e) => {setFirstName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="last-name"
                  label="Nama Belakang"
                  variant="outlined"
                  fullWidth="true"
                  value={lastName}
                  onChange={(e) => {setLastName(e.target.value)}}
                />
              </Grid>
            </Grid>
          </div>
        }
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
            { mode === 'login' ? 'Masuk' : 'Daftar'}
          </div>
        </div>
        { mode === 'login' ?
          <p>
            Belum punya akun? <span
              onClick={() => setMode('register')}
              style={{color: '#3183CD', cursor: 'pointer'}}
            >
              Daftar
            </span>
          </p>
          :
          <p>
            Sudah punya akun? <span
              onClick={() => setMode('login')}
              style={{color: '#3183CD', cursor: 'pointer'}}
            >
              Login
            </span>
          </p>
        }
      </div>
    </div>
  )
};

export default Login;