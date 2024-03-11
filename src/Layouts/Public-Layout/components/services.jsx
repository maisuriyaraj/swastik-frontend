import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import ServiceContent from "../../../utils/servicesContent";
import { Link, useNavigate } from "react-router-dom";
import c1 from "../../../assets/c1.png"
import c2 from "../../../assets/c2.png"
import c3 from "../../../assets/c3.png"
import c4 from "../../../assets/c4.png"
import c5 from "../../../assets/c5.png"

export default function Services() {
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const navigateToRegistration = () =>{
    navigate("/user-regstration")
  }
  return (
    <>
      <Fragment>
        <div className="container mt-5" id="about-section">
          <div className="text-center">
            <h1 className="hero-title text-dark">Our Services</h1>
          </div>
          <Row className="text-center mt-2 mb-2">
            {ServiceContent.map((x, index) => (
              <Col md={"4"} key={index} style={{ marginTop: "20px" }}>
                <Card
                  sx={{ maxWidth: "100%", height: 400 }}
                  data-aos="fade-down"
                  data-aos-duration="1000"
                >
                  <CardActionArea>
                    {!x.img && (
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"200"}
                      />
                    )}
                    {x.img && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={x.img}
                        alt=""
                      />
                    )}
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="card-tit text-start"
                      >
                        {x.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        className="card-txt text-start"
                      >
                        {x.description}
                        <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div className="container-fluid mt-4 px-0" id="loanProgram">
          <div className="text-center">
            <h1 className="hero-title">Our Loan Process</h1>
          </div>
          <div className="container mt-5 px-0">
              <Row className="d-flex justify-content-around">
                <Col md={"2"} className="mt-3">
                  <div>
                  <img src={c1} alt="" className="process-img w-100" />
                  </div>
                  <div className="text-center mt-5">
                    <h3 className="process-title">Registration</h3>
                    <p>
                      First You need to Register Your self.
                      After Your Registration You Need to Create an Account (e.g : Savings Account , Current Account).
                      After Create your account Successfully Then Click on APPLY for Loan Button.
                    </p>
                  </div>
                </Col>
                <Col md={"2"} className="mt-3">
                  <div>
                  <img src={c2} alt="" className="process-img w-100" />
                  </div>
                  <div className="text-center mt-5">
                    <h3 className="process-title">Loan Officer</h3>
                    <p>
                    One of our Loan Officers will contact you to learn more about what you’re looking to accomplish. We’ll then offer feedback on the best options for you.
                    </p>
                  </div>
                </Col>
                <Col md={"2"} className="mt-3">
                  <div>
                  <img src={c3} alt="" className="process-img w-100" />
                  </div>
                  <div className="text-center mt-5">
                    <h3 className="process-title">Documents</h3>
                    <p>
                    Once you've started the loan application process you'll need to submit all your paperwork in a timely manner. Your Loan Officer will guide you through this process.
                    </p>
                  </div>
                </Col>
                <Col md={"2"} className="mt-3">
                  <div>
                  <img src={c4} alt="" className="process-img w-100" />
                  </div>
                  <div className="text-center mt-5">
                    <h3 className="process-title">Closing Team</h3>
                    <p>
                    Once you have the documentation, the Customer Relations Manager and Loan Transaction Manager will contact you and ensure that the process is completed
                    </p>
                  </div>
                </Col>
                <Col md={"2"} className="mt-3">
                  <div>
                  <img src={c5} alt="" className="process-img w-100" />
                  </div>
                  <div className="text-center mt-5">
                    <h3 className="process-title">Get Your Funds</h3>
                    <p>
                    You are approved! will receive your loan, ready to start your project! If you have questions, we are here to support you. Our Portfolio Manager will give you information about the Draws and Payoff process.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={"12"} className="text-center">
                      <button className="btn-apply-now" onClick={navigateToRegistration}>Apply Now</button>
                </Col>
              </Row>
          </div>
        </div>
      </Fragment>
    </>
  );
}
