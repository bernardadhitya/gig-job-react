import React, {useState} from 'react';
import { STATUS } from '../../Constants/status';
import './FilterSection.css';

const FilterSection = (props) => {
  const { selectedStatus, setSelectedStatus } = props

  const renderFilterButton = (status) => {
    const statusList = {
      'ALL': 'Semua',
      'WAITING-CONFIRMATION': 'Menunggu Konfirmasi',
      'WAITING-PAYMENT': 'Menunggu Pembayaran',
      'WAITING-PROGRESS': 'Menunggu Pengerjaan',
      'IN-PROGRESS': 'Dalam Pengerjaan',
      'DONE': 'Pekerjaan Selesai',
      'REJECTED': 'Permintaan Ditolak'
    };

    return status === selectedStatus ? (
      <div className='button-selected' onClick={() => setSelectedStatus(status)}>
        <h5>{statusList[status]}</h5>
      </div>
    ) : (
      <div className='button' onClick={() => setSelectedStatus(status)}>
        <h5>{statusList[status]}</h5>
      </div>
    )
  }

  const renderFilterButtons = () => {
    return STATUS.map(status => renderFilterButton(status))
  }

  return (
    <div className='filter-section'>
      {renderFilterButtons()}
    </div>
  )
}

export default FilterSection;