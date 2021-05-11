import { Button, Grid, makeStyles, Modal, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import { getAllJobs, getImageByJobId, getJobsByQueries } from '../../firebase';
import qs from 'query-string';
import './BusinessJobsPage.css';
import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { getJobRatingByRatingList } from '../../Constants/rating';
var _ = require('lodash');

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BusinessJobsPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [jobs, setJobs] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const queries = qs.parse(location.search);

  const searchQuery = queries.query;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = _.isEmpty(queries) ? 
        await getAllJobs() : await getJobsByQueries(queries);
      setJobs(fetchedJobs);
    }
    fetchData();
  }, [location]);

  const handleClickJob = (job_id) => {
    history.push(`/business/${job_id}`);
  }

  const renderJobCard = (job) => {
    const {
      job_id,
      description,
      fee,
      title,
      provider,
      location,
      imageUrl,
      ratings
    } = job;
    const { name: providerName } = provider;

    const jobRating = getJobRatingByRatingList(ratings || {});

    return (
      <Grid item xs={3}>
        <div className='job-card' onClick={() => handleClickJob(job_id)}>
          <img
            src={imageUrl}
            className='image-thumbnail'
            alt=''
            />
          <h4>{title}</h4>
          <h3>{formattedCurrency(fee)}</h3>
          <p>{formattedDescription(description)}</p>
          <h5>{providerName}</h5>
          {
            jobRating.length > 0 ?
              <Grid container>
                <Grid item xs={6}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <StarIcon fontSize='small' color='primary'/>
                    <p>{`${jobRating.rating} (${jobRating.length})`}</p>
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <div style={{
                    width: '100%',
                    textAlign: 'right',
                    paddingRight: '20px'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <LocationOnIcon fontSize='small' color='primary'/>
                      <p>{location}</p>
                    </div>
                  </div>
                </Grid>
              </Grid> : <div style={{display: 'flex', alignItems: 'center'}}>
                <LocationOnIcon fontSize='small' color='primary'/>
                <p>{location}</p>
              </div>
          }
        </div>
      </Grid>
    )
  }

  const renderJobCards = () => {
    return jobs.length > 0 ? (
      <Grid container>
        { jobs.map(job => renderJobCard(job)) }
      </Grid>
    ) : (
      <div style={{margin: '40px 0 0 40px'}}>
        <h3>Tidak menemukan pekerjaan</h3>
      </div>
    )
  }

  const handleFilterByPrice = (tempMinPrice, tempMaxPrice) => {
    setOpenModal(false);
    history.push({
      search: `?query=${!!searchQuery || ''}${!!tempMinPrice ? `&minPrice=${tempMinPrice}` : ''}${!!tempMaxPrice ? `&maxPrice=${tempMaxPrice}` : ''}`,
      pathname: '/business/'
    })
  }

  const renderModalBody = () => {
    let tempMinPrice = null;
    let tempMaxPrice = null;
    return (
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h4>Harga</h4>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Min Harga"
              variant="outlined"
              fullWidth
              onChange={e => {tempMinPrice = e.target.value}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Max Harga"
              variant="outlined"
              fullWidth
              onChange={e => {tempMaxPrice = e.target.value}}
            />
          </Grid>
          <Grid item xs={12}>
            <div className='filter-submit-button'>
              <h4
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  handleFilterByPrice(tempMinPrice, tempMaxPrice);
                }}
              >
                Cari
              </h4>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }


  return (
    <div style={{margin: '20px 40px'}}>
      {
        !!searchQuery &&
        <h1 style={{margin: '140px 0 0 40px'}}>Pencarian untuk <span style={{color: '#3183CD'}}>{searchQuery}</span></h1>
      }
      <div className='filter-button' onClick={() => setOpenModal(true)}>
        <h5>Harga</h5>
      </div>
      {renderJobCards()}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className={classes.modal}
      >
        {renderModalBody()}
      </Modal>
    </div>
  )
}

export default BusinessJobsPage;