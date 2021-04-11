import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { fetchCurrentUser, getRequestsByStatus } from '../../firebase';
import { STATUS } from '../../Constants/status';
import OrderCard from '../../Components/OrderCard/OrderCard';
import FilterSection from '../../Components/FilterSection/FilterSection';

const BusinessOrdersPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await fetchCurrentUser();
      if (!currentUser) return;
      const { user_id } = currentUser;

      const fetchedRequests = await getRequestsByStatus(user_id, STATUS[0]);
      setRequests(fetchedRequests);
      console.log(fetchedRequests);
    }
    fetchData();
  }, []);

  const renderRequestCards = () => {
    return requests.map(request => <OrderCard request={request}/>);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {renderRequestCards()}
      </Grid>
      <Grid item xs={4}>
        <FilterSection />
      </Grid>
    </Grid>
  )
}

export default BusinessOrdersPage;