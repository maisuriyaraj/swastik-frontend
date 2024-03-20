import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import AdminLayout from ".";
import Login from "./components/login";
import AdminDashboard from "./components/adminDashboard";
import { isLoggedIn } from "../../utils/helperFunctions";
import { ProtectedRoute } from "./protectedRoutes";
import AddStaff from "./components/addStaff";
import LoanList from "./components/loanLIst";

const AdminRoutes = () => {
  return (
    <>
    
    <Routes>
      <Route path="/admin" element={<AdminLayout />} />
    </Routes>
      <ProtectedRoute path="/admin/dashboard" Component={AdminDashboard} />
      <ProtectedRoute path="/admin/loans" Component = {LoanList} />
      </>
  );
};

export default AdminRoutes;
