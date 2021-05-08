import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { actions } from '../../Constants/actions';
import { formattedCurrency, formattedDescription } from '../../Constants/format';
import { TRANSLATED_STATUS } from '../../Constants/status';
import { getImageByJobId, getJobById, updateRequestStatusNextStage, updateRequestStatusToRejected } from '../../firebase';
import InProgressDetailSection from '../OrderCardDetailSections/InProgressDetailSection';
import RejectedDetailSection from '../OrderCardDetailSections/RejectedDetailSection';
import WaitingProgressDetailSection from '../OrderCardDetailSections/WaitingProgressDetailSection';
import './OrderCard.css';

const OrderCard = (props) => {
  const { request, response } = props;
  const { request_id, job_id, status } = request;

  const location = useLocation();

  const currentRole = location.pathname.split('/')[1];

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedJob = await getJobById(job_id);
      const fetchedImage = await getImageByJobId(job_id);
      setJob({...fetchedJob, imageUrl: fetchedImage});
    }
    fetchData();
  }, []);

  const renderStatusGrid = () => {
    const statusClasses = {
      'WAITING-CONFIRMATION': 'waiting-confirmation-status-grid',
      'WAITING-PAYMENT': 'waiting-payment-status-grid',
      'WAITING-PROGRESS': 'waiting-progress-status-grid',
      'IN-PROGRESS': 'in-progress-status-grid',
      'DONE': 'done-status-grid',
      'REJECTED': 'rejected-status-grid'
    }
    return (
      <Grid item xs={6} className={statusClasses[status]}>
        <div>
          <h5>{TRANSLATED_STATUS[status]}</h5>
        </div>
      </Grid>
    )
  }

  const renderOrderCardDetailSection = () => {
    const detailSections = {
      'WAITING-CONFIRMATION': <></>,
      'WAITING-PAYMENT': <></>,
      'WAITING-PROGRESS': <WaitingProgressDetailSection request={request}/>,
      'IN-PROGRESS': <InProgressDetailSection request={request}/>,
      'DONE': <></>,
      'REJECTED': <RejectedDetailSection request={request}/>,
    }
    return detailSections[status];
  }

  const handleActionClicked = async (action) => {
    if (action === 'next'){
      await updateRequestStatusNextStage(request_id, status);
      response({severity: 'success'});
    } else if (action === 'reject'){
      await updateRequestStatusToRejected(request_id);
      response({severity: 'error'})
    }
  }

  const renderOrderCardActionSection = () => {
    const actionSections = actions[currentRole][status];
    return (
      <Grid container spacing={1}>
        {actionSections.map(actionSection => {
          const { style, color, title, action } = actionSection;
          return (
            <Grid item xs={12/actionSections.length}>
              <div
                style={{
                  color: style === 'outline' ? color : 'white',
                  borderColor: style === 'outline' ? color : 'none',
                  borderWidth: style === 'outline' ? '1px' : 0,
                  backgroundColor: style === 'fill' ? color : 'white',
                  borderStyle: 'solid',
                  padding: '2px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  margin: '10px',
                  cursor: 'pointer'
                }}
                onClick={() => handleActionClicked(action)}
              >
                <h5>{title}</h5>
              </div>
            </Grid>
          )})}
      </Grid>
    )
  }

  return job ? (
    <div className='order-card'>
      <Grid container>
        <Grid item xs={4}>
          <img src={job.imageUrl} className='image-thumbnail' alt=''/>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={6}>
              <h4>{job.title}</h4>
            </Grid>
            {renderStatusGrid()}
          </Grid>
          <h3>{formattedCurrency(job.fee)}</h3>
          <p>{formattedDescription(job.description)}</p>
          <h5>{job.provider.name}</h5>
          <p>{job.location}</p>
        </Grid>
        <Grid item xs={12}>
          { renderOrderCardDetailSection() }
        </Grid>
        <Grid item xs={12}>
          { renderOrderCardActionSection() }
        </Grid>
      </Grid>
    </div>
  ) : (<></>)
}

export default OrderCard;