import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import moment from 'moment';
import Loader from '../../../../../../../utils/react-loader';
import { postRequest } from '../../../../../../../utils/axios-service';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function BasicDetails({ loanDetails }) {
    const [readonly, setReadOnly] = useState(true);
    const token = JSON.parse(sessionStorage.getItem("staffAuth"));
    const [openEmailModal, setEmailModal] = useState(false);
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
            setTimeout(() => {
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
                    loan_status: loanDetails.loanDetails.loan_status || ""
                });
                setLoading(false)
            }, 1000);
        }
    }, [loanDetails]);

    async function sendDocumentManagementEmail() {
        try {
            const payload = {
                email: loanData.email
            }
            const response = await postRequest("/api/senddocumentmanagementemail", payload, { 'Authorization': token });
            if (response.data.status == true) {
                toast.success("Email sent Successfully !!");
                setEmailModal(!openEmailModal)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {!loading && <div className="card-body mb-5">
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Basic Details</h3>
                        </div>
                        <hr className='mb-3 mt-3' />
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
                    <div className='row mt-3 mb-3'>
                        <div className="col-md-12 mt-4">
                            <Button variant="contained" size='large' className='p-2' fullWidth onClick={() => setEmailModal(!openEmailModal)}> Approve For Document Management </Button>
                        </div>
                    </div>
                </form>
                <Modal isOpen={openEmailModal} >
                    <ModalHeader>Review Alert</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className="col-md-12 mt-3">
                                <label className="small mb-1" htmlFor="inputDob">
                                    Recipient's Email
                                </label>
                                <TextField
                                    className="form-control"
                                    id="inputDob"
                                    type="text"
                                    value={loanData.email}
                                    placeholder="Enter your date of birth"
                                    readOnly={readonly}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => setEmailModal(!openEmailModal)}>
                            Cancle
                        </Button>
                        <Button color="primary" onClick={sendDocumentManagementEmail}>
                            Send Email
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>}
            {loading && <Loader loading={loading} className="loader" />}
        </div>
    )
}
