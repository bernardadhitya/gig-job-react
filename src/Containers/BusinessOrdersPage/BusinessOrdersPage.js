import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { getRequestsByStatus } from '../../firebase';
import { STATUS } from '../../Constants/status';
import OrderCard from '../../Components/OrderCard/OrderCard';

const BusinessOrdersPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRequests = await getRequestsByStatus(STATUS[0]);
      setRequests(fetchedRequests);
      console.log(fetchedRequests);
    }
    fetchData();
  }, []);

  const renderRequestCards = () => {
    return requests.map(request => <OrderCard request={request}/>);
  }

  const renderFilterSection = () => {
    return (
      <>
      </>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {renderRequestCards()}
      </Grid>
      <Grid item xs={4}>
        {renderFilterSection()}
      </Grid>
    </Grid>
  )
}

export default BusinessOrdersPage;