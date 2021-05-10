import { Grid, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FilterJobs from '../../Components/FilterSection/FilterJobs';
import JobCard from '../../Components/JobCard/JobCard';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchCurrentUser, getJobsByCurrentUserIdAndStatus, updateJobPost } from '../../firebase';
import IconEmpty from '../../Assets/icons/IconEmpty';

const ServiceJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [refresh, setRefresh] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = await getJobsByCurrentUserIdAndStatus(selectedStatus);
      const fetchedCurrentUser = await fetchCurrentUser();
      setJobs(fetchedJobs);
      setCurrentUser(fetchedCurrentUser)
    }
    fetchData();
  }, [selectedStatus, refresh]);

  const handleJobStatus = async (jobId, newStatus) => {
    setSnackbarType(newStatus === 'ACTIVE-JOB' ? 'success' : 'error');
    await updateJobPost(jobId, newStatus);
    setRefresh(refresh + 1);
    setOpenSnackbar(true);
  }

  const renderJobs = () => {
    return jobs.map(job =>
      <JobCard
        job={job}
        handleJobStatus={handleJobStatus}
      />
    )
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
        { 
          jobs.length > 0 ? 
            renderJobs() :
            <div style={{
              marginTop: '120px',
              textAlign: 'center',
              alignItems: 'center',
              paddingLeft: '150px',
              paddingRight: '150px',
            }}>
              <IconEmpty/>
              <p>
              Pasang iklan pekerjaan anda dan jangan lupa untuk melengkapi profil anda!
              </p>
            </div>
        }
        </Grid>
        <Grid item xs={3}>
          <div className='job-poster-user-card'>
            <h4>{currentUser && currentUser.name}</h4>
            <div className='send-chat-button' onClick={() => history.push('/service/pekerjaan')}>
              <h4>Tambah Pekerjaan</h4>
            </div>
          </div>
          <FilterJobs
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            numberOfJobs={jobs.length} 
          />
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
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarType}>
          {snackbarType === 'success' ? 
            'Pekerjaan sudah diaktifkan kembali'
            : 'Pekerjaan sudah dinon-aktifkan'
          }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ServiceJobsPage;