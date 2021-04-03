import React from 'react';
import './Navbar.css';
import logo from '../../Assets/images/logo.png'
import { Grid } from '@material-ui/core';

const Navbar = () => {
  
  return (
    <div class="navbar-wrapper">
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <img src={logo} alt='logo'/>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={1}>
          <a href="#intro-header" class="scrollactive-item">Intro</a>
        </Grid>
        <Grid item xs={1}>
          <a href="#intro-header" class="scrollactive-item">Intro</a>
        </Grid>
        <Grid item xs={1}>
          <a href="#intro-header" class="scrollactive-item">Intro</a>
        </Grid>
        <Grid item xs={1}>
          <a href="#intro-header" class="scrollactive-item">Intro</a>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navbar;