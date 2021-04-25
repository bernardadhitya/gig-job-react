import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@material-ui/core';
import React, { useState } from 'react';
import { createJobPost } from '../../firebase';
import './ServiceCreateJobPage.css';

const ServiceCreateJobPage = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [jobType, setJobType] = useState('hourly');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState(0);
  const [location, setLocation] = useState('')
  const [image, setImage] = useState('');

  const handleImageAsFile = (e) => {
    setImage(e.target.files[0]);
  }

  const handleCreateJob = async () => {
    const jobData = {
      title,
      startTime,
      endTime,
      jobType,
      description,
      fee,
      location
    }
    await createJobPost(jobData, image);
  }

  console.log(image);
  
  return (
    <div style={{margin: '20px 40px'}}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Judul Jasa Pekerjaan"
                defaultValue=""
                value={title}
                variant="outlined"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Lokasi"
                defaultValue=""
                value={location}
                variant="outlined"
                fullWidth
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} className='form-item'>
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
            <Grid item xs={6} className='form-item'>
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
              <FormControl component="fieldset">
                <FormLabel component="legend">Jenis Pengerjaan</FormLabel>
                <RadioGroup
                  row aria-label="position"
                  name="position"
                  defaultValue="top"
                  value={jobType}
                >
                  <FormControlLabel
                    value="hourly"
                    control={<Radio color="primary" />}
                    label="Per Jam"
                    onChange={(e) => setJobType(e.target.value)}
                  />
                  <FormControlLabel
                    value="weekly"
                    control={<Radio color="primary" />}
                    label="Per Minggu"
                    onChange={(e) => setJobType(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} className='form-item'>
              <TextField
                id="description"
                label="Deskripsi Jasa"
                type="text"
                defaultValue=""
                variant="outlined"
                fullWidth="true"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Harga Jasa"
                defaultValue="0"
                value={fee}
                variant="outlined"
                fullWidth
                onChange={(e) => setFee(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => handleImageAsFile(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <div className='create-job-button' onClick={() => handleCreateJob()}>
                <h4>Pasang Pekerjaan Anda</h4>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ServiceCreateJobPage;