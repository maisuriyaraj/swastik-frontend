import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../assets/swastik_logo.png'
import { postRequest, putRequest } from '../../../utils/axios-service';
import './staffDashboard.scss'
import male from '../../../assets/male.png';
import female from '../../../assets/female.png';
import { Icon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import  {getAllData } from '../../../redux/slices/customerActions';

export default function SideBar({ userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const data = useSelector((state) => {
  //   return state.customers
  // })
  
  const [openSidebar,setSidebar] = useState(false);

  useEffect(()=>{
    // dispatch(getAllData());
  },[])
  const openSideBar = () => {
    let div = document.getElementById('sidebar');
    if(div != null){
      setSidebar(true)
      div.style.width="330px";
      div.style.opacity = "1";
    }
  }

  const closeSidebar = () => {
    let div = document.getElementById('sidebar');
    if(div != null){
      setSidebar(false)
      div.style.width="0px";
      div.style.opacity = "0";
    }
  }
  const logOut = () => {
    sessionStorage.removeItem('employee');
    sessionStorage.removeItem('staffAuth');
    navigate("/")
  }
  return (
    <div className="container-fluid px-0" id='customerSidebar'>
      {/* sidebar start  */}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 snav"
        id='sidebar'
      >
        {openSidebar && <><div className='text-center position-relative'>
          <a
            href="/staff/dashboard"
            className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto   text-decoration-none"
          >
            <img src={logo} width={80} alt="" />
          </a>

          <Icon className='close-icon' title={'Close'} onClick={() => closeSidebar()}>close_icon</Icon>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to={"/staff/dashboard"} className="nav-link active">

              Dashboard
            </Link>
          </li>
          <li>
            <Link to={''} className="nav-link">
              Fixed Deposite
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link">
              E-pass Book
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Loans
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Online Transection Details
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Profile Details
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Net Banking
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center   text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={userData.gender == 'male' ? male : female}
              alt=""
              width={32}
              height={32}
              className="rounded-circle me-2"
            />
            <strong className='text-dark'>{userData.first_name + " " + userData.last_name}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
                <Link className="dropdown-item" to="/user/profile">
                  Profile
                </Link>
              </li>
            <li>
              <Link className="dropdown-item" to="">
                Add New Account
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={logOut}>
                Sign out
              </a>
            </li>
          </ul>
        </div></>}
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <div className='d-flex align-items-center justify-content-start'>
            <Icon onClick={openSideBar} className='menu-icon'>menu_icon</Icon><span className='fs-6'>Menu</span>
          </div>
          <div className='w-100 text-center'>
            <img src={logo} width={60} alt="" />
          </div>
        </div>
      </nav>
      {/* sidebar end  */}
    </div>
  )
}
