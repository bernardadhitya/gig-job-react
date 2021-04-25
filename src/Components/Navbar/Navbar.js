import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './Navbar.css';
import logo from '../../Assets/images/logo.png'
import { Grid } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();
  const location = useLocation();

  const currentRole = location.pathname.split('/')[1];
  
  const handleClick = (nav) => {
    const businessRoutes = {
      home: '/business',
      orders: '/business/pesanan',
      chat: '/business/chat',
      profile: '/business/profil'
    }
    const serviceRoutes = {
      home: '/service',
      orders: '/service/pesanan',
      chat: '/service/chat',
      profile: '/service/profil'
    }

    if (currentRole === 'business'){
      history.push(businessRoutes[nav]);
    } else {
      history.push(serviceRoutes[nav]);
    }
  }

  const handleRedirectProfile = (option) => {
    const routes = {
      switch: currentRole === 'business' ? '/service' : '/business'
    }
    history.push(routes[option]);
  }

  const renderNavbarMenu = () => {
    return (
      <div className='navbar-menu'>
        <div className='item' onClick={() => handleClick('home')}>
          <h5>{currentRole === 'business' ? 'Pekerjaan' : 'Status Pekerjaan'}</h5>
        </div>
        <div className='item' onClick={() => handleClick('orders')}>
          <h5>Pesanan Pekerjaan</h5>
        </div>
        <div className='item' onClick={() => handleClick('chat')}>
          <h5>Chat</h5>
        </div>
        <div>
          <div
            className='item'
            onClick={handleProfileClick}
          >
            <h5>Profil</h5>
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={() => handleRedirectProfile('switch')}>
              <ListItemText
                primary={currentRole === 'business' ? "Jadi Pekerja" : 'Cari Pekerja'}
              />
              <ListItemIcon/>
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleRedirectProfile('setting')}>
              <ListItemText primary="Pengaturan" />
              <ListItemIcon/>
            </StyledMenuItem>
            <StyledMenuItem onClick={() => handleRedirectProfile('logout')}>
              <ListItemText primary="Keluar" />
              <ListItemIcon/>
            </StyledMenuItem>
          </StyledMenu>
        </div>
      </div>
    )
  }

  return (
    <div class="navbar-wrapper">
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <img src={logo} alt='logo'/>
        </Grid>
        <Grid item lg={7} md={6} sm={5} xs={4}></Grid>
        <Grid item lg={4} md={5} sm={6} xs={7}>
          {renderNavbarMenu()}
        </Grid>
      </Grid>
    </div>
  )
}

export default Navbar;