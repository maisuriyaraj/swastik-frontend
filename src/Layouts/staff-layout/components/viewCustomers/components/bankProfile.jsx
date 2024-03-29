import React, { useEffect, useState } from 'react';
import "../viewCustomersInfo.scss";
import male from "../../../../../assets/male.png";
import female from "../../../../../assets/female.png";
import Loader from '../../../../../utils/react-loader';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import moment from 'moment';

export default function BankProfile({ userDetails }) {
    const [readonly, setReadOnly] = useState(true);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(userDetails.gender);
    const [phone, setPhone] = useState("");
    const BASE_URL = "http://localhost:5000/"

    const [dob, setDob] = useState("");
    const [loading, setLoading] = useState(true); // Changed initial state to true

    useEffect(() => {
        if (userDetails) {
            setLoading(true);
            setTimeout(() => {
                setFname(userDetails.first_name || "");
                setLname(userDetails.last_name || "");
                setEmail(userDetails.email || "");
                setGender(userDetails.gender);
                setAddress(userDetails.address || "");
                setPhone(userDetails.phone || "");
                setDob(moment(userDetails.dob).format('DD-MM-YYYY') || ""); // Set dob based on userDetails
                setLoading(false); // Set loading to false after userDetails are fetched
            }, 3000);
        }
    }, [userDetails]);

    return (
        <>
            {!loading && (
                <div className="row" id='bankProfile'>
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Profile Picture</div>
                            <div className="card-body text-center">
                                <img
                                    className="img-account-profile rounded-circle mb-2"
                                    src={userDetails.customer_profile ? BASE_URL + userDetails.customer_profile :  (userDetails.gender === 'male' ? male : female)} // Check gender directly
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between">
                                <h2>Customer Details</h2>
                                <Button variant="contained" size="small" onClick={() => setReadOnly(!readonly)}>
                                    {readonly ? "Edit" : "Cancel"}
                                </Button>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputFirstName">
                                                First name
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputFirstName"
                                                type="text"
                                                value={fname}
                                                placeholder="Enter your first name"
                                                onChange={(e) => setFname(e.target.value)}
                                                readOnly={readonly}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputLastName">
                                                Last name
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputLastName"
                                                type="text"
                                                value={lname}
                                                onChange={(e) => setLname(e.target.value)}
                                                placeholder="Enter your last name"
                                                readOnly={readonly}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="radio-buttons-group"
                                                    defaultValue={gender}
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <FormControlLabel value="female" control={<Radio checked={gender=='female'}  readOnly={readonly} />} label="Female" />
                                                    <FormControlLabel value="male" control={<Radio checked={gender=='male'}  readOnly={readonly} />} label="Male" />
                                                    <FormControlLabel value="other" control={<Radio checked={gender=='others'} readOnly={readonly}  />} label="Other" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-12">
                                            <label className="small mb-1" htmlFor="inputOrgName">
                                                Address
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputOrgName"
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Enter your organization name"
                                                readOnly={readonly}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">
                                            Email address
                                        </label>
                                        <input
                                            className="form-control"
                                            id="inputEmailAddress"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            readOnly={readonly}
                                        />
                                    </div>
                                    <div className="row gx-3 mb-3">
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputPhone">
                                                Phone number
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputPhone"
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Enter your phone number"
                                                readOnly={readonly}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputDob">
                                                Date of Birth
                                            </label>
                                            <input
                                                className="form-control"
                                                id="inputDob"
                                                type={readonly ? 'text' : 'date'}
                                                value={dob}
                                                placeholder="Enter your date of birth"
                                                onChange={(e) => setDob(e.target.value)}
                                                readOnly={readonly}
                                            />
                                        </div>
                                    </div>
                                    {!readonly && (
                                        <Button variant='contained' size='large' className="btn btn-primary" type="button">
                                            Update
                                        </Button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                
            )}
            {loading && <Loader loading={loading} className="loader" />}
        </>
    );
}