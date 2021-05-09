import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import { getAllJobs, getImageByJobId, getJobsByQueries } from '../../firebase';
import qs from 'query-string';
import './BusinessJobsPage.css';
var _ = require('lodash');

const BusinessJobsPage = () => {
  const history = useHistory();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);

  const queries = qs.parse(location.search);
  console.log('queries:', queries);

  const searchQuery = queries.query;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = _.isEmpty(queries) ? 
        await getAllJobs() : await getJobsByQueries(queries);
      setJobs(fetchedJobs);
    }
    fetchData();
  }, [location]);

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
      <h3>No data</h3>
    )
  }

  return (
    <div style={{margin: '20px 40px'}}>
      {
        !!searchQuery &&
        <h1 style={{margin: '140px 0 0 40px'}}>Pencarian untuk <span style={{color: '#3183CD'}}>{searchQuery}</span></h1>
      }
      {renderJobCards()}
    </div>
  )
}

export default BusinessJobsPage;