import React, { useState } from "react";
import logo from "../../../assets/swastik_logo.png"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
// import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';

export default function Header() {
  const openSideNav = () => {
    let nav = document.getElementById("SideNav");
    let mLogo = document.getElementById("m-logo");
    let mainNav = document.getElementById("main-nav");
    if(nav != null && mLogo != null && mainNav != null){
        if(nav.style.width == "270px"){
            nav.style.width = "0";
            nav.style.padding = "0px";
            mLogo.style.display="none";
            mainNav.style.display="none";
        }else{
            nav.style.transform="scaleX(1)"
            nav.style.width = "270px";
            nav.style.padding = "10px";
            mLogo.style.display="block";
            mainNav.style.display="block";
        }
    }
  };
  return (
    <>
    {/* <div className="container-fluid px-0" style={{overflowX:'hidden'}}>
      <div className="header-info row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6 text-end">
            <p className="header-info-text"><PhoneInTalkOutlinedIcon /> Toll free Number : +261 2512 514 </p>
          </div>
      </div>
    </div> */}
      <nav className="navbar navbar-expand-lg" id="header">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <img src={logo} width={50} />
          </a>
          <button className="navbar-toggler" type="button" onClick={openSideNav}>
            <span className="navbar-toggler-icon" />
          </button>
        <div className="navbar-public" id="SideNav">
            <div className="m-logo mt-4" id="m-logo">
              <a className="navbar-brand" href="#">
              <img src={logo} width={50} />
              </a>
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="main-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#personal">
                  Personal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#support">
                  Support
                </a>
              </li>
              <li className="nav-item">
                <Link to={"/user-regstration"} className="nav-link" href="#">
                Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/user-login"} className="nav-link" href="#">
                Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
