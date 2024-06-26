import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup, TextField } from '@mui/material';
import moment from 'moment';
import male from "../../../../../../assets/male.png";
import Loader from '../../../../../../utils/react-loader';
import { postRequest, putRequest } from '../../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { applicationFormPDF } from './applicationform-pdf';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function BasicDetails({ loanDetails }) {
    const [readonly, setReadOnly] = useState(true);
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    const [openEmailModal, setEmailModal] = useState(false);
    const [customer_profile, setCustomerProfile] = useState("");
    const [dataURL, setDataURL] = useState("")
    const [loanData, setData] = useState({
        fullname: "",
        address: "",
        email: "",
        gender: "male",
        phone: "",
        dob: "",
        account: "",
        pan: "",
        jobTitle: "",
        grossMonthlyIncome: "",
        TotalAnnuaIncome: "",
    })

    const BASE_URL = "http://localhost:5000/"

    const [loading, setLoading] = useState(true); // Changed initial state to true

    useEffect(() => {
        setLoading(true);
        if (loanDetails) {
            console.log(loanDetails)
            setTimeout(async () => {
                setData({
                    fullname: loanDetails.personalInformation.fullName || "",
                    email: loanDetails.personalInformation.email || "",
                    gender: loanDetails.personalInformation.gender || "male",
                    address: loanDetails.personalInformation.address || "",
                    phone: loanDetails.personalInformation.phoneNumber || "",
                    account: loanDetails.personalInformation.Account_no || "",
                    pan: loanDetails.personalInformation.panCardNumber || "",
                    employmentStatus: loanDetails.employmentInformation.employmentStatus || "",
                    jobTitle: loanDetails.employmentInformation.jobTitle || "",
                    grossMonthlyIncome: loanDetails.employmentInformation.grossMonthlyIncome || "",
                    TotalAnnuaIncome: loanDetails.financialInformation.TotalAnnuaIncome || "",
                    monthlyHousingExpenses: loanDetails.financialInformation.monthlyHousingExpenses || "",
                    loanType: loanDetails.loanDetails.loanType || "",
                    loanAmountRequested: loanDetails.loanDetails.loanAmountRequested || "",
                    loan_status: loanDetails.loanDetails.loan_status || "",
                });
                getCustomerProfile();
                setLoading(false);
            }, 3000);
        }
    }, [loanDetails]);
    function getCustomerProfile() {
        try {
            const payload = {
                customer_id: loanDetails.personalInformation.customer_id
            }
            putRequest('/api/getCustomerProfile', payload, { 'Authorization': token }).then((response) => {
                if (response.data.status == true) {
                    setCustomerProfile(response.data.data.customer_profile);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const generateImageDataURL = () => {
        // Step 1: Load the image using JavaScript
    }

    const generateApplicationPDF = () => {
        if (customer_profile) {
            const payload = {
                profile: BASE_URL + customer_profile,
                fullName: loanData.fullname,
                email: loanData.email,
                contact: loanData.phone,
                address: loanData.address,
                account_number: loanData.account,
                pan: loanData.pan,
                loan_type: loanData.loanType,
                requested_amount: loanData.loanAmountRequested
            }
            console.log(payload)
            pdfMake.createPdf(applicationFormPDF(payload)).download(`loanApplication.pdf`);
        } else {
            toast.error("Please upload your Profile Image !!")
        }

    }

    return (
        <div>
            {!loading && <div className="card-body mb-5">
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className='p-2'>Basic Details</h3>
                        </div>
                        {loanDetails.loanDetails.loan_status != "Approved" && <div className="col-md-6 text-end">
                            <Button variant='contained' onClick={() => generateApplicationPDF()} className='p-3' color='secondary'><Icon>download</Icon>&nbsp; Download Agreement </Button>
                        </div>}
                        <hr className='mb-3 mt-3' />
                    </div>
                    <div className='row mt-3 mb-3'>
                        <div className="col-xl-4">
                            <div className="card mb-4 mb-xl-0 p-4">
                                <div className="card-header">Borrower's Photo</div>
                                <div className="card-body text-center">
                                    <img
                                        className="img-fluid mb-2" style={{ height: '200px' }}
                                        src={customer_profile ? BASE_URL + customer_profile : male} // Check gender directly
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-12">
                            <label className="small mb-1" htmlFor="inputFirstName">
                                Borrower's name
                            </label>
                            <input
                                className="form-control"
                                id="inputFirstName"
                                type="text"
                                value={loanData.fullname}
                                placeholder="Enter your first name"
                                readOnly={readonly}
                            />
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-12">
                            <label className="small mb-1" htmlFor="inputOrgName">
                                Borrower's Address
                            </label>
                            <input
                                className="form-control"
                                id="inputOrgName"
                                type="text"
                                value={loanData.address}
                                placeholder="Enter your organization name"
                                readOnly={readonly}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputEmailAddress">
                            Borrower's Email address
                        </label>
                        <input
                            className="form-control"
                            id="inputEmailAddress"
                            type="email"
                            value={loanData.email}
                            placeholder="Enter your email address"
                            readOnly={readonly}
                        />
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small mb-1" htmlFor="inputPhone">
                                Borrower's Phone number
                            </label>
                            <input
                                className="form-control"
                                id="inputPhone"
                                type="tel"
                                value={loanData.phone}
                                placeholder="Enter your phone number"
                                readOnly={readonly}
                            />
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small mb-1" htmlFor="inputPhone">
                                Borrower's Account Number
                            </label>
                            <input
                                className="form-control"
                                id="inputPhone"
                                type="text"
                                value={loanData.account}
                                placeholder="Enter your phone number"
                                readOnly={readonly}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="small mb-1" htmlFor="inputDob">
                                Borrower's Pan Number
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.pan}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h3>Employement Information</h3>
                        </div>
                        <hr className='mb-3 mt-3' />
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Borrower's Employment Status
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.employmentStatus}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Borrower's Business / Job
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.jobTitle}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Borrower's Gross Monthly Income
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.grossMonthlyIncome}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Borrower's Total Annua Income
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.TotalAnnuaIncome}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h3>Loan Information</h3>
                        </div>
                        <hr className='mb-3 mt-3' />
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Borrower's Monthly Housing Expenses
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.monthlyHousingExpenses}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Loan Type
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.loanType}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Loan Amount Requested
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.loanAmountRequested}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <label className="small mb-1" htmlFor="inputDob">
                                Loan Status
                            </label>
                            <input
                                className="form-control"
                                id="inputDob"
                                type="text"
                                value={loanData.loan_status}
                                placeholder="Enter your date of birth"
                                readOnly={readonly}
                            />
                        </div>
                    </div>
                    {/* {loanDetails.loanDetails.loan_status != "Approved" && <div className='row mt-3 mb-3'>
                        <div className="col-md-12 mt-4">
                            <Button variant="contained" size='large' className='p-2' fullWidth onClick={() => setEmailModal(!openEmailModal)}> Update Details</Button>
                        </div>
                    </div>} */}
                </form>
            </div>}
            {loading && <Loader loading={loading} className="loader" />}
        </div>
    )
}
