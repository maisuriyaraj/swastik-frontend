import React, { useEffect, useState } from "react";
import "../public.scss";
import logo from "../../../assets/swastik_logo.png";
import { Card } from "reactstrap";
import Loader from "../../../utils/react-loader";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number, date, InferType } from "yup";
import { postRequest } from "../../../utils/axios-service";
import { toast } from "react-toastify";
import { Icon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { generateRandomString } from "../../../utils/helperFunctions";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [icon, setIcon] = useState("visibility");
  const [apiResponse, setRes] = useState();
  const searchParams = new URLSearchParams(window.location.search);
  const redirectPath = searchParams.get('redirctPath') || "";
  const [user_captcha, setCaptcha] = useState("");
  const [captcha, setcap] = useState("");
  const navigate = useNavigate();
  const [loadingAfter, setAfter] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  let userSchema = object({
    email: string()
      .required("Email is Required")
      .email("Please,Enter Valid Email"),
    password: string()
      .required("Passsword is required")
    // .max(16, " password must be 8 to 16 characters long")
    // .min(8, "password must be 8 to 16 characters long")
    // .oneOf([yup.ref("123"), null], "MPIN or password is incorrect !!"),
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      console.log(redirectPath.replace(":id","1234"))
    }, 2000);
    setcap(generateRandomString())
  }, []);

  const startLoader = () => {
    setAfter(true);
    setTimeout(() => {
      setAfter(false)

    }, 3000);
  }

  const reloadCaptcha = () => {
    setcap(generateRandomString())
  }

  const handleSubmit = (data) => {
    if (data) {
      if (user_captcha === captcha) {
        const payload = {
          email: data.email,
          password: data.password
        }
        setAfter(true)
        postRequest("/api/login-customer", payload).then((resp) => {
          if (resp.data.status == true && resp.data.code == 201) {

            startLoader();
            sessionStorage.setItem("userToken", JSON.stringify(resp.data.token));
            sessionStorage.setItem("user", JSON.stringify(resp.data.user));
            if(redirectPath){
              navigate("/user"+redirectPath.replace(":id",resp.data.user));
            }else{
              navigate("/user/dashboard");
            }
          } else if (resp.data.status == false && resp.data.code == 501) {
            setRes(resp.data.status);
            toast.error(resp.data.message);
          } else {
            toast.error(resp.data.message);
          }
        }).catch(err => {
          console.log(err)
        })
        setAfter(false)
      } else {
        toast.error("Please Enter Valid Captcha Code")
      }
    }
  };

  const showPass = () => {
    let input = document.getElementById("password");
    if (input != null) {
      if (input.type == "password") {
        input.type = "text";
        setIcon("visibility_off")
      } else {
        input.type = "password";
        setIcon("visibility")
      }
    }
  }
  return (
    <>
      <div id="login">
        {!loading && (
          <Card className="formBox" style={{ height: 'auto' }}>
            <div className="text-center">
              <img src={logo} width={100} />
              <h2>Login</h2>
            </div>
            {!loadingAfter && <div className="form-style">
              <Formik
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={(data) => {
                  handleSubmit(data);
                }}
              >
                <Form>
                  <div className="form-group mt-2 mb-2">
                    <label htmlFor="email" className="mb-1 mt-1">
                      Registered Email <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      className={`form-control mt-1 mb-1 ${apiResponse == false ? "errBox" : ""}`}
                      id="email"
                      placeholder="Registered Email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="errorMsg"
                    />
                    {apiResponse == false && <div className="errorMsg" style={{ display: "flex", alignItems: "center" }}><Icon>error_two_tone</Icon>&nbsp;&nbsp;Please re-enter your email addesss</div>}
                  </div>
                  <div className="form-group mt-2 mb-2 position-relative">
                    <label htmlFor="email" className="mb-1 mt-1">
                      Password/MPIN <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="password"
                      className={`form-control mt-1 mb-1 ${apiResponse == false ? "errBox" : ""}`}
                      id="password"
                      placeholder="Password/MPIN"
                      name="password"
                    />
                    <Icon className="eyeIcon" style={{ cursor: "pointer" }} onClick={showPass}>{icon}</Icon>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="errorMsg"
                    />
                    {apiResponse == false && <div className="errorMsg" style={{ display: "flex", alignItems: "center" }}><Icon>error_two_tone</Icon>&nbsp;&nbsp;Please re-enter your password</div>}
                  </div>
                  <div className="form-group mt-2 mb-2 position-relative">
                    <label htmlFor="email" className="mb-1 mt-1">
                      Captcha <span className="text-danger">*</span>
                    </label>
                    <input type="text" value={captcha} className="mt-2 mb-2" readOnly={true} id="generated-captcha" />
                    <Icon className="eyeIcon" style={{ cursor: "pointer" }} onClick={() => reloadCaptcha()}>cached_icon</Icon>
                    <input
                      type="text"
                      className={`form-control mt-1 mb-1 ${apiResponse == false ? "errBox" : ""}`}
                      id="password"
                      value={user_captcha}
                      onPaste={() => {return false}} onCopy={() => {return false}} onCut={() => {return false}} onDrag={() => {return false}} onDrop={() => {return false}} autoComplete={'off'}
                      onChange={(e) => setCaptcha(e.target.value)}
                      placeholder="Enter Captcha"
                      name="password"
                    />
                    {user_captcha && user_captcha !== captcha && <div className="errorMsg" style={{ display: "flex", alignItems: "center" }}><Icon>error_two_tone</Icon>&nbsp;&nbsp;Please re-Enter Captcha</div>}
                    {!user_captcha && <div className="errorMsg" style={{ display: "flex", alignItems: "center" }}>&nbsp;Enter Captcha code</div>}
                  </div>
                  <br />
                  <div className="forgot-password text-center">
                    <Link to="/forgotpassword">Forgot Password?</Link>
                    <Link to={'/user-regstration'}>Register</Link>
                  </div>
                  <div className="pb-2">
                    <button
                      type="submit"
                      className="btn btn-login w-100 font-weight-bold mt-2"
                    >
                      Login
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>}
            {loadingAfter && <Loader loading={loadingAfter} className="loader" />}
          </Card>
        )}

        {loading && <Loader loading={loading} className="loader" />}
      </div>
    </>
  );
}
