import React from 'react';
import { Grid } from '@material-ui/core';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import './JobCard.css';

const JobCard = (props) => {
  const {
    job: {
      job_id,
      fee,
      description,
      provider,
      location,
      title,
      status
    },
    handleJobStatus
  } = props;

  const renderJobOption = () => {
    return status === 'ACTIVE-JOB' ? (
      <div className='job-card-option-active'>
        <h4>Pekerjaan Aktif</h4>
        <h6>Detail</h6>
        <h6>Ubah</h6>
        <div
          style={{cursor: 'pointer'}}
          onClick={() => handleJobStatus(job_id, 'INACTIVE-JOB')}
        >
          <h6 style={{color: 'red'}}>Non-Aktifkan</h6>
        </div>
      </div>
    ) : (
      <div className='job-card-option-inactive'>
        <h4>Pekerjaan Non-Aktif</h4>
        <h6>Detail</h6>
        <h6>Ubah</h6>
        <div
          style={{cursor: 'pointer'}}
          onClick={() => handleJobStatus(job_id, 'ACTIVE-JOB')}
        >
          <h6 style={{color: 'green'}}>Aktifkan</h6>
        </div>
      </div>
    )
  }

  return (
    <div className='job-card-service'>
      <Grid container>
        <Grid item xs={3}>

        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <h4>{title}</h4>
            </Grid>
          </Grid>
          <h3>{formattedCurrency(fee)}</h3>
          <p>{formattedDescription(description)}</p>
          <h5>{provider.name}</h5>
          <p>{location}</p>
        </Grid>
        <Grid item xs={3}>
          {renderJobOption()}
        </Grid>
      </Grid>
    </div>
  )
}

export default JobCard;