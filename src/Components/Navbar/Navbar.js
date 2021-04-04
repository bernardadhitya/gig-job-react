import React from 'react';
import './Navbar.css';
import logo from '../../Assets/images/logo.png'
import { Grid } from '@material-ui/core';

const Navbar = () => {
  
  return (
    <div class="navbar-wrapper">
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <img src={logo} alt='logo'/>
        </Grid>
        <Grid item lg={7} md={6} sm={5} xs={4}></Grid>
        <Grid item lg={4} md={5} sm={6} xs={7}>
          <div className='navbar-menu'>
            <a className='item'>
              <h5>Status Pekerjaan</h5>
            </a>
            <a className='item'>
              <h5>Pesanan Pekerjaan</h5>
            </a>
            <a className='item'>
              <h5>Chat</h5>
            </a>
            <a className='item'>
              <h5>Profil</h5>
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navbar;