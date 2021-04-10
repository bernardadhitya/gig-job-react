import { Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { formattedCurrency } from '../../Constants/format';
import { getJobById } from '../../firebase';
import './BusinessJobDetailPage.css';

const BusinessJobDetailPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        <Grid container>
          <Grid item xs={12} className='form-item'>
            <h3>{`${formattedCurrency(job.fee)} per jam`}</h3>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="date"
              label="Tanggal"
              type="date"
              defaultValue={selectedDate.toString()}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth="true"
            />
          </Grid>  
          <Grid item xs={12}>
            <p>Jam</p>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="time"
              label="Dari"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              variant="outlined"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="time"
              label="Hingga"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              variant="outlined"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12}>
            <p>Alamat</p>
          </Grid>
          <Grid item xs={6} className='form-item'>
            <TextField
              id="time"
              label="Kota"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={6} className='form-item'>
            <TextField
              id="time"
              label="Kode Pos"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="time"
              label="Alamat"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Note</p>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="time"
              label="Kota"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
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