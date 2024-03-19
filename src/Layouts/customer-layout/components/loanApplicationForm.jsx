import React, { useEffect, useState } from 'react';
import './loanApplication.scss';
import TextField from '@mui/material/TextField';
import logo from "../../../assets/swastik_logo.png";
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import bankingPosition from "../../../assets/json/banking-positions.json";
import bankDepts from "../../../assets/json/banking-depts.json";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Label } from 'reactstrap';
import moment from "moment"
import { toast } from 'react-toastify';
import { getRequest, postRequest } from '../../../utils/axios-service';
import Loader from '../../../utils/react-loader';
import { useNavigate } from 'react-router-dom';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function LoanApplicationForm() {

  const [dob, setDob] = useState();
  const [coDob, setCoDOb] = useState();
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(false);
  const userID = JSON.parse(sessionStorage.getItem("user"))
  const token = JSON.parse(sessionStorage.getItem("userToken"))
  const [loanDetails, setDetails] = useState({
    fname: "",
    lname: "",
    pan_number: "",
    Account_no: "",
    address: "",
    contact: "",
    email: "",
    employe_status: "",
    jobtitle: "",
    monthlyIncome: "",
    TotalAnnuaIncome: "",
    otherSourcesofIncome: "",
    monthlyExpence: "",
    assets: "",
    loanType: "",
    loanAmountRequested: "",
    purposeofLoan: "",
    coFullname: "",
    relation: ""
  })
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);
  function loadData() {
    const payload = {
      id: userID
    };
    try {
      postRequest('/api/getCustomerDetails', payload, { 'Authorization': token }).then((resp) => {
        setDetails({
          fname:resp.data.data.first_name,
          lname:resp.data.data.last_name,
          pan_number:resp.data.data.pan_number,
          Account_no:resp.data.data.account_number,
          contact:resp.data.data.phone,
          email:resp.data.data.email,
          address:resp.data.data.address
        });
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }


  const handleChange = (field, e, val = null) => {
    const { value } = e.target;
    let updateVal = val !== null ? val : value
    setDetails(prevState => ({
      ...prevState,
      [field]: updateVal
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if(review === true){
    const payload = {
      personalInformation: {
        fullName: loanDetails.fname + " " + loanDetails.lname,
        dateOfBirth: moment(dob.$d).format("DD/MM/YYYY"),
        panCardNumber: loanDetails.pan_number,
        customer_id: JSON.parse(sessionStorage.getItem("user")),
        Account_no: loanDetails.Account_no,
        address: loanDetails.address,
        phoneNumber: loanDetails.contact,
        email: loanDetails.email,
        ApplicationDate: moment().format("DD/MM/YYYY"),
      },
      employmentInformation: {
        employmentStatus: loanDetails.employe_status,
        jobTitle: loanDetails.jobtitle,
        grossMonthlyIncome: loanDetails.monthlyIncome
      },
      financialInformation: {
        TotalAnnuaIncome: loanDetails.TotalAnnuaIncome,
        otherSourcesOfIncome: loanDetails.otherSourcesofIncome,
        monthlyHousingExpenses: loanDetails.monthlyExpence,
        assets: loanDetails.assets,
      },
      loanDetails: {
        loanType: loanDetails.loanType,
        loanAmountRequested: loanDetails.loanAmountRequested,
        purposeOfLoan: loanDetails.purposeofLoan,
      },
      coApplicantInformation: {
        fullName: loanDetails.coFullname,
        dateOfBirth: moment(coDob).format("DD/MM/YYYY"),
        relationshipToPrimaryApplicant: loanDetails.relation,
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    postRequest("/api/loanApplication",payload,{"Authorization":token}).then((response) => {
      if(response.data.status == true){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }).catch((err) =>{
      console.log(err);
    })
    setDetails({
      fname: "",
      lname: "",
      dob: "",
      pan_number: "",
      Account_no: "",
      address: "",
      contact: "",
      email: "",
      employe_status: "",
      jobtitle: "",
      monthlyIncome: "",
      TotalAnnuaIncome: "",
      otherSourcesofIncome: "",
      monthlyExpence: "",
      assets: "",
      loanType: "",
      loanAmountRequested: "",
      purposeofLoan: "",
      coFullname: "",
      coDob: "",
      relation: ""
    });
   }
  }

  const handleBack = () => {
    window.history.go(-1);
  }
  return (
    <>
      <div id='loanApplication'>
        <div className="container">
          <div className='w-100 text-center'>
            <img src={logo} width={90} alt="" />
            <h2>
              <b>Loan Application Form</b>
            </h2>
          </div>
          {!loading && <form onSubmit={(e) => handleSubmit(e)}>
            <div className="row mt-5">
              <div className="col-md-12 mb-2">
                <h3>Basic Information</h3>
              </div>
              <hr className='mb-2' />
              <div className="col-md-9 mt-2">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <TextField label="First Name" value={loanDetails.fname} name='first_name' id='first_name' fullWidth onChange={(e) => handleChange("fname", e)} color="primary" required />
                  </div>
                  <div className="col-md-6 form-group">
                    <TextField label="Last Name " value={loanDetails.lname} name='last_name' id='last_name' fullWidth color="primary" onChange={(e) => handleChange("lname", e)} required />

                  </div>
                  <div className="col-md-6 form-group">
                    <TextField label="Email " type='email' name='email' value={loanDetails.email} id='email' fullWidth color="primary" onChange={(e) => handleChange("email", e)} required />
                  </div>
                  <div className="col-md-6 form-group">
                    <TextField label="Contact" name='contact' id='contact' fullWidth value={loanDetails.contact} onChange={(e) => handleChange("contact", e)} color="primary" required />

                  </div>
                  <div className="col-md-6 form-group">
                    <TextField label="Account Number" name='contact' id='contact' fullWidth value={loanDetails.Account_no} onChange={(e) => handleChange("Account_no", e)} color="primary" required />

                  </div>

                  <div className="col-md-6 form-group">
                    <TextField label="Pan Number " name='pan' id='pan' value={loanDetails.pan_number} onChange={(e) => handleChange("pan_number", e)} fullWidth color="primary" />
                  </div>
                  <div className="col-md-12 form-group">
                    <TextField label="Full Address" name='address' value={loanDetails.address} onChange={(e) => handleChange("address", e)} id='address' fullWidth color="primary" required />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-12">
                    <Label>Date of Birth</Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker value={dob} name='dob' id='dob' onChange={(newValue) => setDob(newValue)} required />
                      </DemoContainer>

                    </LocalizationProvider>

                  </div>
                </div>
              </div>
            </div>
            <div className='row mt-5'>
              <div className="col-md-12 mb-2 mt-2">
                <h3>Employment Information</h3>
              </div>
              <hr />
              <div className="col-md-6">
                <FormControl sx={{ m: 0 }} fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Employment Status</InputLabel>
                  <Select
                    name='position'
                    labelId="demo-simple-select-helper-label"
                    id="position"
                    value={loanDetails.employe_status}
                    label="Employment Status"
                    onChange={(e) => handleChange("employe_status", e)}
                    MenuProps={MenuProps}
                    required>
                    <MenuItem value={'full-time'} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                    <MenuItem value={'part-time'} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                    <MenuItem value={'self-employed'} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                    <MenuItem value={'business'} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                  </Select>
                  <FormHelperText>It is Required Field</FormHelperText>
                </FormControl>
              </div>
              <div className="col-md-6">
                <TextField label="Job or Business Title" name='jobtitle' id='jobtitle' value={loanDetails.jobtitle} onChange={(e) => handleChange("jobtitle", e)} fullWidth color="primary" required />
              </div>
              <div className="col-md-6">
                <TextField label="Gross Monthly Income" name='monthlyIncome' id='monthlyIncome' value={loanDetails.monthlyIncome} onChange={(e) => handleChange("monthlyIncome", e)} fullWidth color="primary" required />
              </div>
              <div className="col-md-6">
                <TextField label="Annual Income" name='TotalAnnuaIncome' id='TotalAnnuaIncome' value={loanDetails.TotalAnnuaIncome} onChange={(e) => handleChange("TotalAnnuaIncome", e)} fullWidth color="primary" required />
              </div>
            </div>
            <div className='row mt-5'>
              <div className="col-md-12 mb-2 mt-2">
                <h3>Financial Information</h3>
              </div>
              <hr />
              <div className="col-md-6 mt-4">
                <TextField label="Assets" name='jobtitle' id='jobtitle' value={loanDetails.assets} onChange={(e) => handleChange("assets", e)} fullWidth color="primary" required />
              </div>
              <div className="col-md-6 mt-4">
                <TextField label="Monthly House Income" name='monthlyExpence' id='monthlyExpence' value={loanDetails.monthlyExpence} onChange={(e) => handleChange("monthlyExpence", e)} fullWidth color="primary" required />
              </div>
              <div className="col-md-6 mt-4">
                <TextField label="Other Sources foir Income" name='otherSourcesOfIncome' id='otherSourcesOfIncome' value={loanDetails.otherSourcesofIncome} onChange={(e) => handleChange("otherSourcesofIncome", e)} fullWidth color="primary" required />
                <FormHelperText>If You have No Information about you can Put "N/A"</FormHelperText>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-12">
                <h3>Loan Details</h3>
              </div>
              <hr />
              <div className="col-md-6">
                <FormControl sx={{ m: 0 }} fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Loan Type</InputLabel>
                  <Select
                    name='loanType'
                    labelId="demo-simple-select-helper-label"
                    id="loanType"
                    value={loanDetails.loanType}
                    label="Loan Type"
                    onChange={(e) => handleChange("loanType", e)}
                    MenuProps={MenuProps}
                    required>


                    <MenuItem value={'ABC'} className='position-list'>
                      <em>Personal Loan</em>
                    </MenuItem>

                    <MenuItem value={'ABC'} className='position-list'>
                      <em>Car Loan</em>
                    </MenuItem>

                    <MenuItem value={'ABC'} className='position-list'>
                      <em>Home Loan</em>
                    </MenuItem>

                    <MenuItem value={'ABC'} className='position-list'>
                      <em>Gold Loan</em>
                    </MenuItem>
                  </Select>
                  <FormHelperText>It is Required Field</FormHelperText>

                </FormControl>
              </div>
              <div className="col-md-6">
                <TextField label="Requested Loan Amount " name='loanAmountRequested' id='loanAmountRequested' value={loanDetails.loanAmountRequested} onChange={(e) => handleChange("loanAmountRequested", e)} fullWidth color="primary" required />
              </div>
              <div className="col-md-6">
                <TextField label="Purpose Of loan" name='purposeofLoan' id='purposeofLoan' value={loanDetails.purposeofLoan} onChange={(e) => handleChange("purposeofLoan", e)} fullWidth color="primary" required />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-12">
                <h3>Co-Applicant Information</h3>
              </div>
              <hr />
              <div className="col-md-6">
                <TextField label="Co-Applicant's Full Name" name='coFullname' id='coFullname' value={loanDetails.coFullname} onChange={(e) => handleChange("coFullname", e)} fullWidth color="primary" required />
              </div>
              <div className="col-md-12 mt-3 mb-4">
                <Label>Co-Applicant's Date of Birth</Label>
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker value={coDob} name='dob' id='dob' onChange={(newValue) => setCoDOb(newValue)} required />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-6">
                <TextField label="Your Relation with the CO-Applicant" name='relation' id='relation' value={loanDetails.relation} onChange={(e) => handleChange("relation", e)} fullWidth color="primary" required />
              </div>
            </div>
            <div className='row mt-5'>
              <div className="col-md-9">
                <Button color='primary' variant="contained" size='lg' className='p-3' type='submit' fullWidth>Apply </Button>
              </div>
              <div className="col-md-3">
                <Button color='secondary' variant='contained' size='large' className='p-3' type="button" fullWidth onClick={handleBack}>Cancle</Button>
              </div>
            </div>
          </form>}

          {loading && <Loader loading={loading} className="loader" />}
        </div>
      </div>
    </>
  )
}
