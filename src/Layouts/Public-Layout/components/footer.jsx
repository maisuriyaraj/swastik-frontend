import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Icon from '@mui/material/Icon';

export default function Footer() {
  return (
    <>
    <Fragment>
    <div className="container-fluid mt-5" id="footer">
    <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <h5>Contact Us</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    +65 55211 251 1
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    info@swastik.com
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    10am - 4pm
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    AB/72 , RjIndustries , Surat,Gujarat,India -395004
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <Link to={"/admin/login"} className="nav-link p-0 text-body-secondary">
                    Admin Portal
                  </Link>
                </li>
                <li className="nav-item mb-2">
                <Link to={"/staff/login"} className="nav-link p-0 text-body-secondary">
                  Company Portal
                </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-5 text-end offset-md-1 mb-3">
              {/* <form>
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input
                    id="newsletter1"
                    type="text"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </form> */}
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2023 Swastik Finance by <a className="text-light" href="https://rjitservices-db86d.web.app/" target="_blank">@RJIndustries</a>, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <svg className="bi" width={24} height={24}>
                    <use xlinkHref="#twitter" />
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <svg className="bi" width={24} height={24}>
                    <use xlinkHref="#instagram" />
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <svg className="bi" width={24} height={24}>
                    <use xlinkHref="#facebook" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
    </Fragment>
    </>
  );
}
