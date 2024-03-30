import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { postRequest } from '../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import BasicDetails from './components/basicDetails';
import LoanDocumentManagement from './components/documentManagement';
import "./loans.scss"
import { Button } from '@mui/material';
export default function ViewLoanDetails() {

  const [activeTab, setActive] = useState(1);
  const [loanDetails, setDetails] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("userToken"));

  const { loanId } = useParams();

  useEffect(() => {
    getLoanData();
  }, []);

  useEffect(() => {

  }, [loanDetails]);

  async function getLoanData() {
    const payload = {
      loan_id: loanId
    }
    let response = await postRequest("/api/customer/loan", payload, { 'Authorization': token });
    if (response.data.status == true) {
      setDetails(response.data.data || {});
      console.log(loanDetails)
    } else {
      toast.error(response.data.message);
    }
  }
  return (
    <>
      <div className='container-fluid' id='loansparent'>
        <div className=' px-0'>
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
              <div className='d-flex'>
                <Button variant='contained' size='large' className='' color={loanDetails?.loanDetails?.loan_status == "Rejected" ? 'warning' : (loanDetails?.loanDetails?.loan_status == "Pending" ? 'info' : 'success')} type="button">
                  {loanDetails?.loanDetails?.loan_status}
                </Button>
                <Button variant='contained' size='small' color='secondary' className='mx-2' onClick={() => window.history.back()}>Back</Button>
              </div>
            </nav>
            <hr className="mt-0 mb-4" />
            {activeTab == 1 && loanDetails !== null && <BasicDetails loanDetails={loanDetails} />}
            {activeTab == 2 && <LoanDocumentManagement documentsList={loanDetails?.documents || []} />}
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
