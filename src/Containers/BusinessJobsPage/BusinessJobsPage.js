import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { getAllJobs } from '../../firebase';
import './BusinessJobsPage.css';

const BusinessJobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = await getAllJobs();
      setJobs(fetchedJobs);
    }
    fetchData();
  }, []);

  const numericToCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const formattedDescription = (description) => {
    return description.length > 100 ? description.slice(0,97) + '...' : description;
  }

  const renderJobCard = (job) => {
    const { description, fee, title, provider, location } = job;
    const { name: providerName } = provider;
    return (
      <Grid item xs={3}>
        <div className='job-card'>
          <h4>{title}</h4>
          <h3>{numericToCurrency.format(fee)}</h3>
          <p>{formattedDescription(description)}</p>
          <h5>{providerName}</h5>
          <p>{location}</p>
        </div>
      </Grid>
    )
  }

  const renderJobCards = () => {
    return jobs.length > 0 ? (
      <Grid container>
        { jobs.map(job => renderJobCard(job)) }
      </Grid>
    ) : (
      <h3>No data</h3>
    )
  }

  return (
    <div>
      {renderJobCards()}
    </div>
  )
}

export default BusinessJobsPage;