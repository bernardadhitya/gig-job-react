import { Grid, Snackbar } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { fetchCurrentUser, getRequestsByStatus } from '../../firebase';
import OrderCard from '../../Components/OrderCard/OrderCard';
import FilterSection from '../../Components/FilterSection/FilterSection';
import { useLocation } from 'react-router';
import MuiAlert from '@material-ui/lab/Alert';
import IconEmpty from '../../Assets/icons/IconEmpty';

const BusinessOrdersPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [response, setResponse] = useState({severity: 'success'});

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
  }, [selectedStatus, currentRole, response]);

  const renderRequestCards = () => {
    return requests.map(request => <OrderCard request={request} response={handleResponse}/>);
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleResponse = (orderResponse) => {
    setOpenSnackbar(true);
    setResponse(orderResponse);
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          { 
            requests.length > 0 ? 
              renderRequestCards() :
              <div style={{
                marginTop: '120px',
                textAlign: 'center',
                alignItems: 'center',
                paddingLeft: '100px',
                paddingRight: '100px',
              }}>
                <IconEmpty/>
                <p>
                  Belum ada pekerjaan yang anda pesan saat ini. Silahkan memesan dari beranda utama kami
                </p>
              </div>
          }
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
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={response.severity}>
          {response.severity === 'success' ? 
            'Status permintaan sudah diperbarui'
            : 'Permintaan sudah ditolak'
          }
        </Alert>
      </Snackbar>
    </>
  )
}

export default BusinessOrdersPage;