import React, { useEffect, useState } from 'react';
import './resetPass.scss';
import logo from "../../../assets/swastik_logo.png"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { object, ref, string } from "yup"
import { Icon } from '@mui/material';
import { postRequest } from '../../../utils/axios-service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function ResetPassword() {

    const [type, setType] = useState("password");
    const navigate = useNavigate();
    // Example: Get the value of a specific query parameter
    const { id, token } = useParams();
    useEffect(() => {

    }, [])
    const [loader, setLodader] = useState(false)
    const handleVisibilityOfPassword = (id) => {
        let input = document.getElementById(id);
        if (input !== null) {
            if (input.type === "password") {
                input.type = "text";
                setType(input.type)

            } else {
                input.type = "password";
                setType(input.type)
            }
        }
    }
    const initialState = {
        new_pass: "",
        confirm_pass: "",
    }

    const validationSchema = object({
        new_pass: string().required("This Field is Required !!"),
        confirm_pass: string().required("This Field is Requried !!").oneOf([ref('new_pass'), null], 'Passwords must match')
    });

    const handleSubmit = (data) => {
        setLodader(true);
        const payload = {
            password: data.confirm_pass,
            customer_id: id
        }
        setTimeout(() => {
            postRequest("/api/resetpassword", payload, { 'Authorization': token }).then((resp) => {
                if (resp.data.status === true && resp.data.code == 201) {
                    sessionStorage.setItem("userToken", JSON.stringify(token));
                    sessionStorage.setItem("user", JSON.stringify(id));
                    navigate("/user-login");
                }else{
                    toast.error(resp.data.message);
                }
            }).catch(err => {
                console.log(err)
            })
            setLodader(false);

            console.log(data)
        }, 3000);
    }

    return (
        <>
            <div id='resetPassword'>
                <div className="mainDiv">
                    <div className="cardStyle">
                        <Formik initialValues={initialState} onSubmit={(data) => handleSubmit(data)} validationSchema={validationSchema}>
                            <Form name="signupForm" id="signupForm">
                                <img src={logo} id="signupLogo" />
                                <h2 className="formTitle">Reset your Password</h2>
                                <div className="inputDiv">
                                    <label className="inputLabel" htmlFor="password">
                                        New Password
                                    </label>
                                    <Field type="password" id="new_pass" name="new_pass" />
                                    <Icon className='eye-icon' onClick={() => handleVisibilityOfPassword("new_pass")}>{type == "password" ? 'visibility ' : 'visibility_off'}</Icon>
                                    <ErrorMessage component='div' className='err-msg' name='new_pass' />

                                </div>
                                <div className="inputDiv">
                                    <label className="inputLabel" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <Field type="password" id="confirm_pass" name="confirm_pass" />
                                    <Icon className='eye-icon' onClick={() => handleVisibilityOfPassword("confirm_pass")}>{type == "password" ? 'visibility ' : 'visibility_off'}</Icon>
                                    <ErrorMessage component='div' className='err-msg' name='confirm_pass' />
                                </div>
                                <div className="buttonWrapper">
                                    <button
                                        type="submit"
                                        id="submitButton"
                                        className="submitButton pure-button pure-button-primary"
                                    >
                                        {!loader && <span>Reset Password</span>}
                                        {loader && <div class="spinner-border text-light" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>}
                                        {/* <span id="loader" /> */}
                                    </button>
                                </div>
                            </Form>
                        </Formik>

                    </div>
                </div>
            </div>

        </>
    )
}
