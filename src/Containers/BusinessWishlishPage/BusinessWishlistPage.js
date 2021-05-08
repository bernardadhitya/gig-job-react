import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import { getAllJobs, getAllJobsInWishlist, getImageByJobId } from '../../firebase';
import './BusinessWishlistPage.css';

const BusinessWishlistPage = () => {
  const history = useHistory();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = await getAllJobsInWishlist();
      setJobs(fetchedJobs);
    }
    fetchData();
  }, []);

  const handleClickJob = (job_id) => {
    history.push(`/business/${job_id}`);
  }

  const renderJobCard = (job) => {
    console.log(job);
    const { job_id, description, fee, title, provider, location, imageUrl } = job;
    const { name: providerName } = provider;

    return (
      <Grid item xs={3}>
        <div className='job-card' onClick={() => handleClickJob(job_id)}>
          <img
            src={imageUrl}
            className='image-thumbnail'
            alt=''
            />
          <h4>{title}</h4>
          <h3>{formattedCurrency(fee)}</h3>
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
      <h3 style={{marginLeft: '40px'}}>No data</h3>
    )
  }

  return (
    <div style={{margin: '20px 40px'}}>
      <h1 style={{margin: '140px 0 0 40px'}}>Favorit</h1>
      {renderJobCards()}
    </div>
  )
}

export default BusinessWishlistPage;