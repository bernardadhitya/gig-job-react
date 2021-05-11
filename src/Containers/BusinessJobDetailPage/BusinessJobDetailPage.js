import { Grid, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addToWishlist, createRequestPost, getImageByJobId, getJobById, getWishlistByCurrentUserId, removeFromWishlist } from '../../firebase';
import './BusinessJobDetailPage.css';
import MuiAlert from '@material-ui/lab/Alert';
import RequestForm from '../../Components/RequestForm/RequestForm';
import JobPosterProfileCard from '../../Components/JobPosterProfileCard/JobPosterProfileCard';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { getJobRatingByRatingList } from '../../Constants/rating';
import StarIcon from '@material-ui/icons/Star';

const BusinessJobDetailPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [jobRating, setJobRating] = useState({rating: 0, length: 0});

  const [inWishlist, setInWishlist] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const currentUserWishlist = await getWishlistByCurrentUserId();
      const fetchedJob = await getJobById(id);
      const fetchedImageByJobId = await getImageByJobId(id);
      setJob({...fetchedJob, imageUrl: fetchedImageByJobId});
      setInWishlist(currentUserWishlist.wishlist.includes(id));
      setJobRating(getJobRatingByRatingList(fetchedJob.ratings || {}))
    }
    fetchData();
  }, [refresh]);

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
    setSeverity('success');
    setMessage('Permintaan anda sudah terkirim');
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

  const handleAddOrRemoveWishlist = async () => {
    if (!inWishlist){
      await addToWishlist(id);
      setSeverity('success');
      setMessage('Pekerjaan ini sudah masuk ke wishlist anda');
    } else {
      await removeFromWishlist(id);
      setSeverity('error');
      setMessage('Pekerjaan ini sudah dihapus dari wishlist anda');
    }
    setOpenSnackbar(true);
    setRefresh(refresh + 1);
  }

  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container spacing={3}>
      <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <img
            src={job ? job.imageUrl : ''}
            className='image-banner'
            alt=''
          />
          <Grid container>
            <Grid item xs={10}>
              <h1>{job ? job.title : ''}</h1>
            </Grid>
            <Grid item xs={2}>
              <div className='heart-wrapper' onClick={() => handleAddOrRemoveWishlist()}>
                { inWishlist ? 
                  <Favorite fontSize='large' color='error'/>
                  : <FavoriteBorder fontSize='large' color='error'/>
                }
              </div>
            </Grid>
          </Grid>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <p>{job ? `${job.startTime} - ${job.endTime}` : ''}</p>
            <p style={{width: '20px', textAlign: 'center'}}>•</p>
            {
              jobRating.length > 0 ?
                <>
                  <StarIcon fontSize='small' color='primary'/>
                  <p>{`${jobRating.rating} (${jobRating.length})`}</p>
                </>
                : <></>
            }
          </div>
          <h4>Deskripsi Jasa</h4>
          <p>{job ? job.description : ''}</p>
          <JobPosterProfileCard jobPosterId={job ? job.provider.id : null}/>
        </Grid>
        
        <Grid item xs={4}>
          {renderRequestForm()}
        </Grid>
        <Grid item xs={1}></Grid>
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
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )

}
export default BusinessJobDetailPage;