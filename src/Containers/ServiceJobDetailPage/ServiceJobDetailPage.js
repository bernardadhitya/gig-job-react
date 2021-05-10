import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getImageByJobId, getJobById } from '../../firebase';
import './ServiceJobDetailPage.css';
import JobPosterProfileCard from '../../Components/JobPosterProfileCard/JobPosterProfileCard';

const ServiceJobDetailPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await getJobById(id);
      const fetchedImageByJobId = await getImageByJobId(id);
      setJob({...fetchedJob, imageUrl: fetchedImageByJobId});
    }
    fetchData();
  }, []);

  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container spacing={3}>
      <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <img
            src={job ? job.imageUrl : ''}
            className='image-banner'
            alt=''
          />
          <Grid container>
            <Grid item xs={12}>
              <h1>{job ? job.title : ''}</h1>
            </Grid>
          </Grid>
          <h4>Deskripsi Jasa</h4>
          <p>{job ? job.description : ''}</p>
          <JobPosterProfileCard jobPosterId={job ? job.provider.id : null}/>
        </Grid>
        
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </div>
  )

}
export default ServiceJobDetailPage;