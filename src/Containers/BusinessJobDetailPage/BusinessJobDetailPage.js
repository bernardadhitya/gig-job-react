import { Grid, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { createRequestPost, getJobById } from '../../firebase';
import './BusinessJobDetailPage.css';
import MuiAlert from '@material-ui/lab/Alert';
import RequestForm from '../../Components/RequestForm/RequestForm';
import JobPosterProfileCard from '../../Components/JobPosterProfileCard/JobPosterProfileCard';

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
      note,
    }
    await createRequestPost(submissionData);
    setOpenSnackbar(true);
  }

  const renderRequestForm = () => {
    return job ?
      <RequestForm
        setSelectedDate={setSelectedDate}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setCity={setCity}
        setZipCode={setZipCode}
        setAddress={setAddress}
        setNote={setNote}
        handleSubmitButtonClicked={handleSubmitButtonClicked}
        job={job}
        selectedDate={selectedDate}
        startTime={startTime}   
        endTime={endTime}    
        city={city}        
        zipCode={zipCode}     
        address={address}     
        note={note}
      />
      : <></>
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container>
        <Grid item xs={7}>
          <h1>{job ? job.title : ''}</h1>
          <h4>Deskripsi Jasa</h4>
          <p>{job ? job.description : ''}</p>
          <JobPosterProfileCard/>
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