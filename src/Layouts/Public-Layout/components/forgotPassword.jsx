import React, { useEffect, useState } from "react";
import "../public.scss";
import logo from "../../../assets/swastik_logo.png";
import { Card, Input } from "reactstrap";
import Loader from "../../../utils/react-loader";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number, date, InferType } from "yup";
import { postRequest } from "../../../utils/axios-service";
import { toast } from "react-toastify";
import { Button, Icon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import checkMark from '../../../assets/check.gif';

export default function ForgotPassword() {
    const [loading, setLoading] = useState(true);
    const [icon, setIcon] = useState("visibility");
    const [apiResponse1, setRes1] = useState();
    const [apiResponse2, setRes2] = useState();
    const [isOtpSubmitted,setOTPSibmitted] = useState(false)
    const [isSubmitted, SetSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [loadingAfter, setAfter] = useState(false);

    const initialValues = {
        email: "",
    };

    const initialValuesOTP = {
        otp: ""
    }
    let otpSchema = object({
        otp: string().max(6, "Please Enter 6 digit OTP")
    });

    let userSchema = object({
        email: string()
            .required("Email is Required")
            .email("Please,Enter Valid Email"),
    });

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const startLoader = () => {
        setAfter(true);
        setTimeout(() => {
            setAfter(false)

        }, 3000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email){
            const payload = {
                email: email,
            }
            setAfter(true)
            postRequest("/api/forgotPassEmail", payload).then((resp) => {
                if (resp.data.status == true && resp.data.code == 201) {
                    toast.success(resp.data.message);
                    SetSubmitted(true);
                } else if (resp.data.status == 501) {
                    setRes1(resp.data.status);
                    toast.error(resp.data.message);
                } else {
                    toast.error(resp.data.message);
                }
            }).catch(err => {
                console.log(err)
            })
            setAfter(false)
        }else{
            toast.error("Please Provide Details")
        }
    };

    const handleSubmitOTP = (data) => {
        if (data) {
            const payload = {
                email: email,
                otp: data.otp
            }
            setAfter(true)
            postRequest("/api/userOtpVerification", payload).then((resp) => {
                if (resp.data.status == true && resp.data.code == 201) {
                    toast.success(resp.data.message);
                    setOTPSibmitted(true)
                } else if (resp.data.status == false) {
                    setRes2(resp.data.status);
                    toast.error(resp.data.message);
                } else {
                    toast.error(resp.data.message);
                }
            }).catch(err => {
                console.log(err)
            })
            setAfter(false)
        }
    };

    const resendEmail = () =>{
        const payload = {
            email: email,
        }
        setAfter(true)
        postRequest("/api/forgotPassEmail", payload).then((resp) => {
            if (resp.data.status == true && resp.data.code == 201) {
                toast.success(resp.data.message);
                SetSubmitted(true);
            } else if (resp.data.status == 501) {
                setRes1(resp.data.status);
                toast.error(resp.data.message);
            } else {
                toast.error(resp.data.message);
            }
        }).catch(err => {
            console.log(err)
        })
        setAfter(false)
    }
    return (
        <>
            <div id="login">
                {!loading && (
                    <Card className="formBox" style={{ height: 'auto' }}>
                        <div className="text-center">
                            <img src={logo} width={100} />
                            <h2>Forgot Passoword</h2>
                        </div>
                        {!isSubmitted && <div className="form-style">
                           
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="form-group mt-2 mb-2">
                                        <label htmlFor="email" className="mb-1 mt-1">
                                            Registered Email <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                            type="email"
                                            className={`form-control mt-1 mb-1 ${apiResponse1 == 501 ? "errBox" : ""}`}
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Registered Email"
                                            name="email"
                                            required
                                        />
                                        {/* <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="errorMsg"
                                        />
                                        {apiResponse1 == 501 && <div className="errorMsg" style={{ display: "flex", alignItems: "center" }}><Icon>error_two_tone</Icon>&nbsp;&nbsp;Please re-enter your email addesss</div>} */}
                                    </div>
                                    <br />
                                    <div className="pb-2">
                                        <button
                                            type="submit"
                                            className="btn btn-login w-100 font-weight-bold mt-2"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                        </div>}
                        {isSubmitted && !isOtpSubmitted && <div className="form-style">
                            <Formik
                                initialValues={initialValuesOTP}
                                validationSchema={otpSchema}
                                onSubmit={(data) => {
                                    handleSubmitOTP(data);
                                }}
                            >
                                <Form>
                                    <div className="form-group mt-2 mb-2">
                                        <label htmlFor="otp" className="mb-1 mt-1">
                                            Enter OTP <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            type="text"
                                            className={`form-control mt-1 mb-1 ${apiResponse2 == false ? "errBox" : ""}`}
                                            id="otp"
                                            placeholder="Enter OTP"
                                            name="otp"
                                        />
                                        <ErrorMessage
                                            name="otp"
                                            component="div"
                                            className="errorMsg"
                                        />
                                        {apiResponse2 == false && <div className="errorMsg" style={{ display: "flex", alignItems: "center" }}><Icon>error_two_tone</Icon>&nbsp;&nbsp;Please re-enter your OTP</div>}
                                    </div>
                                    <div className="w-100">
                                        <Button variant="outlined" onClick={resendEmail}>Resend</Button>
                                    </div>
                                    <div className="pb-2">
                                        <button
                                            type="submit"
                                            className="btn btn-login w-100 font-weight-bold mt-2"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>}

                        {isOtpSubmitted && <div className="text-center">
                            <img src={checkMark} alt="" width={80} />
                                <h6>Reset Password Email Sent Successfully</h6>
                            
                            </div>}
                    </Card>
                )}

                {loading && <Loader loading={loading} className="loader" />}
            </div>
        </>
    );
}
