import PublicPage from "./Layouts/Public-Layout";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "@mui/material/styles";
import PublicRoutes from "./Layouts/Public-Layout/publicRoutes";
import AdminRoutes from "./Layouts/admin-layout/adminRoutes";
import { isLoggedIn } from "./utils/helperFunctions";
import CustomerRoutes from "./Layouts/customer-layout/customerRoutes";
import StaffLayoutRoutes from "./Layouts/staff-layout/staffLayoutroutes";
import AdminLayout from "./Layouts/admin-layout/adminLayout";
import Login from "./Layouts/admin-layout/components/login";
import { store } from "./redux/store";
import { Provider } from 'react-redux'
const theme = createTheme();

function App() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
        <ToastContainer />
            
            {/* <AdminRoutes /> */}
            <StaffLayoutRoutes />
        <Routes>
          <Route path="/user/*" element={<CustomerRoutes />}  />
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>

            
        </Router>
      </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
