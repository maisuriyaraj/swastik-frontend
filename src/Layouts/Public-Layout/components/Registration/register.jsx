import React, { useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
// import { MdDescription } from "react-icons/md";
import StepWizard from "react-step-wizard";
// import { Row, Col, Button, FormGroup, Label, Input } from "reactstrap";s
import "./register.scss";
import img1 from "../../../../assets/sigenup.jpg"
import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, Icon, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import Timer from "./components/timer";
import termsConditions from "../../../../assets/json/terms_and_conditions.json"
import logo1 from "../../../../assets/swastik_logo.png"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, string, number, date, InferType, reach, min, max, ref, oneOf } from "yup";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Loader from "../../../../utils/react-loader";
import { toast } from "react-toastify";
import Snackbar from '@mui/material/Snackbar';
import InputMask from 'react-input-mask';




import { getRequest, postRequest } from "../../../../utils/axios-service";
import { useNavigate } from "react-router-dom";

const Registration = () => {


  const [start, SetStart] = useState(false);
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false)
  const [loadingAfter, setAfter] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [gender, setGender] = useState("male");
  const [account, setAccount] = useState("");
  const [marital_status, setMarital] = useState("");
  const [accountList, setAccountList] = useState([]);
  const navigate = useNavigate();


  const initialState = {
    fname: "",
    lname: "",
    email: "",
    contact: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    nationality: "",
    country: "",
    zip: "",
    adhar: "",
    pan: "",
    pass: "",
    cpass: "",
    mpin: "",
    cmpin: ""
  };

  const validationSchema = object().shape({
    fname: string().required('First name is required'),
    lname: string().required('Last name is required'),
    email: string().email('Invalid email address').required('Email is required'),
    contact: string().required("Contact is required ").max(10, ("Invalid Phone Numbers")),
    dob: string().required('Date of birth is required'),
    nationality: string().required("This Field is required"),
    street: string().required('Street address is required'),
    city: string().required('City is required'),
    state: string().required('State is required'),
    country: string().required('Country is required'),
    zip: string().required('ZIP code is required'),
    adhar: string().required("Adhar Card number is required").max(12, ("Invalid Adhar Number")),
    pan: string().required("Pan Card number is required").max(10, ("Invalid Pan Number")),
    pass: string().required('Password is required'),
    cpass: string().oneOf([ref('pass'), null], 'Passwords must match').required('Confirm password is required'),
    mpin: string().required('MPIN is required'),
    cmpin: string().oneOf([ref('mpin'), null], 'MPINs must match').required('Confirm MPIN is required'),
  });


  useEffect(() => {
    getAccountList();
  }, []);


  const getAccountList = () => {
    postRequest('/api/getaccountsList', {}).then((resp) => {
      setAccountList(resp.data.data)
    }).catch(err => {
      console.log(err);
    })
  }
  const startLoader = (messgae, token,url,user) => {
    setAfter(true);
    setTimeout(() => {
      setAfter(false);
      toast.success(messgae);
      sessionStorage.setItem("userToken", JSON.stringify(token));
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate(url);
    }, 3000);
  }

  const handleSubmit = (data) => {
    const payload = {
      first_name: data.fname,
      last_name: data.lname,
      email: data.email,
      phone: data.contact,
      dob: data.dob,
      gender: gender,
      address: data.street + " " + data.city + " " + data.state + " " + data.country + "-" + data.zip,
      adhar_number: data.adhar,
      pan_number: data.pan,
      password: data.pass,
      pin: data.mpin,
      account_type: account,
      nationality: data.nationality,
      marital_status: marital_status,
    }
    postRequest("/api/registration", payload).then((resp) => {
      if (resp.data.status == true && resp.data.code == 201) {
        startLoader(resp.data.message, resp.data.token, resp.data.url,resp.data.user);
      } else {
        toast.error(resp.data.message);
      }
    }).catch(err => {
      console.log(err)
    });
  }
  return (
    <div className="container-fluid" id="register">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        message="Email Sent Successfully"
      />
      <div className="container">
        {!loadingAfter && <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={(data) => handleSubmit(data)}>
          <Form>
            <div className="row ">
              <div className="col-md-12  d-flex justify-content-start align-items-center">
                <div className="formBox">
                  <div className="col-md-12">
                    <div className="text-center">
                      <img src={logo1} width={"100px"} alt="" />
                    </div>
                  </div>
                  <div className="form-style">
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="fname" className="mt-2 mb-2">First Name *</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="fname"
                              label="First Name" fullWidth variant="outlined"
                              name="fname"
                            />
                            <ErrorMessage name="fname" component={'div'} className="err-msg" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="lname" className="mt-2 mb-2">Last Name *</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="lname"
                              fullWidth
                              label="Last Name" variant="outlined"
                              name="lname"
                            />
                            <ErrorMessage name="lname" component={'div'} className="err-msg" />


                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="email" className="mt-2 mb-2">Email Address *</label>

                            <Field
                              type="email"
                              className="form-control"
                              id="email"
                              fullWidth
                              label="Email" variant="outlined"
                              name="email"
                            />
                            <ErrorMessage name="email" component={'div'} className="err-msg" />


                          </div>
                        </div>
                        <div className="col-md-6">
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="gender"
                              id="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <FormControlLabel value="female" control={<Radio />} label="Female" />
                              <FormControlLabel value="male" control={<Radio />} label="Male" />
                              <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                          </FormControl>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="contact" className="mt-2 mb-2">Contact Number *</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="contact"
                              name="contact"

                            />
                            <ErrorMessage name="contact" component={'div'} className="err-msg" />


                          </div>
                        </div>
                        {/* */}
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="dob" className="mt-2 mb-2">Date of Birth *</label>
                            <Field
                              type="date"
                              className="form-control"
                              variant="outlined"
                              id="dob"
                              fullWidth
                              name="dob"


                            />
                            <ErrorMessage name="dob" component={'div'} className="err-msg" />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="dob" className="mt-2 mb-2">Nationality *</label>
                            <Field
                              type="text"
                              className="form-control"
                              variant="outlined"
                              id="nationality"
                              fullWidth
                              name="nationality"


                            />
                            <ErrorMessage name="nationality" component={'div'} className="err-msg" />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label2">Marital Status</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label2"
                              name="marital"
                              id="marital"
                              value={marital_status}
                              onChange={(e) => setMarital(e.target.value)}
                            >
                              <FormControlLabel value="Married" control={<Radio />} label="Married" />
                              <FormControlLabel value="Unmarried" control={<Radio />} label="Unmarried" />
                              <FormControlLabel value="Widowed" control={<Radio />} label="Widowed" />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="city" className="mt-2 mb-2">Street *</label>

                            <Field
                              type="text"
                              placeholder=""
                              label="Street" variant="outlined"
                              className="form-control"
                              fullWidth
                              id="street"
                              name="street"


                            />
                            <ErrorMessage name="street" component={'div'} className="err-msg" />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="city" className="mt-2 mb-2">City *</label>
                            <Field
                              type="text"
                              placeholder=""
                              label="City" variant="outlined"
                              className="form-control"
                              fullWidth
                              id="city"
                              name="city"


                            />
                            <ErrorMessage name="city" component={'div'} className="err-msg" />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="state" className="mt-2 mb-2">State *</label>

                            <Field
                              type="text"
                              placeholder=""
                              label="State" variant="outlined"
                              className="form-control"
                              id="state"
                              fullWidth
                              name="state"


                            />
                            <ErrorMessage name="state" component={'div'} className="err-msg" />

                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="country" className="mt-2 mb-2">Country *</label>

                            <Field
                              type="text"
                              label="Country" variant="outlined"
                              placeholder=""
                              className="form-control"
                              fullWidth
                              id="country"
                              name="country"


                            />
                            <ErrorMessage name="country" component={'div'} className="err-msg" />

                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group pb-3">
                            <label htmlFor="zip" className="mt-2 mb-2">Zip Code *</label>

                            <Field
                              type="text"
                              label="Zip" variant="outlined"
                              placeholder=""
                              fullWidth
                              className="form-control"
                              id="zip"
                              name="zip"

                            />
                            <ErrorMessage name="zip" component={'div'} className="err-msg" />

                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Account</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select2"
                              value={account}
                              label="Account"
                              onChange={(e) => setAccount(e.target.value)}
                              required
                            >
                              {accountList.map((x) => (
                                <MenuItem value={x.Account_type}>{x.Account_type}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="adharNumber" className="mt-2 mb-2">Adhar Card Number *</label>
                            <Field
                              type="text"
                              name="adhar"
                              id="adhar"
                              placeholder="xxxx-xxxx-xxxx"
                              className="form-control"
                            />
                            <ErrorMessage name="adhar" component={'div'} className="err-msg" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group pb-3">
                            <label htmlFor="panNumber" className="mt-2 mb-2">Pan Card Number *</label>
                            <Field
                              type="text"
                              placeholder="x(xxxx)-xxxxx"
                              className="form-control"
                              name="pan"
                              id="pan"
                            />
                            <ErrorMessage name="pan" component={'div'} className="err-msg" />



                          </div>
                        </div>
                        <div className="col-md-6 position-relative">
                          <div className="form-group pb-3">
                            <label htmlFor="password" className="mt-2 mb-2">Create Password *</label>

                            <Field
                              type="password"
                              variant="outlined"
                              placeholder="Password"
                              className="form-control"
                              fullWidth
                              id="pass"
                              name="pass"


                            /><ErrorMessage name="pass" component={'div'} className="err-msg" />

                          </div>
                        </div>
                        <div className="col-md-6 position-relative">
                          <div className="form-group pb-3">
                            <label htmlFor="cpassword" className="mt-2 mb-2">Comfirm Password *</label>

                            <Field
                              type="password"
                              placeholder="Confirm Password"
                              variant="outlined"
                              className="form-control"
                              id="cpass"
                              fullWidth
                              name="cpass"


                            />
                            <ErrorMessage name="cpass" component={'div'} className="err-msg" />
                          </div>
                        </div>
                        <div className="col-md-6 position-relative">
                          <div className="form-group pb-3">
                            <label htmlFor="pin" className="mt-2 mb-2">Generate MPIN *</label>
                            <Field
                              type="password"
                              placeholder="xxxx"
                              variant="outlined"
                              className="form-control"
                              id="password"
                              fullWidth
                              name="mpin"
                              maxLength={"4"}

                            />
                            <ErrorMessage name="mpin" component={'div'} className="err-msg" />

                          </div>
                        </div>
                        <div className="col-md-6 position-relative">
                          <div className="form-group pb-3">
                            <label htmlFor="cpin" className="mt-2 mb-2">Confirm MPIN *</label>
                            <Field
                              type="password"
                              placeholder="xxxx"
                              className="form-control"
                              variant="outlined"
                              id="password"
                              fullWidth
                              name="cmpin"
                              maxLength={"4"}

                            />
                            <ErrorMessage name="cmpin" component={'div'} className="err-msg" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group pb-3">
                            <Button type="submit" variant="contained" color="success">Register</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>}

        {loadingAfter && <Loader loading={loadingAfter} className="loader" />}


      </div>

    </div>
  );
};

export default Registration;
