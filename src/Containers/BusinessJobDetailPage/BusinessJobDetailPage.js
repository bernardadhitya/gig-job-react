import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { formattedCurrency } from '../../Constants/format';
import { getJobById } from '../../firebase';
import './BusinessJobDetailPage.css';

const BusinessJobDetailPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await getJobById(id);
      setJob(fetchedJob);
    }
    fetchData();
  }, []);

  const renderRequestForm = () => {
    return job ? (
      <div className='request-form-card'>
        <h3>{formattedCurrency(job.fee)}</h3>
      </div>
    ) : <></>
  }

  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container>
        <Grid item xs={7}>
          <h1>{job ? job.title : ''}</h1>
          <p>{job ? job.description : ''}</p>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          {renderRequestForm()}
        </Grid>
      </Grid>
    </div>
  )

}
export default BusinessJobDetailPage;