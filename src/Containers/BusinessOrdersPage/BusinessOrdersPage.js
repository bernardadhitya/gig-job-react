import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { fetchCurrentUser, getRequestsByStatus } from '../../firebase';
import OrderCard from '../../Components/OrderCard/OrderCard';
import FilterSection from '../../Components/FilterSection/FilterSection';
import { useLocation } from 'react-router';

const BusinessOrdersPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const location = useLocation();

  const currentRole = location.pathname.split('/')[1];

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await fetchCurrentUser();
      if (!currentUser) return;
      const { user_id } = currentUser;

      const fetchedRequests = await getRequestsByStatus(user_id, selectedStatus, currentRole);
      setRequests(fetchedRequests);
    }
    fetchData();
  }, [selectedStatus, currentRole]);

  const renderRequestCards = () => {
    return requests.map(request => <OrderCard request={request}/>);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={1}></Grid>
      <Grid item xs={6}>
        {renderRequestCards()}
      </Grid>
      <Grid item xs={4}>
        <FilterSection
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          numberOfRequests={requests.length}  
        />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  )
}

export default BusinessOrdersPage;