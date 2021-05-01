import { Grid } from '@material-ui/core';
import React from 'react';
import './OrderCardDetailSections.css';

const InProgressDetailSection = (props) => {
  const { request: { date, startTime, endTime, city, zipCode, address, note } } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className='round-box-wrapper'>
          <Grid container>
            <Grid item xs={6}>
              <h5>Tanggal</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 style={{textAlign: 'right'}}>
                <h5>{date}</h5>
              </h5>
            </Grid>
          </Grid>
        </div>
        <div className='round-box-wrapper'>
          <Grid container>
            <Grid item xs={6}>
              <h5>Dari</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 style={{textAlign: 'right'}}>
                <h5>{startTime}</h5>
              </h5>
            </Grid>
            <Grid item xs={6}>
              <h5>Hingga</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 style={{textAlign: 'right'}}>
                <h5>{endTime}</h5>
              </h5>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div className='round-box-wrapper' style={{marginRight: '20px'}}>
          <Grid container>
            <Grid item xs={6}>
              <h5>{city}</h5>
            </Grid>
            <Grid item xs={6}>
              <h5 style={{textAlign: 'right'}}>
                <h5>{zipCode}</h5>
              </h5>
            </Grid>
            <Grid item xs={12}>
              <h5>{address}</h5>
            </Grid>
          </Grid>
        </div>
        <div className='round-box-wrapper' style={{marginRight: '20px'}}>
          <h5>Note</h5>
          <p>{note}</p>
        </div>
      </Grid>
    </Grid>
  )
}

export default InProgressDetailSection;