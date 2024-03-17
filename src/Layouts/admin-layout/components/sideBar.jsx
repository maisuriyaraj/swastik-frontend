import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../assets/swastik_logo.png'

import './adminDashboard.scss'
import { putRequest } from '../../../utils/axios-service';

export default function SideBar() {
    const navigate = useNavigate();
    const [admin,setAdmin] = useState("");
    const [activePath ,setActivePath] = useState("");
    useEffect(()=>{
        setAdmin(JSON.parse(sessionStorage.getItem("Admin")) || "");
        setActivePath(window.location.pathname);
    },[]);
    const logOut = () => {
      const payload = {
        id:admin
      }
        putRequest('/api/adminLogout',payload).then((resp)=>{
          sessionStorage.clear("AdminAuth");
          navigate("/");
          toast.success("Admin Logout successfully", { delay: 1000 })
        }).catch(err=>{
          console.log(err)
        })
       
      }
  return (
    <div className="container-fluid" id='adminDashboard'>
        {/* sidebar start  */}
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark snav"
          style={{ width: 300 }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <div className="text-center"><img src={logo} width={80} alt="" /></div>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <Link to={'/admin/dashboard'} className={`nav-link text-light  ${activePath == '/admin/dashboard' ? 'active' : ''}`}>

                Dashboard
              </Link>
            </li>
            <li>
              <Link to={'/admin/addstaff'} className={`nav-link text-light  ${activePath == '/admin/addstaff' ? 'active' : ''}`}>
                Add Staff
              </Link>
            </li>
            <li>
              <Link to={'/admin/bank-staff'} className={`nav-link  text-light ${activePath == '/admin/bank-staff' ? 'active' : ''}`}>
                Bank Staff
              </Link>
            </li>
            {/* <li>
              <Link href="#" className="nav-link text-white">
                Typography
              </Link>
            </li> */}
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width={32}
                height={32}
                className="rounded-circle me-2"
              />
              <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              {/* <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li> */}
              <li>
                <Link className="dropdown-item" to="/admin/activities">
                  Activities
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
          </div>
        </div>


        {/* sidebar end  */}
        </div>
  )
}
