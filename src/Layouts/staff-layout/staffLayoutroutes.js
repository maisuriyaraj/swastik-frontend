import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Switch,
  } from "react-router-dom";
import Login from './components/login';
import StaffDashboard from './components/staffDashboard';
import { ProtectedRoute } from './components/protectedRoutes';
import ViewCustomersInfo from './components/viewCustomers/viewCustomersInfo';
import LoanList from './components/loanLIst';
import ViewLoanDetails from './components/viewCustomers/components/viewLoanDetails/viewLoanDetails';
  

export default function StaffLayoutRoutes() {
  return (
    <>
     <Routes>
      <Route path="/staff/login" element={<Login />} />
      
    </Routes>

    <ProtectedRoute path="/staff/dashboard" Component={StaffDashboard} />
    <ProtectedRoute path="/staff/customer" Component = {ViewCustomersInfo} />
    <ProtectedRoute path="/staff/loanList" Component = {LoanList} />
    <ProtectedRoute path="/staff/customer/loan-details/:loanId" Component = {ViewLoanDetails}  />

    </>
  )
}
