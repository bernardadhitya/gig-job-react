import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard/JobCard';
import { fetchCurrentUser, getJobsByCurrentUserId, getJobsByUserId } from '../../firebase';

const ServiceJobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = await getJobsByCurrentUserId();
      setJobs(fetchedJobs);
      console.log(fetchedJobs);
    }
    fetchData();
  }, []);

  const renderJobs = () => {
    return jobs.map(job => <JobCard job={job}/>)
  }

  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          {renderJobs()}
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  )
}

export default ServiceJobsPage;