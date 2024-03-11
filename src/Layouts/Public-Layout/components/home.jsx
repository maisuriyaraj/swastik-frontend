import { React, Fragment } from "react";
import Video1 from "../../../assets/video1.mp4";
import  Button  from "@mui/material/Button";
import Skeleton from '@mui/material/Skeleton';
import poster from "../../../assets/video-poster.jpg"
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const navigateToRegistration = () =>{
    navigate("/user-regstration")
  }
  return (
    <Fragment>
      <div id="home-section">
        <div className="container-fluid px-0" style={{overflow:"hidden"}}>
        {!Video1 && <Skeleton variant="rectangular" width={"100%"} height={"100vh"} />}
          {Video1 && <video
            autoPlay={true}
            height={"auto"}
            muted
            loop
            className="videos w-100"
          >
            <source src={Video1} type="video/mp4" />
          </video>}
          <div className="content">
            <h1 className="hero-title" data-aos="fade-right" data-aos-duration="2000">Swastik Finance</h1>
            <img
              src="https://www.quicklending.com/assets/images/homepage-two/hero-section-text-line.png"
              alt=""
            />
            <div className="w-60 hero-tags" style={{ maxWidth: "70%",marginTop:"3%" }}>
              <h3 data-aos="fade-down" data-aos-duration="3000">Flexibility, Speed, and Support</h3>
            </div>
            <div className="mt-3">
              <Button variant="contained"  className="hero-btns" onClick={navigateToRegistration}>Open your Account</Button>
              <Button variant="contained"  className="hero-btns" onClick={navigateToRegistration}>Apply for Loan</Button>
            </div>

          </div>
          </div>
      </div>
    </Fragment>
  );
}
