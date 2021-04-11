import React from 'react';
import './FilterSection.css';

const FilterSection = () => {
  
  return (
    <div className='filter-section'>
      <div className='button'>
        <h5>Semua</h5>
      </div>
      <div className='button'>
        <h5>Menunggu Konfirmasi</h5>
      </div>
      <div className='button'>
        <h5>Menunggu Pembayaran</h5>
      </div>
      <div className='button'>
        <h5>Menunggu Pengerjaan</h5>
      </div>
      <div className='button'>
        <h5>Dalam Pengerjaan</h5>
      </div>
      <div className='button'>
        <h5>Pekerjaan Selesai</h5>
      </div>
      <div className='button'>
        <h5>Permintaan Ditolak</h5>
      </div>
    </div>
  )
}

export default FilterSection;