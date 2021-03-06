import React from 'react';
import { Grid } from '@material-ui/core';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import './JobCard.css';
import { useHistory } from 'react-router';

const JobCard = (props) => {
  const {
    job: {
      job_id,
      fee,
      description,
      provider,
      location,
      title,
      status,
      imageUrl
    },
    handleJobStatus
  } = props;

  const history = useHistory();

  const renderJobOption = () => {
    return status === 'ACTIVE-JOB' ? (
      <div className='job-card-option-active'>
        <h4>Pekerjaan Aktif</h4>
        <h6
          style={{cursor: 'pointer'}}
          onClick={() => {history.push(`/service/${job_id}`)}}
        >
          Detail
        </h6>
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
          <img src={imageUrl} className='image-thumbnail' alt=''/>
        </Grid>
        <Grid item xs={6}>
          <div style={{paddingLeft: '20px'}}>
            <Grid container>
              <Grid item xs={6}>
                <h4>{title}</h4>
              </Grid>
            </Grid>
            <h3>{formattedCurrency(fee)}</h3>
            <p>{formattedDescription(description)}</p>
            <h5>{provider.name}</h5>
            <p>{location}</p>
          </div>
        </Grid>
        <Grid item xs={3}>
          {renderJobOption()}
        </Grid>
      </Grid>
    </div>
  )
}

export default JobCard;