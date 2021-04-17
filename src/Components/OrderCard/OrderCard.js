import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import { TRANSLATED_STATUS } from '../../Constants/status';
import { getJobById } from '../../firebase';
import './OrderCard.css';

const OrderCard = (props) => {
  const {
    request: {
      request_id,
      address,
      city,
      date,
      endTime, 
      job_id,
      note,
      startTime,
      status,
      zipCode
    }
  } = props;

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await getJobById(job_id);
      setJob(fetchedJob);
    }
    fetchData();
  }, []);

  const renderStatusGrid = () => {
    const statusClasses = {
      'WAITING-CONFIRMATION': 'waiting-confirmation-status-grid',
      'WAITING-PAYMENT': 'waiting-payment-status-grid',
      'WAITING-PROGRESS': 'waiting-progress-status-grid',
      'IN-PROGRESS': 'in-progress-status-grid',
      'DONE': 'done-status-grid',
      'REJECTED': 'rejected-status-grid'
    }
    return (
      <Grid item xs={6} className={statusClasses[status]}>
        <div>
          <h5>{TRANSLATED_STATUS[status]}</h5>
        </div>
      </Grid>
    )
  }

  return job ? (
    <div className='order-card'>
      <Grid container>
        <Grid item xs={4}>

        </Grid>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={6}>
              <h4>{job.title}</h4>
            </Grid>
            {renderStatusGrid()}
          </Grid>
          <h3>{formattedCurrency(job.fee)}</h3>
          <p>{formattedDescription(job.description)}</p>
          <h5>{job.provider.name}</h5>
          <p>{job.location}</p>
        </Grid>
      </Grid>
    </div>
  ) : (<></>)
}

export default OrderCard;