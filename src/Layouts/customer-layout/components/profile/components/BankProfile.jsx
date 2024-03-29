import React, { useEffect, useState } from 'react';
// import "../viewCustomersInfo.scss";
import male from "../../../../../assets/male.png";
import female from "../../../../../assets/female.png";
import Loader from '../../../../../utils/react-loader';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import moment from 'moment';
import { postRequest } from '../../../../../utils/axios-service';

export default function BankProfile({ userDetails }) {
    const [readonly, setReadOnly] = useState(true);
    const BASE_URL = "http://localhost:5000/"
    const [fname, setFname] = useState("");
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = JSON.parse(sessionStorage.getItem('userToken'));
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [customer_profile, setCustomerProfile] = useState("")
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(userDetails.gender);
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [profile, setProfile] = useState();
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
                setCustomerProfile(userDetails.customer_profile || "");
                setDob(moment(userDetails.dob).format('DD-MM-YYYY') || ""); // Set dob based on userDetails
                setLoading(false); // Set loading to false after userDetails are fetched
                console.log(BASE_URL + "/" + customer_profile)
            }, 3000);
        }
    }, [userDetails]);

    function uploadProfilePicture(e) {
        if (e.target.files[0]) {
            setProfile(e.target.files[0]);
            console.log(profile);
            let formData = new FormData();
            formData.append('customer_profile',e.target.files[0])
            postRequest(`/api/profile/${user}`,formData,{'Authorization':token}).then((resp) =>{
                if(resp.data.status === true){
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err)
            }) 
        }
    }

    const handleBrowseFiles = () => {
        let input = document.getElementById('customer_profile');
        if (input !== null) {
            input.click();
        }
    }

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
                                    src={customer_profile ? BASE_URL + customer_profile : male} // Check gender directly
                                    alt=""
                                />
                                <div className="small font-italic text-muted mb-4">
                                    JPG or PNG no larger than 5 MB
                                </div>
                                <button className="btn btn-primary" type="button" onClick={handleBrowseFiles}>
                                    {customer_profile ? 'Change Profile' : 'Upload new image'}
                                </button>
                                <form style={{ display: 'none' }} encType="multipart/form-data">
                                    <input type="file" id='customer_profile' accept="image/*"
                                        onChange={(e) => uploadProfilePicture(e)} name='customer_profile' />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between">
                                <h2>Customer Details</h2>
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
                                                readOnly
                                                placeholder="Enter your first name"
                                                onChange={(e) => setFname(e.target.value)}

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
                                                readOnly
                                                onChange={(e) => setLname(e.target.value)}
                                                placeholder="Enter your last name"

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
                                                    <FormControlLabel value="female" control={<Radio disabled checked={gender == 'female'} />} label="Female" />
                                                    <FormControlLabel value="male" control={<Radio disabled checked={gender == 'male'} />} label="Male" />
                                                    <FormControlLabel value="other" control={<Radio disabled checked={gender == 'others'} />} label="Other" />
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
                                                readOnly
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Enter your organization name"
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
                                            readOnly
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
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
                                                readOnly
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Enter your phone number"
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
                                                readOnly
                                                placeholder="Enter your date of birth"
                                                onChange={(e) => setDob(e.target.value)}
                                            />
                                        </div>
                                    </div>
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