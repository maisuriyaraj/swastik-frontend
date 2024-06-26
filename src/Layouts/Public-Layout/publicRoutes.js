import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import PublicLayout from ".";
import Login from "./components/login";
import Registration from "./components/Registration/register";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";

const PublicRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-regstration" element={<Registration />} />
        {/* <Route path="/upload-docs/:id" element={<UploadDocuments />} /> */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetPass/:id/:token" element={<ResetPassword />} />

      </Routes>
  );
};

export default PublicRoutes;
