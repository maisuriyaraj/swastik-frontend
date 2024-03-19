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
  const [poistion, setPosition] = useState("");
  const [departMent, setDepartment] = useState("");
  const [dob, setDob] = useState();
  const [doj, setDoj] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [uname, setUname] = useState();
  const [email, setEmail] = useState();
  const [salary, setSalary] = useState();
  const [contact, setContact] = useState();
  const [pin, setPin] = useState();
  const [cpin, setCpin] = useState();
  const [education, setEdu] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const token = JSON.parse(sessionStorage.getItem("AdminAuth")) || "";
  const [loading, setLoading] = useState(false);
  const [departMentList, setDeptList] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentLst();
    console.log("COMPONENT RENDERED")
  }, []);

  function getDepartmentLst() {
    postRequest("/api/getdepts", {}, { "Authorization": token }).then((resp) => {
      setDeptList(resp.data.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cpin !== pin) {
      toast.error("Pin Code Must be same")
    } else {
      const payload = {
        first_name: fname,
        last_name: lname,
        user_name: uname,
        password: cpin,
        email: email,
        position: poistion,
        gender: gender,
        dob: moment(dob.$d).format("YYYY-MM-DD"),
        doj: moment(doj.$d).format("YYYY-MM-DD"),
        salary: salary,
        education: education,
        dept_id: departMent,
        address: address
      }
      setLoading(true);
      setAddress("");
      setContact("");
      setCpin("");
      setDepartment("");
      setDob();
      setDoj();
      setEdu("");
      setEmail("");
      setFname("");
      setGender("");
      setLname("");
      setPin("");
      setPosition("");
      setSalary("");
      setUname("");
      setTimeout(() => {
        postRequest("/api/add-staff", payload, { 'Authorization': token }).then((resp) => {

          if (resp.data.status == false) {
            toast(resp.data.message)
          } else {
            toast.success(resp.data.message);

          }

        }).catch((err) => {
          toast.error(err);
        })
        setLoading(false)
      }, 3000);
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
                    {/* <label htmlFor="first_name">First Name:</label> */}
                    <TextField label="First Name" value={fname} name='first_name' id='first_name' fullWidth onChange={(e) => setFname(e.target.value)} color="primary" required />
                    {/* <ErrorMessage name='first_name' id='first_name' component={'div'} className='errorMsg' /> */}
                  </div>
                  <div className="col-md-6 form-group">
                    {/* <label htmlFor="last_name">Last Name:</label> */}
                    <TextField label="Last Name " value={lname} name='last_name' id='last_name' fullWidth color="primary" onChange={(e) => setLname(e.target.value)} required />
                    {/* <ErrorMessage name='last_name' id='last_name' component={'div'} className='errorMsg' /> */}

                  </div>
                  <div className="col-md-6 form-group">
                    {/* <label htmlFor="email">Email:</label> */}
                    <TextField label="Email " type='email' name='email' value={email} id='email' fullWidth color="primary" onChange={(e) => setEmail(e.target.value)} required />
                    {/* <ErrorMessage name='email' id='email' component={'div'} className='errorMsg' /> */}
                  </div>
                  <div className="col-md-6 form-group">
                    {/* <label htmlFor="password">Password:</label> */}
                    <TextField label="Contact" name='contact' id='contact' fullWidth value={contact} onChange={(e) => setContact(e.target.value)} color="primary" required />
                    {/* <ErrorMessage name='contact' id='contact' component={'div'} className='errorMsg' /> */}

                  </div>
                  <div className="col-md-6 form-group">
                    {/* <label htmlFor="password">Password:</label> */}
                    <TextField label="Account Number" name='contact' id='contact' fullWidth value={contact} onChange={(e) => setContact(e.target.value)} color="primary" required />
                    {/* <ErrorMessage name='contact' id='contact' component={'div'} className='errorMsg' /> */}

                  </div>

                  {/* <div className="col-md-6 form-group">
                    <FormControl sx={{ m: 0 }} fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">Designation</InputLabel>
                      <Select
                        name='position'
                        labelId="demo-simple-select-helper-label"
                        id="position"
                        value={poistion}
                        label="Age"
                        onChange={(e) => setPosition(e.target.value)}
                        MenuProps={MenuProps}
                        required>
                       

                          <MenuItem value={'ABC'} key={1} className='position-list'>
                            <em>ABC</em>
                          </MenuItem>

                      </Select>
                      <FormHelperText>It is Required Field</FormHelperText>

                    </FormControl>

                  </div> */}
                  {/* <div className="col-md-6 form-group">
                    <FormControl sx={{ m: 0 }} fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                      <Select
                        name='department'
                        labelId="demo-simple-select-helper-label"
                        id="department"
                        value={departMent}
                        label="Age"
                        onChange={(e) => setDepartment(e.target.value)}
                        MenuProps={MenuProps}
                        required>
                        

                          <MenuItem value={'1'} key={'1'} className='position-list'>
                            <em>BAC</em>
                          </MenuItem>
                      </Select>
                      <FormHelperText>It is Required Field</FormHelperText>

                    </FormControl>

                  </div> */}
                  <div className="col-md-6 form-group">
                    {/* <label htmlFor="password">Password:</label> */}
                    <TextField label="Pan Number " name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
                  </div>
                  {/* <div className="col-md-6">
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        id='gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </div> */}
                  <div className="col-md-12 form-group">
                    <TextField label="Full Address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} id='address' fullWidth color="primary" required />
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
                      {/* <ErrorMessage name='dob' id='dob' component={'div'} className='errorMsg' /> */}

                    </LocalizationProvider>

                  </div>
                  <div className="col-md-12 mt-2">
                    <Label>Date of Application </Label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker value={doj} name='doj' id='doj' onChange={(newValue) => setDoj(newValue)} required />
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
                    value={poistion}
                    label="Employment Status"
                    onChange={(e) => setPosition(e.target.value)}
                    MenuProps={MenuProps}
                    required>
                    <MenuItem value={'full-time'} key={1} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                    <MenuItem value={'part-time'} key={1} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                    <MenuItem value={'self-employed'} key={1} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                    <MenuItem value={'business'} key={1} className='position-list'>
                      <em>ABC</em>
                    </MenuItem>
                  </Select>
                  <FormHelperText>It is Required Field</FormHelperText>
                </FormControl>
              </div>
              <div className="col-md-6">
                <TextField label="Job or Business Title" name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
              </div>
              <div className="col-md-6">
                <TextField label="Gross Monthly Income" name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
              </div>
              <div className="col-md-6">
                <TextField label="Annual Income" name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
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
                    name='position'
                    labelId="demo-simple-select-helper-label"
                    id="position"
                    value={poistion}
                    label="Loan Type"
                    onChange={(e) => setPosition(e.target.value)}
                    MenuProps={MenuProps}
                    required>


                    <MenuItem value={'ABC'} key={1} className='position-list'>
                      <em>Personal Loan</em>
                    </MenuItem>

                    <MenuItem value={'ABC'} key={1} className='position-list'>
                      <em>Car Loan</em>
                    </MenuItem>

                    <MenuItem value={'ABC'} key={1} className='position-list'>
                      <em>Home Loan</em>
                    </MenuItem>

                    <MenuItem value={'ABC'} key={1} className='position-list'>
                      <em>Gold Loan</em>
                    </MenuItem>
                  </Select>
                  <FormHelperText>It is Required Field</FormHelperText>

                </FormControl>
              </div>
              <div className="col-md-6">
                <TextField label="Requested Loan Amount " name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
              </div>
              <div className="col-md-6">
                <TextField label="Purpose Of loan" name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-12">
                <h3>Co-Applicant Information</h3>
              </div>
              <hr />
              <div className="col-md-6">
                <TextField label="Co-Applicant's Full Name" name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
              </div>
              <div className="col-md-12 mb-4">
                <Label>Co-Applicant's Date of Birth</Label>
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker value={dob} name='dob' id='dob' onChange={(newValue) => setDob(newValue)} required />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-6">
                <TextField label="Your Relation with the CO-Applicant" name='pan' id='pan' value={education} onChange={(e) => setEdu(e.target.value)} fullWidth color="primary" />
              </div>
            </div>
            <div className='row mt-5'>
              <div className="col-md-9">
                <Button color='primary' variant="contained" size='lg' className='p-3' type='submit' fullWidth>Submit</Button>
              </div>
              <div className="col-md-3">
                <Button color='secondary' variant='contained' size='large' className='p-3' type="button" fullWidth onClick={handleBack}>Back</Button>
              </div>
            </div>
          </form>}

          {loading && <Loader loading={loading} className="loader" />}
        </div>
      </div>
    </>
  )
}
