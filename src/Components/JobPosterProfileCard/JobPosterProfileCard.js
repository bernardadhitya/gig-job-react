import { Grid } from '@material-ui/core';
import React from 'react';
import './JobPosterProfileCard.css';

const JobPosterProfileCard = () => {
  
  return (
    <div className='job-poster-profile-card-wrapper'>
      <Grid container className='content-wrapper'>
        <Grid item xs={12}>
          <h2>Nama</h2>
        </Grid>
        <Grid item xs={12}>
          <h4>Tentang Pekerja</h4>
          <p>Et Lorem velit incididunt ut cupidatat fugiat tempor officia. Ad nulla mollit non ipsum nisi ea cillum est officia. Mollit excepteur laborum culpa amet. Cillum mollit dolor in deserunt ullamco labore.</p>
        </Grid>
        <Grid item xs={12}>
          <h4>Identitas & Kredensial</h4>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6} className='details-button'>
          <h4>Lihar Detail Pekerja</h4>
        </Grid>
        <Grid item xs={6} className='chat-button'>
          <h4>Kirim Pesan</h4>
        </Grid>
      </Grid>
    </div>
  )
}

export default JobPosterProfileCard;