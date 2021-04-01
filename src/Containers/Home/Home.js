import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchPlaylists, fetchUser } from '../../Service';
import './Home.css';
import spotipuLogo from '../../Assets/spotipu-logo.png';

const Home = () => {
  let history = useHistory();
  const [user, setUser] = useState(undefined);
  const [playlists, setPlaylists] = useState([]);

  console.log(user);

  useEffect(() => {
    (async () => {
      try {
        const fetchedUser = await fetchUser();
        const fetchedPlaylists = await fetchPlaylists();
        setUser(fetchedUser);
        setPlaylists(fetchedPlaylists);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])

  const handlePlaylist = (playlist) => {
    const {
      id: playlistId,
      name,
      image,
      owner: {
        id: ownerId,
        display_name: ownerName
      }
    } = playlist;
    history.push({
      pathname: '/playlist',
      state: { playlist: { playlistId, name, image, ownerName, ownerId } }
    })
  }

  const handleLogin = async () => {
    var win = window.open('http://localhost:8888/login', '_self');
    win.focus();
  }

  const renderPlaylistCards = () => {
    return playlists.length > 0 ? playlists.map(playlist => {
      const { name, image, owner: { display_name: ownerName } } = playlist;
      return (
        <>
          <Grid item
            xs={12} sm={6} lg={4}
          >
            <div className='playlist-card-wrapper' onClick={() => handlePlaylist(playlist)}>
              <img src={image} alt={name} height={100}/>
              <div style={{width: '30px'}}></div>
              <div>
                <p style={{marginBottom: 0}}>{name}</p>
                <p style={{marginTop: 0, color: '#1db954'}}>{ownerName}</p>
              </div>
            </div>
          </Grid>
        </>
      );
    }) : (
      <h3>No data available</h3>
    )
  }

  return user ? (
    <div className='home-page'>
      <div style={{width: '100%'}}>
        <div style={{padding: 30}}>
          <img src={spotipuLogo} alt='logo' width={200}/>
          <h1 style={{
            fontSize: 54,
            marginBottom: 0
          }}>
            {`Hello, ${!!user ? user.display_name : ''}`}
          </h1>
          <p style={{marginTop: 8}}>{`${!!user ? user.email : ''}`}</p>
          <h2 style={{color: '#1db954', marginTop: 24}}>Your Playlist</h2>
        </div>
        <div style={{paddingRight: 30, paddingLeft: 30}}>
          <Grid container spacing={2}>
            { renderPlaylistCards() }
          </Grid>
        </div>
      </div>
    </div>
  ) : (
    <div className='no-data-page'>
      <div>
        <img src={spotipuLogo} alt='logo' width='200px'/>
        <h1>You have not logged in</h1>
        <p>Please try logging in</p>
        <div className='login-btn' onClick={() => handleLogin()}>
          <h3>Login</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;