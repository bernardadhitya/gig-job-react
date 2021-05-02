import { Grid, MenuItem, Modal, Select, Snackbar, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { createOrUpdateProfile, fetchCurrentUser } from '../../firebase';
import './ProfileSettingPage.css';
import MuiAlert from '@material-ui/lab/Alert';

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

const ProfileSettingPage = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('male');
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState();
  const [description, setDescription] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [selectedModal, setSelectedModal] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateIssued, setDateIssued] = useState(new Date());
  const [certificationDesc, setCertificationDesc] = useState('');
  const [level, setLevel] = useState(1);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedCurrentUser = await fetchCurrentUser();
      console.log(fetchedCurrentUser);
      setCurrentUser(fetchedCurrentUser);
    }
    fetchData();
  }, []);

  const renderModalBody = (label) => {
    const modalBodies = {
      'Pengalaman Kerja': 
        <div className={classes.paper}>
          <h4 id="simple-modal-title">Tambahkan Pengalaman Kerja</h4>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                value={title}
                label="Nama Pekerjaan"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Dari"
                type="date"
                defaultValue={startDate.toString()}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth="true"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Hingga"
                type="date"
                defaultValue={endDate.toString()}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth="true"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{width: '100%', textAlign:'right'}}>
                <h4
                  style={{
                    color: '#1A3E60',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const newExperience = {
                      title,
                      startDate: new Date(startDate),
                      endDate: new Date(endDate)
                    }
                    setExperiences([...experiences, newExperience]);
                    handleCloseModal();
                  }}
                >
                  + Tambahkan
                </h4>
              </div>
            </Grid>
          </Grid>
        </div>,
      'Edukasi & Pelatihan':
        <div className={classes.paper}>
          <h4 id="simple-modal-title">Tambahkan Edukasi & Pelatihan</h4>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                value={title}
                label="Nama Edukasi & Pelatihan"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Dari"
                type="date"
                defaultValue={startDate.toString()}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth="true"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Hingga"
                type="date"
                defaultValue={endDate.toString()}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth="true"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{width: '100%', textAlign:'right'}}>
                <h4
                  style={{
                    color: '#1A3E60',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const newEducation = {
                      title,
                      startDate: new Date(startDate),
                      endDate: new Date(endDate)
                    }
                    setEducations([...educations, newEducation]);
                    handleCloseModal();
                  }}
                >
                  + Tambahkan
                </h4>
              </div>
            </Grid>
          </Grid>
        </div>,
      'Sertifikasi':
        <div className={classes.paper}>
          <h4 id="simple-modal-title">Tambahkan Sertifikasi</h4>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                value={title}
                label="Nama Sertifikasi"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tanggal Sertifikasi"
                type="date"
                defaultValue={dateIssued.toString()}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth="true"
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Deskripsi"
                type="text"
                defaultValue=""
                variant="outlined"
                fullWidth="true"
                multiline
                rows={4}
                value={certificationDesc}
                onChange={(e) => setCertificationDesc(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{width: '100%', textAlign:'right'}}>
                <h4
                  style={{
                    color: '#1A3E60',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const newCertification = {
                      title,
                      dateIssued: new Date(dateIssued),
                      description: certificationDesc
                    }
                    setCertifications(
                      [...certifications, newCertification]);
                    handleCloseModal();
                  }}
                >
                  + Tambahkan
                </h4>
              </div>
            </Grid>
          </Grid>
        </div>,
      'Bahasa':
        <div className={classes.paper}>
          <h4 id="simple-modal-title">Tambahkan Bahasa</h4>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                value={title}
                label="Bahasa"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                variant="outlined"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                label="Level"
                fullWidth
              >
                <MenuItem value={1}>Dasar</MenuItem>
                <MenuItem value={2}>Menengah</MenuItem>
                <MenuItem value={3}>Lancar</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <div style={{width: '100%', textAlign:'right'}}>
                <h4
                  style={{
                    color: '#1A3E60',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setLanguages(
                      [...languages, {title, level}]);
                    handleCloseModal();
                  }}
                >
                  + Tambahkan
                </h4>
              </div>
            </Grid>
          </Grid>
        </div>
    }

    console.log('currently selected:', label);
    return modalBodies[label]
  }

  const handleCloseModal = () => {
    setTitle('');
    setStartDate(new Date());
    setEndDate(new Date());
    setDateIssued(new Date());
    setCertificationDesc('');
    setLevel(1);
    setSelectedModal('');
  }

  const renderMultipleFields = (values, onChange, label) => {
    return (
      <div className='multple-fields-wrapper'>
        <h4>{label}</h4>
        <p>Pekerja dengan informasi ini mendapatkan pekerjaan 10x lebih cepat</p>
        <h6
          style={{color: '#1A3E60', cursor: 'pointer'}}
          onClick={() => setSelectedModal(label)}
        >
          {`+ Tambahkan ${label}`}
        </h6>
        {values.map((value, idx) => (<h5>{`${idx+1}. ${value.title}`}</h5>))}
        <Modal
          open={selectedModal === label}
          onClose={() => setSelectedModal('')}
          className={classes.modal}
        >
          {renderModalBody(label)}
        </Modal>
      </div>
    )
  }

  const handleSubmitButtonClicked = async () => {
    if (currentUser === null) return;
    const submittedProfile = {
      address,
      certifications,
      educations,
      experiences,
      languages,
      gender,
      description,
      name: firstName + ' ' + lastName,
      dob: new Date(dob),
      user_id: currentUser.user_id,
      email: currentUser.email
    };
    await createOrUpdateProfile(submittedProfile, currentUser.user_id);
    setOpenSnackbar(true);
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <div className='profile-setting-wrapper'>
            <h4>Informasi Pribadi</h4>
            <p>Nama Lengkap</p>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  value={firstName}
                  label="Nama Depan"
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={lastName}
                  label="Nama Belakang"
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <p>Tanggal Lahir</p>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="date"
                  label="Tanggal"
                  type="date"
                  defaultValue={dob.toString()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  fullWidth="true"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Grid>
            </Grid>
            <p>Gender</p>
            <Grid container spacing={3}>
              <Grid item xs={6}>
              <Select
                variant="outlined"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                fullWidth
              >
                <MenuItem value={'m'}>Pria</MenuItem>
                <MenuItem value={'f'}>Wanita</MenuItem>
              </Select>
              </Grid>
            </Grid>
            <p>Alamat</p>
            <Grid container spacing={3}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={12}>
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
            </Grid>
            <h4>Informasi Kontak</h4>
            <p>Nomor Telepon</p>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="phone"
                  label="Nomor Telepon"
                  type="text"
                  defaultValue=""
                  variant="outlined"
                  fullWidth="true"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            <h4>Tentang Saya</h4>
            <p>Tentang Saya</p>
            <TextField
              id="description"
              label="Tentang Saya"
              type="text"
              defaultValue=""
              variant="outlined"
              fullWidth="true"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {renderMultipleFields(experiences, setExperiences, 'Pengalaman Kerja')}
            {renderMultipleFields(educations, setEducations, 'Edukasi & Pelatihan')}
            {renderMultipleFields(certifications, setCertifications, 'Sertifikasi')}
            {renderMultipleFields(languages, setLanguages, 'Bahasa')}
            <Grid container spacing={3}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <div className='form-submit-button' onClick={() => handleSubmitButtonClicked()}>
                  <h3>Simpan</h3>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
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
      <Alert onClose={() => setOpenSnackbar(false)} severity="success">
        Profil sudah diperbarui
      </Alert>
    </Snackbar>
  </>
  )
}

export default ProfileSettingPage;