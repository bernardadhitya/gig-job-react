import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@material-ui/core';
import JobPosterProfileCard from '../../Components/JobPosterProfileCard/JobPosterProfileCard';
import './BusinessJobPosterProfilePage.css';
import { getUserById } from '../../firebase';

const BusinessJobPosterProfilePage = () => {
  const { id } = useParams();

  const [jobPoster, setJobPoster] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobPoster = await getUserById(id);
      setJobPoster(fetchedJobPoster);
    }
    fetchData();
  }, []);

  return jobPoster ? (
    <div className='job-poster-page-wrapper'>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <JobPosterProfileCard jobPosterId={id} detail/>
        </Grid>
        <Grid item xs={3}>
          <div className='job-poster-user-card'>
            <h4>{jobPoster.name}</h4>
            <div className='send-chat-button'>
              <h4>Kirim Pesan</h4>
            </div>
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  ) : <></>
}

export default BusinessJobPosterProfilePage;