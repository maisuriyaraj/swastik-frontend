import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { postRequest } from '../../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import BasicDetails from './components/basicDetails';
import LoanDocumentManagement from './components/documentManagement';
import { Button } from '@mui/material';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function ViewLoanDetails() {

  const [activeTab, setActive] = useState(1);
  const [loanDetails, setDetails] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("staffAuth"));
  const { loanId } = useParams();

  useEffect(() => {
    getLoanData();
  }, []);

  useEffect(() => {

  }, [loanDetails])

  async function getLoanData() {
    const payload = {
      loan_id: loanId
    }
    let response = await postRequest("/api/customer/loans", payload, { 'Authorization': token });
    if (response.data.status == true) {
      setDetails(response.data.data || {});
      console.log(loanDetails)
    } else {
      toast.error(response.data.message);
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <div className=' px-0' id=''>
          <div className="container-xl px-4 mt-4">
            <nav className="nav nav-borders justify-content-between">
              <div className='d-flex'>
                <a className={`nav-link ${activeTab == 1 ? 'active' : ''} ms-0`} onClick={() => setActive(1)} style={{ cursor: 'pointer' }}>
                  Borrower's Information
                </a>
                <a className={`nav-link ${activeTab == 2 ? 'active' : ''} ms-0`} onClick={() => setActive(2)} style={{ cursor: 'pointer' }}>
                  Documents
                </a>
              </div>
            </nav>
            <hr className="mt-0 mb-4" />
            {activeTab == 1 && loanDetails !== null && <BasicDetails loanDetails={loanDetails} />}
            {activeTab == 2 && <LoanDocumentManagement documentList={loanDetails?.documents} loadData={getLoanData} />}
            {activeTab == 3 && <h1>3</h1>}
            {activeTab == 4 && <h1>4</h1>}
            {activeTab == 5 && <h1>5</h1>}
            {activeTab == 6 && <h1>6</h1>}
          </div>

        </div>
      </div>

    </>
  )
}
