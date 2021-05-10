import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './JobPosterProfileCard.css';
import { getProfileByUserId } from '../../firebase';
import { useHistory } from 'react-router';
import { getDateStringFromTimestamp, getYearFromTimestamp } from '../../Constants/date';

const JobPosterProfileCard = (props) => {
  const history = useHistory();

  const { jobPosterId, detail } = props;

  const [jobPoster, setJobPoster] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!jobPosterId) return;
      const fetchedJobPoster = await getProfileByUserId(jobPosterId);
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
            <p>{jobPoster.description || '-'}</p>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} className='details-button' onClick={() => handleShowJobPosterProfile()}>
            <h4>Lihat Detail Pekerja</h4>
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
            <h2>{jobPoster.name || '-'}</h2>
          </Grid>
          <Grid item xs={6}>
            <p>Tanggal Lahir</p>
          </Grid>
          <Grid item xs={6}>
            <p style={{float: 'right'}}>
              {
                jobPoster.dob ?
                  getDateStringFromTimestamp(jobPoster.dob)
                  : '-'
              }
            </p>
          </Grid>
          <Grid item xs={6}>
            <p>Gender</p>
          </Grid>
          <Grid item xs={6}>
            <p style={{float: 'right'}}>
              {
                jobPoster.gender ?
                  jobPoster.gender === 'm' ? 'Pria' : 'Wanita'
                  : '-'
              }
            </p>
          </Grid>
          <Grid item xs={6}>
            <p>Alamat</p>
          </Grid>
          <Grid item xs={6}>
            <p style={{float: 'right'}}>{jobPoster.address || '-'}</p>
          </Grid>
          <Grid item xs={12}>
            <h4>Tentang Pekerja</h4>
            <p>{jobPoster.description || '-'}</p>
          </Grid>
          <Grid item xs={12}>
            <h4>Pengalaman Kerja</h4>
          </Grid>
          {
            jobPoster.experiences ?
              jobPoster.experiences.map(experience => (
                <>
                  <Grid item xs={6}>
                    <p>{experience.title}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{float: 'right'}}>
                      {`${getYearFromTimestamp(experience.startDate)} - ${getYearFromTimestamp(experience.endDate)}`}
                    </p>
                  </Grid>
                </>
              )) : <Grid item xs={12}><h4>-</h4></Grid>
          }
          <Grid item xs={12}>
            <h4>Edukasi & Pelatihan</h4>
          </Grid>
          {
            jobPoster.educations ?
              jobPoster.educations.map(education => (
                <>
                  <Grid item xs={6}>
                    <p>{education.title}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{float: 'right'}}>
                      {`${getYearFromTimestamp(education.startDate)} - ${getYearFromTimestamp(education.endDate)}`}
                    </p>
                  </Grid>
                </>
              )) : <Grid item xs={12}><h4>-</h4></Grid>
          }
          <Grid item xs={12}>
            <h4>Sertifikasi</h4>
          </Grid>
          {
            jobPoster.certifications ?
              jobPoster.certifications.map(certification => (
                <>
                  <Grid item xs={6}>
                    <p>{certification.title}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{float: 'right'}}>{getYearFromTimestamp(certification.dateIssued)}</p>
                  </Grid>
                </>
              )) : <Grid item xs={12}><h4>-</h4></Grid>
          }
          <Grid item xs={12}>
            <h4>Bahasa</h4>
          </Grid>
          {
            jobPoster.languages ?
              jobPoster.languages.map(language => (
                <>
                  <Grid item xs={6}>
                    <p>{language.title}</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{float: 'right'}}>{language.level}</p>
                  </Grid>
                </>
              )) : <Grid item xs={12}><h4>-</h4></Grid>
          }
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