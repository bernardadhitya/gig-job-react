import React, { useState, useEffect } from 'react';
import { fetchPlaylistTrack, deleteTrack, fetchUser } from '../../Service';
import { Backdrop, Fade, Grid, Modal } from '@material-ui/core';
import './Playlist.css';
import spotipuLogo from '../../Assets/spotipu-logo.png';
import { DeleteOutline } from '@material-ui/icons';

const Playlist = (props) => {
  const { location: { state: { playlist } } } = props;
  const { playlistId, name, image, ownerName, ownerId } = playlist;
  const [tracks, setTracks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const fetchedPlaylistTrack = await fetchPlaylistTrack(playlistId);
        const fetchedUser = await fetchUser();
        setTracks(fetchedPlaylistTrack);
        setUser(fetchedUser);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [refresh]);

  const renderTrackCard = (id, name, images, artist, uri) => {
    const { id: userId } = user;
    console.log(images);
    return ownerId === userId ? (
      <Grid item
        xs={12} sm={6} lg={4}
      >
        <div className='track-card-wrapper'>
          <img src={images.length > 0 ? images[0].url : image} alt={name} height={100}/>
          <div style={{width: '30px'}}></div>
          <div style={{marginRight: 'auto'}}>
            <p style={{marginBottom: 0}}>{name}</p>
            <p style={{marginTop: 0, color: '#1db954'}}>{artist}</p>
          </div>
          <div
            className='delete-btn'
            style={{marginRight: 10}}
            onClick={() => handleOpenModal(id, uri)}
          >
            <DeleteOutline />
          </div>
        </div>
      </Grid>
    ) : (
      <Grid item
        xs={12} sm={6} lg={4}
      >
        <div className='track-card-wrapper'>
          <img src={images.length > 0 ? images[0].url : image} alt={name} height={100}/>
          <div style={{width: '30px'}}></div>
          <div>
            <p style={{marginBottom: 0}}>{name}</p>
            <p style={{marginTop: 0, color: '#1db954'}}>{artist}</p>
          </div>
        </div>
      </Grid>
    );
  }

  const renderTrackList = () => {
    return tracks.map(track => {
      const { id, name, album: { images }, artists, uri } = track;
      const artist = artists[0].name || '';
      return renderTrackCard(id, name, images, artist, uri)
    })
  }

  const handleLogin = async () => {
    var win = window.open('http://localhost:8888/login', '_self');
    win.focus();
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleOpenModal = (trackId, uri) => {
    setSelectedTrack({id: trackId, uri});
    setOpenModal(true);
  }

  const handleDeleteTrack = async () => {
    const { uri } = selectedTrack
    await deleteTrack(playlistId, uri);
    setOpenModal(false);
    setRefresh(refresh + 1);
  }

  return user ? (
    <div className='home-page'>
      <div style={{width: '100%'}}>
        <div style={{padding: 30}}>
          <img src={spotipuLogo} alt='logo' width={200}/>
          <div style={{height: 30}}></div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <img src={image} alt='logo' width={200}/>
            </Grid>
            <Grid item xs={12} md={10}>
              <h1 style={{
                fontSize: 54,
                marginBottom: 0
              }}>
                {name}
              </h1>
              <p style={{marginTop: 8}}>{ownerName}</p>
            </Grid>
          </Grid>
          <h2 style={{color: '#1db954', marginTop: 24}}>Songs in this Playlist</h2>
        </div>
        <div style={{paddingRight: 30, paddingLeft: 30}}>
          <Grid container spacing={2}>
            {renderTrackList()}
          </Grid>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className='modal'
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className='paper' style={{padding: 20}}>
            <h2 id="transition-modal-title">Delete Track</h2>
            <p id="transition-modal-description">
              Are you sure you want to delete this track from playlist?
            </p>
            <div style={{height: 10}}></div>
            <div className='confirm-delete-btn' onClick={() => handleDeleteTrack()}>
              <h4>Yes, continue</h4>
            </div>
          </div>
        </Fade>
      </Modal>
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
  )
}

export default Playlist;