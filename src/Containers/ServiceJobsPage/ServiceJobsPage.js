import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FilterJobs from '../../Components/FilterSection/FilterJobs';
import JobCard from '../../Components/JobCard/JobCard';
import { fetchCurrentUser, getJobsByCurrentUserIdAndStatus } from '../../firebase';

const ServiceJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJobs = await getJobsByCurrentUserIdAndStatus(selectedStatus);
      const fetchedCurrentUser = await fetchCurrentUser();
      setJobs(fetchedJobs);
      setCurrentUser(fetchedCurrentUser)
    }
    fetchData();
  }, [selectedStatus]);

  const renderJobs = () => {
    return jobs.map(job => <JobCard job={job}/>)
  }

  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          {renderJobs()}
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
    </div>
  )
}

export default ServiceJobsPage;