import React, { useEffect, useState } from "react";
import "./login.scss";
import logo from "../../../assets/swastik_logo.png";
import { Card } from "reactstrap";
import Loader from "../../../utils/react-loader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string, number, date, InferType, reach } from "yup";
import Icon from '@mui/material/Icon';
import {postRequest,getRequest} from "../../../utils/axios-service";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../../utils/helperFunctions";
export default function Login() {
  const [loading, setLoading] = useState(true);
  const [redirect,setRedirect] = useState(false);
  const [icon,setIcon] = useState("visibility");
  const [apiResponse,setRes] = useState();
  const initialValues = {
    email: "",
    pin: "",
  };

  const navigate = useNavigate();


  let userSchema = object({
    email: string()
      .required("Email is Required")
      .email("Please,Enter Valid Email"),
    pin: string()
      .required("Security Key is Required")
      .max(8, "MPIN or password must be 3 to 8 characters long")
      .min(3, "MPIN or password must be 3 to 8 characters long")
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = (data) => {
    if(data){
      const payload = {
        adminEmail :data.email,
        adminPassword:data.pin
      }
      postRequest("/api/admin",payload).then((res)=>{
        if(res.data.status === true && res.data.code ===201){
          setLoading(true);
          sessionStorage.setItem("AdminAuth",JSON.stringify(res.data.token));
          sessionStorage.setItem("Admin",JSON.stringify(res.data.admin));
            setTimeout(() => {
              setLoading(false);
              navigate("/admin/dashboard");
            }, 2000);
       }else if(res.data.status === false && res.data.code === 501){
            setRes(res.data.status);
            toast.error(res.data.message);
        }else{
          toast.error(res.data.message)
          setRes(res.data.status);
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  };

  const showPass = () =>{
    let input = document.getElementById("pin");
    if(input != null){
      if(input.type=="password"){
        input.type="text";
        setIcon("visibility_off")
      }else{
        input.type="password";
        setIcon("visibility")
      }
    }
  }

  return (
    <>
      <div id="login">
        {!loading && (
          <Card className="formBox" style={{height:'auto'}}>
            <div className="text-center">
              <img src={logo} width={100} />
              <h2>Admin Login</h2>
            </div>
          {!redirect &&  <div className="form-style">
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
                      Admin's Email <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="text"
                      // + }
                      className={`form-control mt-1 mb-1 ${apiResponse==false ? "errBox" : ""}` }
                      id="email"
                      placeholder="Email"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="errorMsg"
                    />
                    { apiResponse == false && <div className="errorMsg" style={{display:"flex",alignItems:"center"}}><Icon>error_two_tone</Icon>&nbsp;&nbsp;Please re-enter your email addesss</div>}
                  </div>
                  <div className="form-group mt-2 mb-2" style={{position:"relative"}}>
                    <label htmlFor="email" className="mb-1 mt-1">
                      Security Key <span className="text-danger">*</span>
                    </label>
                    <Field
                      type="password"
                      className={`form-control mt-1 mb-1 ${apiResponse==false ? "errBox" : ""}` }
                      id="pin"
                      placeholder="Security Key"
                      name="pin"
                    />
                    <Icon className="eyeIcon" onClick={showPass}>{icon}</Icon>
                    <ErrorMessage
                      name="pin"
                      component="div"
                      className="errorMsg"
                    />
                    { apiResponse == false && <div className="errorMsg" style={{display:"flex",alignItems:"center"}}><Icon>error_two_tone</Icon>&nbsp;&nbsp;Please re-enter your password</div>}

                  </div>
                  <br />{" "}
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
            {redirect && <Loader loading={redirect} className="loader" />}
          </Card>
          
        )}

        {loading && <Loader loading={loading} className="loader" />}
      </div>
    </>
  );
}
