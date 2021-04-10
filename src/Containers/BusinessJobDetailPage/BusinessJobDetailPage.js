import { Grid, Snackbar, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { formattedCurrency } from '../../Constants/format';
import { createRequestPost, getJobById } from '../../firebase';
import './BusinessJobDetailPage.css';
import MuiAlert from '@material-ui/lab/Alert';

const BusinessJobDetailPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await getJobById(id);
      setJob(fetchedJob);
    }
    fetchData();
  }, []);

  const handleSubmitButtonClicked = async () => {
    const submissionData = {
      job_id: id,
      date: selectedDate,
      startTime,
      endTime,
      city,
      zipCode,
      address,
      note
    }
    console.log(submissionData);
    await createRequestPost(submissionData);
    setOpenSnackbar(true);
  }

  const renderRequestForm = () => {
    return job ? (
      <div className='request-form-card'>
        <Grid container spacing={1}>
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
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Grid>  
          <Grid item xs={12}>
            <p>Jam</p>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="startTime"
              label="Dari"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300
              }}
              variant="outlined"
              fullWidth="true"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="endTime"
              label="Hingga"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
              variant="outlined"
              fullWidth="true"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Alamat</p>
          </Grid>
          <Grid item xs={6} className='form-item'>
            <TextField
              id="city"
              label="Kota"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} className='form-item'>
            <TextField
              id="zipCode"
              label="Kode Pos"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="address"
              label="Alamat"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              multiline
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Note</p>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="note"
              label="Catatan"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              multiline
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <div className='form-submit-button' onClick={() => handleSubmitButtonClicked()}>
              <h3>Kirim Permintaan</h3>
            </div>
          </Grid>
        </Grid>
      </div>
    ) : <></>
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Permintaan anda sudah terkirim
        </Alert>
      </Snackbar>
    </div>
  )

}
export default BusinessJobDetailPage;