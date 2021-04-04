import React from 'react';
import './Navbar.css';
import logo from '../../Assets/images/logo.png'
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();
  
  const handleClick = (nav) => {
    const routes = {
      home: '/business',
      orders: '/business/pesanan',
      chat: '/business/chat',
      profile: '/business/profil'
    }
    history.push(routes[nav]);
  }

  return (
    <div class="navbar-wrapper">
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <img src={logo} alt='logo'/>
        </Grid>
        <Grid item lg={7} md={6} sm={5} xs={4}></Grid>
        <Grid item lg={4} md={5} sm={6} xs={7}>
          <div className='navbar-menu'>
            <div className='item' onClick={() => handleClick('home')}>
              <h5>Pekerjaan</h5>
            </div>
            <div className='item' onClick={() => handleClick('orders')}>
              <h5>Pesanan Pekerjaan</h5>
            </div>
            <div className='item' onClick={() => handleClick('chat')}>
              <h5>Chat</h5>
            </div>
            <div className='item' onClick={() => handleClick('profile')}>
              <h5>Profil</h5>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navbar;