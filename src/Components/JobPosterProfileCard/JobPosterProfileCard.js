import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './JobPosterProfileCard.css';
import { getUserById } from '../../firebase';
import { useHistory } from 'react-router';

const JobPosterProfileCard = (props) => {
  const history = useHistory();

  const { jobPosterId, detail } = props;

  const [jobPoster, setJobPoster] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!jobPosterId) return;
      const fetchedJobPoster = await getUserById(jobPosterId);
      setJobPoster(fetchedJobPoster);
    }
    fetchData();
  }, [jobPosterId]);

  const handleShowJobPosterProfile = () => {
    history.push(`/business/profil/${jobPosterId}`);
  }

  const renderJobPosterCardSimple = () => {
    return (
      <div className='job-poster-profile-card-wrapper'>
        <Grid container className='content-wrapper'>
          <Grid item xs={12}>
            <h2>{jobPoster.name}</h2>
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
          <Grid item xs={6} className='details-button' onClick={() => handleShowJobPosterProfile()}>
            <h4>Lihar Detail Pekerja</h4>
          </Grid>
          <Grid item xs={6} className='chat-button'>
            <h4>Kirim Pesan</h4>
          </Grid>
        </Grid>
      </div>
    )
  }

  const renderJobPosterCardDetail = () => {
    return (
      <div className='job-poster-profile-card-wrapper'>
        <Grid container className='content-wrapper'>
          <Grid item xs={12}>
            <h2>{jobPoster.name}</h2>
          </Grid>
          <Grid item xs={6}>
            <p>Tanggal Lahir</p>
          </Grid>
          <Grid item xs={6}>
            <p style={{float: 'right'}}>-</p>
          </Grid>
          <Grid item xs={6}>
            <p>Gender</p>
          </Grid>
          <Grid item xs={6}>
            <p style={{float: 'right'}}>-</p>
          </Grid>
          <Grid item xs={6}>
            <p>Alamat</p>
          </Grid>
          <Grid item xs={6}>
            <p style={{float: 'right'}}>-</p>
          </Grid>
          <Grid item xs={12}>
            <h4>Tentang Pekerja</h4>
            <p>Et Lorem velit incididunt ut cupidatat fugiat tempor officia. Ad nulla mollit non ipsum nisi ea cillum est officia. Mollit excepteur laborum culpa amet. Cillum mollit dolor in deserunt ullamco labore.</p>
          </Grid>
          <Grid item xs={12}>
            <h4>Pengalaman Kerja</h4>
          </Grid>
          <Grid item xs={12}>
            <h4>Edukasi & Pelatihan</h4>
          </Grid>
          <Grid item xs={12}>
            <h4>Sertifikasi</h4>
          </Grid>
          <Grid item xs={12}>
            <h4>Bahasa</h4>
          </Grid>
        </Grid>
      </div>
    )
  }

  const renderJobPosterCardByType = () => {
    return detail ? renderJobPosterCardDetail() : renderJobPosterCardSimple()
  }
  
  return jobPoster ? renderJobPosterCardByType() : <></>
}

export default JobPosterProfileCard;