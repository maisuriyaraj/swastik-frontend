import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Dashboard from './components/dashboard';
import { ProtectedRoute } from './protectedRoutes';
import ChatUI from './components/chatUI';
import CustomerProfile from './components/profile/customerProfile';
import EPassbook from './components/ePassbook';
import FixedDeposit from './components/fixedDeposit';
import LoansDetails from './components/loans-details';
import LoanApplicationForm from './components/loanApplicationForm';
import LoanList from './components/loanLIst';

export default function CustomerRoutes() {
  return (
   <>
      <Routes>
        {/* <Route  /> */}
      </Routes>

      <ProtectedRoute path='/dashboard' exact  Component={Dashboard} />
      <ProtectedRoute path='/chat' exact  Component={ChatUI} />
      <ProtectedRoute path='/profile' exact  Component={CustomerProfile} />
      <ProtectedRoute path='/e-passbook' exact Component = {EPassbook} />
      <ProtectedRoute path="/fixed-deposit" exact Component = {FixedDeposit} />
      <ProtectedRoute path='/loans' exact Component = {LoansDetails} />
      <ProtectedRoute path='/apply-now' exact  Component = {LoanApplicationForm} />
      <ProtectedRoute path= "/loansList" exact Component = {LoanList} />

   </>
  )
}
