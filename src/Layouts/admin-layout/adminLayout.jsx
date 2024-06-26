import React, { useEffect, useState } from 'react'
import AdminDashboard from './components/adminDashboard'
import Loader from '../../utils/react-loader';
import { isLoggedIn } from '../../utils/helperFunctions';
import { Route, Routes, useNavigate,Switch, useLocation  } from 'react-router-dom';
import { ProtectedRoute } from "./protectedRoutes";
import { render } from '@testing-library/react';
import AddStaff from './components/addStaff';
import SideBar from './components/sideBar';
import ViewCustomersInfo from './components/viewCustomers/viewCustomersInfo';
import AdminActivities from './components/adminActivities';
import BankStaff from './components/bankStaff';
import ViewLoanDetails from './components/viewCustomers/viewLoanDetails/viewLoanDetails';
import LoanList from './components/loanLIst';


export default function AdminLayout() {
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
    
      {!loading && <>
        {location.pathname != '/admin/addstaff' &&  <SideBar  />}
        <ProtectedRoute path="/dashboard" Component={AdminDashboard} />
        <ProtectedRoute path="/addstaff" Component={AddStaff} />
        <ProtectedRoute path="/customer" Component={ViewCustomersInfo} />
        <ProtectedRoute path="/activities" Component={AdminActivities} />
        <ProtectedRoute path="/bank-staff" Component={BankStaff} />
        <ProtectedRoute path="/loans" Component = {LoanList} />
        <ProtectedRoute path="/customer/loan-details/:loanId" Component = {ViewLoanDetails}  />


      </>}
      {loading && <Loader loading={loading} className="loader" />}
    </>
  )
}