import React, { useEffect, useState } from 'react'
import SideBar from './sidebar';
import logo from "../../../assets/swastik_logo.png"
import { postRequest } from '../../../utils/axios-service';
import { Button } from '@mui/material';
import EmiCalc from './emi-calc';
import { useNavigate } from 'react-router-dom';

export default function LoansDetails() {

  const navigate = useNavigate();
  const gotoApplyNow = () =>{
    navigate('/user/apply-now');
  }
  return (
    <div className='container-fluid px-0' id='fixedDeposit' style={{ marginTop: '100px' }}>
      {/* <SideBar userData={userDetails} /> */}
      <div className="container px-0">
        <div className="logo-header text-center">
          <img src={logo} alt="" width={100} />
          <h1 class="text-center mb-4">Loan Details</h1>
          <p>"Bankers are the custodians of economic resilience, safeguarding fortunes and nurturing dreams. In their hands, wealth finds purpose, and aspirations take flight. With prudence and integrity, they chart the course to financial empowerment and prosperity."</p>
        </div>
        <div className='w-100 m-3 mb-5'>
          <h2>Introduction : </h2>
          <p className=''>
            At Swastik Finance, we understand the importance of saving for the future. Our Fixed Deposit accounts offer a secure and reliable way to grow your savings while earning competitive interest rates. Whether you're saving for a specific goal or looking to maximize your returns, our Fixed Deposits provide a range of flexible options to suit your needs.
          </p>
        </div>
        <div class="accordion" id="loanAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="homeLoanHeader">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#homeLoanCollapse" aria-expanded="true" aria-controls="homeLoanCollapse">
                Home Loan Procedure
              </button>
            </h2>
            <div id="homeLoanCollapse" class="accordion-collapse collapse show" aria-labelledby="homeLoanHeader" data-bs-parent="#loanAccordion">
              <div class="accordion-body">
                <p>Our Home Loan procedure is designed to make your dream of owning a home a reality. Here's how it works:</p>
                <ol>
                  <li>Application: Fill out our online or in-branch home loan application form.</li>
                  <li>Document Verification: Submit necessary documents such as income proof, property documents, identity proof, and address proof.</li>
                  <li>Eligibility Check: Our team evaluates your application and verifies your eligibility for the loan.</li>
                  <li>Property Valuation: A valuation of the property is conducted to determine its market worth.</li>
                  <li>Loan Approval: Once all checks are completed, your loan application is approved.</li>
                  <li>Disbursement: The loan amount is disbursed to you or directly to the seller/developer.</li>
                </ol>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="goldLoanHeader">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#goldLoanCollapse" aria-expanded="false" aria-controls="goldLoanCollapse">
                Gold Loan Procedure
              </button>
            </h2>
            <div id="goldLoanCollapse" class="accordion-collapse collapse" aria-labelledby="goldLoanHeader" data-bs-parent="#loanAccordion">
              <div class="accordion-body">
                <p>Avail quick financing with our hassle-free Gold Loan procedure. Here's how it works:</p>
                <ol>
                  <li>Gold Valuation: Bring your gold jewelry or ornaments to our branch for valuation.</li>
                  <li>Loan Application: Fill out the Gold Loan application form and submit the required documents.</li>
                  <li>Eligibility Check: Our team verifies your eligibility based on the value of your gold.</li>
                  <li>Loan Approval: Once approved, your loan amount is disbursed to you.</li>
                  <li>Gold Storage: Your gold is securely stored with us until the loan is repaid.</li>
                  <li>Repayment: Repay the loan amount along with interest within the specified tenure to reclaim your gold.</li>
                </ol>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="carLoanHeader">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#carLoanCollapse" aria-expanded="false" aria-controls="carLoanCollapse">
                Car Loan Procedure
              </button>
            </h2>
            <div id="carLoanCollapse" class="accordion-collapse collapse" aria-labelledby="carLoanHeader" data-bs-parent="#loanAccordion">
              <div class="accordion-body">
                <p>Drive home your dream car with our hassle-free car loan. Here's how to get started:</p>
                <ol>
                  <li>Apply for a car loan online or visit our branch with necessary documents such as income proof, identity proof, and vehicle details.</li>
                  <li>Our team will process your application and verify the documents.</li>
                  <li>Upon approval, choose your desired car and complete the purchase process.</li>
                  <li>Complete the loan disbursal formalities and start repaying the loan through affordable EMIs.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className='w-100 mt-4 text-center'>
          <Button variant='contained' size='large' className='p-4 fs-5' onClick={gotoApplyNow}>Apply For Loan</Button>
        </div>

        <EmiCalc />
      </div>
    </div>
  )
}
