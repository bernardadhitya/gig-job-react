import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { formattedCurrency } from '../../Constants/format';
import './RequestForm.css';

const RequestForm = (props) => {
  
  const {
    setSelectedDate,
    setStartTime,
    setEndTime,
    setCity,
    setZipCode,
    setAddress,
    setNote,
    handleSubmitButtonClicked
  } = props 

  const {
    job,          
    selectedDate, 
    startTime,    
    endTime,      
    city,         
    zipCode,      
    address,      
    note,     
  } = props

  return (
    <div className='request-form-card'>
        <Grid container spacing={1}>
          <Grid item xs={12} className='form-item'>
            <h3>{`${formattedCurrency(job.fee)} per jam`}</h3>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="date"
              label="Tanggal"
              type="date"
              defaultValue={selectedDate.toString()}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth="true"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Grid>  
          <Grid item xs={12}>
            <p>Jam</p>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="startTime"
              label="Dari"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300
              }}
              variant="outlined"
              fullWidth="true"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="endTime"
              label="Hingga"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
              variant="outlined"
              fullWidth="true"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Alamat</p>
          </Grid>
          <Grid item xs={6} className='form-item'>
            <TextField
              id="city"
              label="Kota"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} className='form-item'>
            <TextField
              id="zipCode"
              label="Kode Pos"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="address"
              label="Alamat"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              multiline
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Note</p>
          </Grid>
          <Grid item xs={12} className='form-item'>
            <TextField
              id="note"
              label="Catatan"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              multiline
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <div className='form-submit-button' onClick={() => handleSubmitButtonClicked()}>
              <h3>Kirim Permintaan</h3>
            </div>
          </Grid>
        </Grid>
      </div>
  )
}

export default RequestForm;