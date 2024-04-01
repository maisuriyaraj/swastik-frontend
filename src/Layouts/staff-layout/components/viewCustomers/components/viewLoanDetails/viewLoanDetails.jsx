import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { postRequest } from '../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import BasicDetails from './components/basicDetails';
import LoanDocumentManagement from './components/documentManagement';
import { Button } from '@mui/material';
import reviewForm from "../../../../../assets/exclamation-gif.gif";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function ViewLoanDetails() {

  const [activeTab, setActive] = useState(1);
  const [loanDetails, setDetails] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("AdminAuth"));
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
    let response = await postRequest("/api/customer/loan", payload, { 'Authorization': token });
    if (response.data.status == true) {
      setDetails(response.data.data || {});
      console.log(loanDetails)
    } else {
      toast.error(response.data.message);
    }
  }
  const ChangeLoanStatus = (status) => {
    const payload = {
      loan_id: loanId,
      account_number: loanDetails.personalInformation.Account_no,
      email: loanDetails.personalInformation.email,
      status: status
    }

    postRequest("/api/changeLoanStatus", payload, { "Authorization": token }).then((resp) => {
      if (resp.data.status == true) {
        toast.success(resp.data.message);
        window.location.reload();
      } else {
        toast.error(resp.data.message);
      }
    });
  }
  return (
    <>
      <div className='container-fluid'>
        <div className=' px-0' id='viewCustomerAdmin'>
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
                <div className="dropdown">
                  <Button variant='contained' size='large' className='' color='secondary' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {loanDetails?.loanDetails?.loan_status}
                  </Button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item p-2" onClick={() => ChangeLoanStatus('Pending')}>Pending</a></li>
                    <li><a className="dropdown-item p-2" onClick={() => ChangeLoanStatus('Approved')}>Approved</a></li>
                    <li><a className="dropdown-item p-2" onClick={() => ChangeLoanStatus('Rejected')}>Rejected</a></li>
                  </ul>
                </div>
                <Button variant='contained' size='small' color='secondary' className='mx-2' onClick={() => window.history.go(-1)}>Back</Button>
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
