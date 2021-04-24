import React from 'react';
import { Grid } from '@material-ui/core';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import { TRANSLATED_STATUS } from '../../Constants/status';
import './JobCard.css';

const JobCard = (props) => {
  const { job: {fee, description, provider, location, title} } = props;

  return (
    <div className='job-card'>
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
          <div className='job-card-option'>
            <h4>Pekerjaan Aktif</h4>
            <h6>Detail</h6>
            <h6>Ubah</h6>
            <h6>Non-Aktifkan</h6>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default JobCard;